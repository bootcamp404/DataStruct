import { Component } from '@angular/core';
import { Departamento } from '../../../Modelos/Departamento';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from '../../../Servicios/departamento.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-departamento',
  imports: [ FormsModule, CommonModule],
  templateUrl: './editar-departamento.component.html',
  styleUrl: './editar-departamento.component.css'
})
export class EditarDepartamentoComponent {
  departamento: Departamento = {} as Departamento;
  loading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID del departamento no ha sido proporcionado';
      this.loading = false;
      return;
    }
    this.cargarDepartamento(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarDepartamento(id: string): void {
    this.departamentoService.getDepartamento(id)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (res) => {
        this.departamento = res;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar el departamento';
        console.error('Error al cargar:', err);
      }
    });
  }
  
  actualizarDepartamento(): void {
    if (!this.departamento.id) return;
    
    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    this.departamentoService.actualizarDepartamento(this.departamento.id, this.departamento)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: () => {
        this.successMessage = 'Departamento actualizado correctamente';
        this.router.navigate(['']);
      },
      error: (err) => {
        this.errorMessage = 'Error al actualizar el departamento';
        console.error('Error al actualizar:', err);
        this.router.navigate(['']);
      }
    });
  }
}
