import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Proyecto } from '../../modelos/proyecto';
import { firstValueFrom, Subscription } from 'rxjs';
import { ProyectoService } from '../../services/proyecto.service';
import { ActualizarService } from '../../services/actualizar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProyectoValidaciones } from '../../validaciones/proyecto.validaciones';

@Component({
  selector: 'app-proyecto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})
export class ProyectoComponent implements OnInit {
  formularioEdicion: FormGroup;
  proyectos: Proyecto[] = [];
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
  private refreshSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private actualizarPag: ActualizarService,
    private router: Router
  ) {
    this.formularioEdicion = this.fb.group({
      id: [''],
      nombre: [''],
      objetivo: [''],
      fecha_ini: [],
      fecha_fin: [],
      id_departamento: ['']
    });
  }

  ngOnInit() {
    this.cargarProyectos();
    // Suscribirse al evento de actualización
    this.refreshSubscription = this.actualizarPag.actualizarPagina$.subscribe(() => {
      this.cargarProyectos();
    });
  }

  ngOnDestroy(){
    // Cancelar la suscripción al destruir el componente para evitar memory leaks
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  cargarProyectos() {
    this.cargandoLista = true;
    this.proyectoService.obtenerProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos = proyectos;
        console.log('Proyectos recibidos:', proyectos); // Examina la estructura exacta
        this.cargandoLista = false;
        this.proyectoService.setProyectos(proyectos);
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
        this.errorLista = true;
        this.cargandoLista = false;
      }
    });
  }

  selectProyecto(proyecto: Proyecto) {
    this.selectedProyecto = proyecto;
  }

  abrirModalEdicion(proyecto: Proyecto) {
    this.selectedProyecto = proyecto;

    this.formularioEdicion.patchValue({
      id: proyecto.id_proyecto,
      nombre: proyecto.nombre,
      objetivo: proyecto.objetivo,
      fecha_ini: proyecto.fecha_ini,
      fecha_fin: proyecto.fecha_fin,
      id_departamento: proyecto.id_departamento
    });
    this.mostrarModalEdicion = true;
    console.log(this.selectedProyecto.id_proyecto)

  }

  cerrarModalEdicion() {
    this.mostrarModalEdicion = false;
    this.selectedProyecto = null;
    this.formularioEdicion.reset();
  }

  async guardarEdicion() {
    if (!this.selectedProyecto) return;

    this.editando = true;
    this.mensajeError = null;

    try {
      const proyectoActualizado = this.formularioEdicion.value;
      
      // Validar el formulario excluyendo el proyecto actual
      const proyectoSinActual = this.proyectos.filter(d => d.id_proyecto !== this.selectedProyecto?.id_proyecto);
      const resultadoValidacion = ProyectoValidaciones.validarFormulario(
        this.formularioEdicion,
        proyectoSinActual
      );

      if (!resultadoValidacion.valido) {
        this.error = true;
        this.mensajeError = resultadoValidacion.errores.join('\n');
        return;
      }

      const response = await firstValueFrom(
        this.proyectoService.actualizarProyecto(this.selectedProyecto.id_proyecto, proyectoActualizado)
      );

      // Si el status es 200, consideramos la actualización exitosa
      if (response.status === 200) {
        this.cargarProyectos();
        this.cerrarModalEdicion();
        
        // Redirigir a la página principal de listar
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Error al actualizar el proyecto');
      }
    } catch (error: any) {
      // Si el error es de tipo HttpErrorResponse y el status es 200, consideramos la actualización exitosa
      if (error.status === 200) {
        this.cargarProyectos();
        this.cerrarModalEdicion();
        this.router.navigate(['/dashboard']);
      } else {
        this.mensajeError = error?.message || 'Error al actualizar el proyecto';
      }
    } finally {
      this.editando = false;
    }
  }
}
