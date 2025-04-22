import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil, firstValueFrom, timeout, catchError, TimeoutError, retry, delay, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Participante } from '../../../Modelos/Participante';
import { ParticipanteService } from '../../../Servicios/participante.service';
import { ValidarParticipanteService } from '../../../Validaciones/validar-participante.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-participante.component.html',
  styleUrl: './editar-participante.component.css'
})
export class EditarParticipanteComponent implements OnInit, OnDestroy {
  participante: Participante = {} as Participante;
  participanteForm: FormGroup;
  loading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  private readonly TIMEOUT_MS = 30000;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participanteService: ParticipanteService,
    private validadorService: ValidarParticipanteService
  ) {
    // Inicializar el formulario
    this.participanteForm = this.validadorService.crearFormulario();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'El ID del participante no ha sido proporcionado';
      this.loading = false;
      return;
    }

    this.cargarParticipante(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarParticipante(id: string): void {
    this.participanteService.getParticipante(id)
    .pipe(
      takeUntil(this.destroy$),
      timeout(this.TIMEOUT_MS),
      catchError(error => {
        console.error('Error del backend:', error);
        this.handleError(error);
        return of(null);
      }),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (participante) => {
        if (participante) {
          this.participante = participante;
          // Actualizar formulario con datos del participante
          this.participanteForm.patchValue({
            id: participante.id,
            nombre: participante.nombre,
            apellidos: participante.apellidos,
            email: participante.email,
            telefono: participante.telefono
          });
        } else if (!this.errorMessage) {
          this.errorMessage = `No se pudo cargar el participante con ID: ${id}`;
        }
      }
    });
  }

  actualizarParticipante(): void {
    // Validar el formulario usando el servicio de validación
    this.errorMessage = this.validadorService.validarFormulario(this.participanteForm);
    if (this.errorMessage) return;

    this.loading = true;
    this.successMessage = null;

    const participanteActualizado = this.limpiarParticipante(this.participanteForm.value);

    this.participanteService.actualizarParticipante(participanteActualizado.id, participanteActualizado)
      .pipe(
        delay(500),
        timeout(this.TIMEOUT_MS),
        takeUntil(this.destroy$),
        catchError(error => {
          this.handleError(error);
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (result) => {
          if (result !== null) {
            this.mostrarExitoYRedireccion('Participante actualizado correctamente');
          }
        }
      });
  }

  // Método delegado al servicio para verificar errores
  hasError(controlName: string, errorType?: string): boolean {
    const control = this.participanteForm.get(controlName);
    return this.validadorService.hasError(control, errorType);
  }

  // Método delegado al servicio para obtener mensajes de error
  getErrorMessage(controlName: string): string {
    const control = this.participanteForm.get(controlName);
    return this.validadorService.getErrorMessage(control, controlName);
  }

  private limpiarParticipante(participante: Participante): Participante {
    return {
      ...participante,
      id: participante.id?.trim() || '',
      nombre: participante.nombre?.trim() || '',
      apellidos: participante.apellidos?.trim() || '',
      email: participante.email?.trim() || '',
      telefono: participante.telefono ?? null
    };
  }

  private handleError(error: unknown): void {
    if (error instanceof TimeoutError) {
      this.errorMessage = 'La operación ha excedido el tiempo límite. Por favor, inténtelo de nuevo.';
    } else if (error instanceof HttpErrorResponse) {
      if (error.status === 200 && error.error) {
        this.router.navigate(['/participantes']);
        return;
      }
      
      // Manejamos específicamente el error 500 para detectar posibles duplicados
      if (error.status === 500) {
        // Intentamos verificar si el error 500 está relacionado con duplicados
        const errorString = JSON.stringify(error).toLowerCase();
        if (errorString.includes('dupl') || 
            errorString.includes('unique') || 
            errorString.includes('constraint') ||
            errorString.includes('already exists')) {
          this.errorMessage = 'Ya existe un participante con estos datos. Por favor, verifique ID, email y teléfono.';
        } else {
          this.errorMessage = 'El valor introducido está repetido.';
        }
      } else {
        this.errorMessage = this.getMensajeErrorHttp(error.status);
      }
    } else if (error instanceof Error) {
      if (error.message?.includes('Http failure during parsing')) {
        console.warn('Error de parsing detectado, posiblemente operación exitosa:', error);
        this.mostrarExitoYRedireccion('La operación se ha completado correctamente.');
        return;
      }
      this.errorMessage = error.message;
    } else {
      this.errorMessage = 'Error al procesar la solicitud. Por favor, inténtelo de nuevo.';
    }
  }
  
  private getMensajeErrorHttp(status: number): string {
    switch (status) {
      case 0: return 'No se pudo conectar con el servidor. Verifique su conexión.';
      case 400: return 'Datos inválidos. Por favor revise la información ingresada.';
      case 404: return 'El participante no ha sido encontrado.';
      case 409: return 'Ya existe un participante con estos datos.';
      case 500: return 'El valor introducido está repetido.';
      default: return `Error del servidor: ${status}`;
    }
  }
  private mostrarExitoYRedireccion(mensaje: string, redirigir: boolean = true): void {
    this.successMessage = mensaje;
    if (redirigir) {
      setTimeout(() => this.router.navigate(['/participantes']), 1000);
    }
  }
}