import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, Subject, takeUntil, firstValueFrom, timeout, TimeoutError, catchError } from 'rxjs';

import { Participante } from '../../../Modelos/Participante';
import { ParticipanteService } from '../../../Servicios/participante.service';

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
  
  // Timeout en milisegundos
  private readonly TIMEOUT_MS = 10000;
  private destroy$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    private participanteService: ParticipanteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.participanteForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(1)]],
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      apellidos: [''],
      email: ['', [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      telefono: ['', [
        Validators.pattern(/^\d{9}$/)
      ]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Función para volver a la página/ruta de participantes
  volver(): void {
    this.router.navigate(['/participantes']);
  }

  // Función principal para crear participante
  async crearParticipante(): Promise<void> {
    if (this.participanteForm.invalid) {
      this.ifTouched(this.participanteForm);
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    try {
      // Validar si existe duplicado
      const isValid = await this.validarDuplicados();
      if (!isValid) {
        this.loading = false;
        return;
      }

      // Crear el objeto participante desde el formulario
      const participante: Participante = this.participanteForm.value;
      
      // Eliminar espacios en blanco y normalizar datos
      participante.id = participante.id.trim();
      participante.nombre = participante.nombre.trim();
      participante.apellidos = participante.apellidos?.trim() || '';
      participante.email = participante.email.trim();
      
      // Si el teléfono está vacío, asegurar que sea null o string vacío según API
      if (!participante.telefono) {
        participante.telefono = null;
      }

      // Enviar al servicio
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
    } 
    catch (error) {
      // El error ya se maneja en catchError
      this.loading = false;
    }
  }

  private async validarDuplicados(): Promise<boolean> {
    const formValues = this.participanteForm.value;
    try {
      const participantes = await this.obtenerParticipantes();
      
      // Validar ID duplicado
      if (participantes.some(p => p.id === formValues.id.trim())) {
        this.errorMessage = `El ID '${formValues.id}' ya está en uso. Por favor, utilice otro.`;
        return false;
      }
      
      // Validar email duplicado
      if (participantes.some(p => p.email === formValues.email.trim())) {
        this.errorMessage = `El email '${formValues.email}' ya está en uso. Por favor, utilice otro.`;
        return false;
      }
      
      // Validar teléfono duplicado (si se proporcionó)
      if (formValues.telefono && 
          participantes.some(p => p.telefono === formValues.telefono)) {
        this.errorMessage = `El teléfono '${formValues.telefono}' ya está en uso. Por favor, utilice otro.`;
        return false;
      }
      
      return true;
    } 
    catch (error) {
      this.handleError(error);
      return false;
    }
  }

  private async obtenerParticipantes(): Promise<Participante[]> {
    try {
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
    catch (error) {
      console.error('Error al obtener participantes:', error);
      throw error;
    }
  }

  private handleError(error: unknown): void {
    console.error('Error en la operación:', error);
    
    if (error instanceof TimeoutError) {
      this.errorMessage = 'La operación ha excedido el tiempo límite. Por favor, inténtelo de nuevo.';
    } else if (error instanceof HttpErrorResponse) {
      if (error.status === 409) {
        this.errorMessage = 'Ya existe un participante con estos datos.';
      } else {
        this.errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
    } else if (error instanceof Error) {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = 'Error al procesar la solicitud. Por favor, inténtelo de nuevo.';
    }
  }

  // Utilidad para marcar todos los campos como tocados para mostrar errores
  private ifTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }
  
  // Getters para facilitar la validación en la plantilla
  get idControl() { return this.participanteForm.get('id'); }
  get nombreControl() { return this.participanteForm.get('nombre'); }
  get emailControl() { return this.participanteForm.get('email'); }
  get telefonoControl() { return this.participanteForm.get('telefono'); }
}