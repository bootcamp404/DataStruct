import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Departamento } from '../../modelos/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import { DepartamentoValidaciones } from '../../validaciones/departamento.validaciones';

@Component({
  selector: 'app-pagina-departamentos',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './departament-form.component.html',
  styleUrls: ['./departament-form.component.css'],
  host: {
    ngSkipHydration: 'true'
  }
})
export class DepartamentFormComponent implements OnInit { 
  formularioDepartamento: FormGroup;
  formularioEdicion: FormGroup;
  departamentos: Departamento[] = [];
  selectedDepartamento: Departamento | null = null;
  cargando = false;
  cargandoLista = false;
  enviado = false;
  exito = false;
  error = false;
  errorLista = false;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  modo: 'lista' | 'crear' = 'lista';
  eliminando = false;
  mostrarModalEdicion = false;
  editando = false;

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formularioDepartamento = this.fb.group({
      id: [''],
      nombre: ['']
    });

    this.formularioEdicion = this.fb.group({
      id: [''],
      nombre: ['']
    });
  }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.modo = segments[segments.length - 1]?.path === 'crear' ? 'crear' : 'lista';
      if (this.modo === 'lista') {
        this.cargarDepartamentos();
      }
    });
  }

  cargarDepartamentos() {
    this.cargandoLista = true;
    this.departamentoService.obtenerDepartamentos().subscribe({
      next: (departamentos) => {
        this.departamentos = departamentos;
        this.cargandoLista = false;
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

  async enviarFormulario() {
    this.enviado = true;
    this.mensajeError = '';

    // Validar el formulario
    const resultadoValidacion = DepartamentoValidaciones.validarFormulario(
      this.formularioDepartamento,
      this.departamentos
    );

    if (!resultadoValidacion.valido) {
      this.error = true;
      this.mensajeError = resultadoValidacion.errores.join('\n');
      return;
    }

    try {
      this.cargando = true;
      const departamento = this.formularioDepartamento.value;

      await firstValueFrom(
        this.departamentoService.crearDepartamento(departamento)
      );
      
      this.exito = true;
      this.formularioDepartamento.reset();
      
      // Redirigir a la lista después de 2 segundos
      this.router.navigate(['/departamentos']);
    } catch (error: any) {
      console.error('Error al crear departamento:', error);
      this.error = true;
      
      if (error.message === 'Ya existe un departamento con ese ID') {
        this.mensajeError = 'Ya existe un departamento con ese ID. Por favor, use un ID diferente.';
      } else {
        this.mensajeError = 'Error al crear el departamento. Por favor, intente más tarde.';
      }
      
      setTimeout(() => {
        this.error = false;
        this.mensajeError = '';
      }, 3000);
    } finally {
      this.cargando = false;
    }
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
        this.mensajeExito = 'Departamento actualizado con éxito';
        this.cargarDepartamentos();
        this.cerrarModalEdicion();
        
        // Redirigir a la página principal de listar
        this.router.navigate(['/departamentos']);
      } else {
        throw new Error('Error al actualizar el departamento');
      }
    } catch (error: any) {
      // Si el error es de tipo HttpErrorResponse y el status es 200, consideramos la actualización exitosa
      if (error.status === 200) {
        this.mensajeExito = 'Departamento actualizado con éxito';
        this.cargarDepartamentos();
        this.cerrarModalEdicion();
        this.router.navigate(['/departamentos']);
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
} 