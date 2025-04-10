import { Component } from '@angular/core';
import { Departamento } from '../../../Modelos/Departamento';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../../Servicios/departamento.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-departamento',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './crear-departamento.component.html',
  styleUrl: './crear-departamento.component.css'
})
export class CrearDepartamentoComponent {

  departamento: Departamento = {
    id: '',
    nombre: ''
  };

  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  private destroy$ = new Subject<void>();  

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router
  ) {}

  volver(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  crearDataDepartamento(): void {
    // Validación básica
    if (!this.departamento.nombre?.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.departamentoService.crearDepartamento(this.departamento)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (res) => {
        console.log('Departamento creado:', res);
        this.successMessage = 'Departamento creado correctamente';
        this.limpiarFormulario();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.errorMessage = 'Error al crear el departamento';
      }
    });
  }

  limpiarFormulario(): void {
    this.departamento = {
      id: '',
      nombre: ''
    };
    this.successMessage = null;
    this.errorMessage = null;
  }
}
