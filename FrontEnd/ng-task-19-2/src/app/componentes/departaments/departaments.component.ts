import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { Departamento } from '../../modelos/departamento';
import { ActualizarService } from '../../services/actualizar.service';
import { DepartamentoService } from '../../services/departamento.service';
import { DepartamentoValidaciones } from '../../validaciones/departamento.validaciones';
import { AuthService } from '../../auth/data-access/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-pagina-departamentos',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.css'],
  host: {
    ngSkipHydration: 'true'
  }
})
export class DepartamentsComponent implements OnInit {
  formularioEdicion: FormGroup;
  departamentos: Departamento[] = [];
  selectedDepartamento: Departamento | null = null;
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
    private departamentoService: DepartamentoService,
    private actualizarDepts: ActualizarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.formularioEdicion = this.fb.group({
      id: [''],
      nombre: ['']
    });
  }

  ngOnInit() {
    this.cargarDepartamentos();
    // Suscribirse al evento de actualización
    this.refreshSubscription = this.actualizarDepts.actualizarPagina$.subscribe(() => {
      this.cargarDepartamentos();
    });
  }

  ngOnDestroy(){
    // Cancelar la suscripción al destruir el componente para evitar memory leaks
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  cargarDepartamentos() {
    this.cargandoLista = true;
    this.departamentoService.obtenerDepartamentos().subscribe({
      next: (departamentos) => {
        const rol = this.authService.getRole();

        // Si el rol es 10, mostramos solo el departamento con ID 10
        if (rol === 16) {
          this.departamentos = departamentos.filter(d => d.id === 'RRHH');
        } else {
          this.departamentos = departamentos;
        }

        this.cargandoLista = false;
        this.departamentoService.setDepartamentos(this.departamentos);
      },
      error: (error) => {
        console.error('Error al cargar departamentos:', error);
        this.errorLista = true;
        this.cargandoLista = false;
      }
    });
  }


  selectDepartamento(departamento: Departamento) {
    this.selectedDepartamento = departamento;
  }

  abrirModalEdicion(departamento: Departamento) {
    this.selectedDepartamento = departamento;
    this.formularioEdicion.patchValue({
      id: departamento.id,
      nombre: departamento.nombre
    });
    this.mostrarModalEdicion = true;
  }

  cerrarModalEdicion() {
    this.mostrarModalEdicion = false;
    this.selectedDepartamento = null;
    this.formularioEdicion.reset();
  }

  async guardarEdicion() {
    if (!this.selectedDepartamento) return;

    this.editando = true;
    this.mensajeError = null;

    try {
      const departamentoActualizado = this.formularioEdicion.value;

      // Validar el formulario excluyendo el departamento actual
      const departamentosSinActual = this.departamentos.filter(d => d.id !== this.selectedDepartamento?.id);
      const resultadoValidacion = DepartamentoValidaciones.validarFormulario(
        this.formularioEdicion,
        departamentosSinActual
      );

      if (!resultadoValidacion.valido) {
        this.error = true;
        this.mensajeError = resultadoValidacion.errores.join('\n');
        return;
      }

      const response = await firstValueFrom(
        this.departamentoService.actualizarDepartamento(this.selectedDepartamento.id, departamentoActualizado)
      );

      // Si el status es 200, consideramos la actualización exitosa
      if (response.status === 200) {
        this.cargarDepartamentos();
        this.cerrarModalEdicion();

        // Redirigir a la página principal de listar
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Error al actualizar el departamento');
      }
    } catch (error: any) {
      // Si el error es de tipo HttpErrorResponse y el status es 200, consideramos la actualización exitosa
      if (error.status === 200) {
        this.cargarDepartamentos();
        this.cerrarModalEdicion();
        this.router.navigate(['/dashboard']);
      } else {
        this.mensajeError = error?.message || 'Error al actualizar el departamento';
      }
    } finally {
      this.editando = false;
    }
  }

  async eliminarDepartamento(id: string) {
    if (this.eliminando) return;

    this.eliminando = true;
    try {
      await firstValueFrom(this.departamentoService.eliminarDepartamento(id));
      this.cargarDepartamentos();
    } catch (error) {
      console.error('Error al eliminar departamento:', error);
      this.error = true;
      this.mensajeError = 'Error al eliminar el departamento';
    } finally {
      this.eliminando = false;
    }
  }

  get departamentosVisibles() {
    return this.mostrarTodos ? this.departamentos : this.departamentos.slice(0, 4);
  }

  toggleMostrarTodos() {
    this.mostrarTodos = !this.mostrarTodos;
  }
}
