import { Component } from '@angular/core';
import { Participante } from '../../../Modelos/Participante';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ParticipanteService } from '../../../Servicios/participante.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear',
  imports: [ FormsModule ],
  templateUrl: './crearParticipante.component.html',
  styleUrl: './crearParticipante.component.css'
})
export class CrearParticipanteComponent {
  // Modelo de participante
  participante: Participante = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: ''
  };

  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private participanteService: ParticipanteService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  crearDataParticipante(): void {
    // Validación básica
    if (!this.participante.nombre?.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.participanteService.crearParticipante(this.participante)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (res) => {
        console.log('Participante creado:', res);
        this.successMessage = 'Participante creado correctamente';
        setTimeout(() => {
          this.limpiarFormulario();
          this.router.navigate(['']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.errorMessage = 'Error al crear el participante';
      }
    });
  }

  limpiarFormulario(): void {
    this.participante = {
      id: '',
      nombre: '',
      apellidos: '',
      email: '',
      telefono: ''
    };
    this.successMessage = null;
    this.errorMessage = null;
  }
}