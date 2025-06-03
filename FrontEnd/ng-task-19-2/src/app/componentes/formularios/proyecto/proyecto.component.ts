import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Proyecto } from '../../../modelos/proyecto';
import { Departamento } from '../../../modelos/departamento';
import { ProyectoService } from '../../../services/proyecto.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { ActualizarService } from '../../../services/actualizar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom, forkJoin, Subscription } from 'rxjs';
import { ProyectoValidaciones } from '../../../validaciones/proyecto.validaciones';
import { AuthService } from '../../../auth/data-access/auth.service';

interface ProyectoConDepartamento extends Proyecto {
  nombre_departamento: string; // solo para mostrar en UI
}

@Component({
  selector: 'app-proyecto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  host: {
    ngSkipHydration: 'true'
  }
})
export class ProyectoComponent implements OnInit, OnDestroy {
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
  filtroTexto: string = '';

  private refreshSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private actualizarPag: ActualizarService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioEdicion = this.fb.group({
      nombre: ['', Validators.required],
      objetivo: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      id_departamento: ['', Validators.required]  // solo id para el select
    });
  }

  ngOnInit() {
    this.cargarDatosIniciales();

    this.refreshSubscription = this.actualizarPag.actualizarPagina$.subscribe(() => {
      this.cargarDatosIniciales();
    });
  }

  ngOnDestroy() {
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

        const rol = this.authService.getRole();

        let proyectosFiltrados: Proyecto[] = [];

        if (rol === 1) {
          proyectosFiltrados = proyectos;
        } else if (rol != null && rol >= 2 && rol <= 15) {
          proyectosFiltrados = proyectos.filter(p => p.departamento?.id === rol.toString());
        } else if (rol === 16) {
          proyectosFiltrados = [];
        } else {
          proyectosFiltrados = proyectos;
        }

        this.proyectos = proyectosFiltrados.map(proyecto => {
          const nombreDepto = proyecto.departamento?.id
            ? this.getNombreDepartamento(proyecto.departamento.id)
            : 'Desconocido';

          return {
            ...proyecto,
            nombre_departamento: nombreDepto
          } as ProyectoConDepartamento;
        });

        this.proyectoService.setProyectos(proyectosFiltrados);
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

      // Validación personalizada
      const resultadoValidacion = ProyectoValidaciones.validarFormulario(
        this.formularioEdicion,
        this.proyectos.filter(p => p.id_proyecto !== this.selectedProyecto?.id_proyecto)
      );

      if (!resultadoValidacion.valido) {
        this.error = true;
        this.mensajeError = resultadoValidacion.errores.join('\n');
        return;
      }

      // Construcción del objeto Proyecto con departamento solo con id
      const proyectoActualizado: Proyecto = {
        id_proyecto: this.selectedProyecto.id_proyecto,
        nombre: formulario.nombre,
        objetivo: formulario.objetivo,
        fecha_ini: formulario.fecha_ini,
        fecha_fin: formulario.fecha_fin,
        departamento: { id: formulario.id_departamento }  // solo id
      };

      console.log('Proyecto a actualizar:', JSON.stringify(proyectoActualizado));

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
      if (error.status === 200) {
        this.cargarDatosIniciales();
        this.cerrarModalEdicion();
        this.router.navigate(['/dashboard']);
      } else {
        this.mensajeError = error?.message || 'Error al actualizar el departamento';
      }    } finally {
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
