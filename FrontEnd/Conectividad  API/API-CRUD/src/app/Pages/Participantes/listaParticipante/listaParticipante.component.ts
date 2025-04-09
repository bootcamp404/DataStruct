import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParticipanteService } from '../../../Servicios/participante.service';
import { Participante } from '../../../Modelos/Participante';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lista',
  imports: [ RouterLink],
  templateUrl: './listaParticipante.component.html',
  styleUrl: './listaParticipante.component.css'
})
export class ListaParticipanteComponent implements OnInit, OnDestroy {
  participantes: Participante[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private participantesService: ParticipanteService) {}

  ngOnInit(): void {
    this.getParticipantesList();
  }

  // Maneja  la limpieza de subscripciones y evita memory leaks.
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getParticipantesList(): void {
    this.loading = true;
    this.participantesService.listaParticipantes()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (res) => {
          this.participantes = res;
        },
        error: (err) => {
          console.error('Error al cargar participantes:', err);
        }
      });
  }

  eliminarParticipante(id: string | number): void {
    const index = this.participantes.findIndex(p => p.id === id);
    if (index === -1) return;
   
    const participanteEliminado = this.participantes[index];
    this.participantes = this.participantes.filter(p => p.id !== id);
   
    // Luego confirmar con el servidor
    this.participantesService.eliminarParticipante(id)
      .pipe(takeUntil(this.destroy$))
      // Subscribe sirve para poder acceder a los datos de la API
      .subscribe({
        next: () => {
          console.log('Eliminación exitosa');
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.getParticipantesList();
        }
      });
  }
}