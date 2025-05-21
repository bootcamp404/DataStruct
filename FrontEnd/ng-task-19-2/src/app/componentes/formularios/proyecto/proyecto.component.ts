import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proyecto } from '../../../modelos/proyecto';
import { firstValueFrom, forkJoin, Subscription } from 'rxjs';
import { ProyectoService } from '../../../services/proyecto.service';
import { ActualizarService } from '../../../services/actualizar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProyectoValidaciones } from '../../../validaciones/proyecto.validaciones';
import { Departamento } from '../../../modelos/departamento';
import { DepartamentoService } from '../../../services/departamento.service';

interface ProyectoConDepartamento extends Proyecto {
  nombre_departamento: string;
}

@Component({
  selector: 'app-proyecto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})
export class ProyectoComponent implements OnInit {
  formularioEdicion: FormGroup;
  proyectos: ProyectoConDepartamento[] = [];
  departamentos: Departamento[] = [];
  selectedProyecto: Proyecto | null = null;
  cargando = false;
  cargandoLista = false;
  enviado = false;
  error = false;
  errorLista = false;
  mensajeError: string | null = null;
  eliminando = false;
  mostrarModalEdicion = false;
  editando = false;
  mostrarTodos = false;

  private refreshSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private actualizarPag: ActualizarService,
    private departamentoService: DepartamentoService,
    private router: Router
  ) {
    this.formularioEdicion = this.fb.group({
      nombre: ['', Validators.required],
      objetivo: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      id_departamento: ['', Validators.required]  // usado en el <select>
    });

  }

  ngOnInit() {
    this.cargarDatosIniciales();

    // Suscribirse al evento de actualización
    this.refreshSubscription = this.actualizarPag.actualizarPagina$.subscribe(() => {
      this.cargarDatosIniciales();
    });
  }

  ngOnDestroy(){
    // Cancelar la suscripción al destruir el componente para evitar memory leaks
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  cargarDatosIniciales() {
    this.cargandoLista = true;

    forkJoin({
      proyectos: this.proyectoService.obtenerProyectos(),
      departamentos: this.departamentoService.obtenerDepartamentos()
      
    }).subscribe({
      next: ({ proyectos, departamentos }) => {
          this.departamentos = departamentos;
          this.proyectos = proyectos.map(proyecto => {
            const departamento = proyecto.departamento; // es un objeto
            return {
              ...proyecto,
              nombre_departamento: departamento ? departamento.nombre : 'Desconocido'
            } as ProyectoConDepartamento;
          });
          this.proyectoService.setProyectos(proyectos);
          this.cargandoLista = false;
        },
        error: (error) => {
          console.error('Error al cargar proyectos o departamentos:', error);
          this.errorLista = true;
          this.cargandoLista = false;
        }
    });
  }

  getNombreDepartamento(id_departamento: string): string {
    const depto = this.departamentos.find(d => d.id === id_departamento);
    return depto ? depto.nombre : 'Desconocido';
  }

  selectProyecto(proyecto: Proyecto) {
    this.selectedProyecto = proyecto;
  }

  abrirModalEdicion(proyecto: Proyecto) {
    this.selectedProyecto = proyecto;

    this.formularioEdicion.patchValue({
      nombre: proyecto.nombre,
      objetivo: proyecto.objetivo,
      fecha_ini: proyecto.fecha_ini,
      fecha_fin: proyecto.fecha_fin,
      id_departamento: proyecto.departamento?.id || ''
    });

    this.mostrarModalEdicion = true;
  }


  cerrarModalEdicion() {
    this.mostrarModalEdicion = false;
    this.selectedProyecto = null;
    this.formularioEdicion.reset();
  }

  async guardarEdicion() {
    if (!this.selectedProyecto) return;

    this.editando = true;
    this.error = false;
    this.mensajeError = null;

    try {
      const formulario = this.formularioEdicion.value;

      // Validaciones personalizadas si las tienes
      const resultadoValidacion = ProyectoValidaciones.validarFormulario(this.formularioEdicion, this.proyectos.filter(p => p.id_proyecto !== this.selectedProyecto?.id_proyecto));
      if (!resultadoValidacion.valido) {
        this.error = true;
        this.mensajeError = resultadoValidacion.errores.join('\n');
        return;
      }

      // Construcción del objeto Proyecto con el departamento como objeto anidado
      const proyectoActualizado: Proyecto = {
        id_proyecto: this.selectedProyecto.id_proyecto,
        nombre: formulario.nombre,
        objetivo: formulario.objetivo,
        fecha_ini: formulario.fecha_ini,
        fecha_fin: formulario.fecha_fin,
        departamento: this.departamentos.find(d => d.id === formulario.id_departamento)!
      };

      const response = await firstValueFrom(
        this.proyectoService.actualizarProyecto(proyectoActualizado.id_proyecto, proyectoActualizado)
      );

      if (response.status === 200) {
        this.cargarDatosIniciales();
        this.cerrarModalEdicion();
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Error al actualizar el proyecto');
      }
    } catch (error: any) {
      this.mensajeError = error?.message || 'Error al actualizar el proyecto';
    } finally {
      this.editando = false;
    }
  }

  get proyectosVisibles() {
    return this.mostrarTodos ? this.proyectos : this.proyectos.slice(0, 4);
  }

  toggleMostrarTodos() {
    this.mostrarTodos = !this.mostrarTodos;
  }

}
