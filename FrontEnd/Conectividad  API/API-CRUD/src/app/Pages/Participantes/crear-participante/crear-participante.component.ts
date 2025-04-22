// crear-participante.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, Subject, takeUntil, firstValueFrom, timeout, TimeoutError, catchError } from 'rxjs';

import { Participante } from '../../../Modelos/Participante';
import { ParticipanteService } from '../../../Servicios/participante.service';
import { ValidarParticipanteService } from '../../../Validaciones/validar-participante.service';

@Component({
  selector: 'app-crear-participante',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-participante.component.html',
  styleUrl: './crear-participante.component.css'
})
export class CrearParticipanteComponent implements OnInit, OnDestroy {
  participanteForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  private readonly TIMEOUT_MS = 10000;
  private destroy$ = new Subject<void>();

  constructor(
    private participanteService: ParticipanteService,
    private validatorService: ValidarParticipanteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.participanteForm = this.validatorService.crearFormulario();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  volver(): void {
    this.router.navigate(['/participantes']);
  }

  async crearParticipante(): Promise<void> {
    if (this.participanteForm.invalid) {
      this.ifTouched(this.participanteForm);
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    try {
      const participante: Participante = {
        ...this.participanteForm.value,
        id: this.participanteForm.value.id.trim(),
        nombre: this.participanteForm.value.nombre.trim(),
        apellidos: this.participanteForm.value.apellidos?.trim() || '',
        email: this.participanteForm.value.email.trim(),
        telefono: this.participanteForm.value.telefono || null
      };

      const participantes = await this.obtenerParticipantes();
      const error = this.validatorService.validarDuplicados(participante, participantes);

      if (error) {
        this.errorMessage = error;
        this.loading = false;
        return;
      }

      await firstValueFrom(
        this.participanteService.crearParticipante(participante).pipe(
          timeout(this.TIMEOUT_MS),
          takeUntil(this.destroy$),
          catchError(error => {
            this.handleError(error);
            throw error;
          }),
          finalize(() => this.loading = false)
        )
      );

      this.successMessage = 'Participante creado correctamente';
      this.router.navigate(['/participantes']);
    } catch {
      this.loading = false;
    }
  }

  private async obtenerParticipantes(): Promise<Participante[]> {
    return await firstValueFrom(
      this.participanteService.listaParticipantes().pipe(
        timeout(this.TIMEOUT_MS),
        takeUntil(this.destroy$),
        catchError(error => {
          if (error instanceof TimeoutError) {
            throw new Error('La operación ha excedido el tiempo límite al consultar participantes.');
          }
          throw error;
        })
      )
    );
  }

  private handleError(error: unknown): void {
    console.error('Error en la operación:', error);

    if (error instanceof TimeoutError) {
      this.errorMessage = 'La operación ha excedido el tiempo límite.';
    } else if (error instanceof HttpErrorResponse) {
      if (error.status === 409) {
        this.errorMessage = 'Ya existe un participante con estos datos.';
      } else {
        this.errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
    } else if (error instanceof Error) {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = 'Error desconocido. Intente nuevamente.';
    }
  }

  private ifTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  get idControl() { return this.participanteForm.get('id'); }
  get nombreControl() { return this.participanteForm.get('nombre'); }
  get emailControl() { return this.participanteForm.get('email'); }
  get telefonoControl() { return this.participanteForm.get('telefono'); }
}
