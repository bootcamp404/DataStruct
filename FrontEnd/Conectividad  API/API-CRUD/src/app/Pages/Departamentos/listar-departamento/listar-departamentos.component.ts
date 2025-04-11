import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Departamento } from '../../../Modelos/Departamento';
import { finalize, Subject, takeUntil } from 'rxjs';
import { DepartamentoService } from '../../../Servicios/departamento.service';

@Component({
  selector: 'app-listar-departamento',
  imports: [ RouterLink ],
  templateUrl: './listar-departamentos.component.html',
  styleUrl: './listar-departamentos.component.css'
})
export class ListarDepartamentoComponent implements OnInit {
  departamentos: Departamento[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit(): void {
    this.getDepartamentosList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDepartamentosList(): void {
    this.loading = true;
    this.departamentoService.listaDepartamentos()
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (res) => {
        this.departamentos = res;
      },
      error: (err) => {
        console.log('Error al cargar los departamentos:', err);
      }
    });
  }

  eliminarDepartamento(id: string): void {
    const indice = this.departamentos.findIndex(p => p.id == id);
    if (indice === -1) return;

    this.departamentos = this.departamentos.filter(p => p.id !== id);

    this.departamentoService.eliminarDepartamento(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {},
      error: (err) =>{
        console.error('Error al eliminar:', err);
        this.getDepartamentosList();
      }
    });
  }
}
