import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../mainview/header/header.component";
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../modelos/departamento';
import { DepartamentoValidaciones } from '../../validaciones/departamento.validaciones';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActualizarService } from '../../services/actualizar.service';
import { ProyectoComponent } from '../../mainview/formularios/proyecto/proyecto.component';
import { DepartamentsComponent } from '../../mainview/departaments/departaments.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnimatedBackgroundComponent } from '../../shared/components/animated-background/animated-background.component';
import { FooterComponent } from '../../mainview/footer/footer.component'; 
import { ActividadComponent } from '../../mainview/formularios/actividad/actividad.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, ProyectoComponent, DepartamentsComponent, TranslateModule,
    AnimatedBackgroundComponent, FooterComponent
  ],
})
export class DashboardComponent implements OnInit {
  showDropdown = false;
  formularioDept: FormGroup;
  departamentos: Departamento[] = [];
  creando = false;
  cargando = false;
  cargandoLista = false;
  error = false;
  mostrarModalCreacion = false;

  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private router: Router,
    private actualizarDepts: ActualizarService) {
      this.formularioDept = this.fb.group({
        id: ['', [Validators.required]],
        nombre: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.departamentoService.departamentos$.subscribe(depts => {
      this.departamentos = depts;
    });
  }

  abrirModalCreacion() {
    // Resetear el formulario
    this.formularioDept.reset({
      id: '',
      nombre: ''
    });

    // Limpiar mensajes de error
    this.mensajeError = null;
    this.error = false;

    // Mostrar el modal
    this.mostrarModalCreacion = true;
  }

  cerrarModalCreacion() {
    this.mostrarModalCreacion = false;
    this.formularioDept.reset();
    this.mensajeError = null;
    this.error = false;
  }

  async guardarNuevo() {
    this.creando = true;
    this.mensajeError = null;

    try {
      const nuevoDepartamento = this.formularioDept.value;

      // Validar el formulario contra todos los departamentos existentes
      const resultadoValidacion = DepartamentoValidaciones.validarFormulario(
        this.formularioDept,
        this.departamentos
      );

      if (!resultadoValidacion.valido) {
        this.error = true;
        this.mensajeError = resultadoValidacion.errores.join('\n');
        return;
      }

      const response = await firstValueFrom(
        this.departamentoService.crearDepartamento(nuevoDepartamento)
      );

      this.actualizarDepts.refreshPagina();

      // Si el status es 201 (created) o 200 (OK), consideramos la creación exitosa
      if (response.status === 201 || response.status === 200) {
        this.cerrarModalCreacion();

        // Redirigir a la página principal de listar
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Error al crear el departamento');
      }
    } catch (error: any) {
      // Si el error es de tipo HttpErrorResponse y el status es 200/201, consideramos la creación exitosa
      if (error.status === 200 || error.status === 201) {
        this.cerrarModalCreacion();
        this.router.navigate(['/dashboard']);
      } else {
        if (error.message === 'Ya existe un departamento con ese ID') {
          this.mensajeError = 'Ya existe un departamento con ese ID. Por favor, use un ID diferente.';
        } else {
          this.mensajeError = error?.message || 'Error al crear el departamento. Por favor, intente más tarde.';
        }
      }
    } finally {
      this.creando = false;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.showDropdown = false;
  }

  editDept(dept: any) {
    console.log('Editando departamento:', dept);
  }

  deleteDept(dept: any) {
    console.log('Eliminando departamento:', dept);
  }

  editDoc(doc: any) {
    console.log('Editando documento:', doc);
  }

  deleteDoc(doc: any) {
    console.log('Eliminando documento:', doc);
  }
}
