import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Participante } from '../../../Modelos/Participante';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipanteService } from '../../../Servicios/participante.service';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editarParticipante.component.html',
  styleUrl: './editarParticipante.component.css'
})
export class EditarParticipanteComponent implements OnInit, OnDestroy {
  participante: Participante = {} as Participante;
  loading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participanteService: ParticipanteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID de participante no proporcionado';
      this.loading = false;
      return;
    }
    this.loadParticipante(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Te muestra el participante a editar
  private loadParticipante(id: string): void {
    this.participanteService.getParticipante(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (res) => {
          this.participante = res;
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar participante';
          console.error('Error al cargar:', err);
        }
      });
  }

  actualizarParticipante(): void {
    if (!this.participante.id) return;
    
    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    this.participanteService.actualizarParticipante(this.participante.id, this.participante)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Participante actualizado correctamente';
          this.router.navigate(['']);
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar participante';
          console.error('Error al actualizar:', err);
          this.router.navigate(['']);
        }
      });
  }
}