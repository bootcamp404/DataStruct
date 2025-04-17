import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Participante } from '../../../Modelos/Participante';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipanteService } from '../../../Servicios/participante.service';
import { finalize, Subject, takeUntil, firstValueFrom, timeout, catchError, TimeoutError, retry, delay, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-participante.component.html',
  styleUrl: './editar-participante.component.css'
})
export class EditarParticipanteComponent implements OnInit, OnDestroy {
  participante: Participante = {} as Participante;
  loading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  // OPCIÓN 1: Aumentar el tiempo de timeout
  private readonly TIMEOUT_MS = 30000; // Aumentado de 10000 a 30000
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participanteService: ParticipanteService
  ) {}

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

  private validarDatosParticipante(): boolean {
    // Reiniciamos mensaje de error
    this.errorMessage = null;
   
    // Validación de nombre
    if (!this.participante.nombre?.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      return false;
    }
   
    // Validación de email
    if (!this.participante.email?.trim()) {
      this.errorMessage = 'El email es obligatorio';
      return false;
    } else if (!this.validarFormatoEmail(this.participante.email)) {
      this.errorMessage = 'El formato del email no es válido';
      return false;
    }
   
    // Validación del teléfono
    if (this.participante.telefono !== undefined && this.participante.telefono !== null) {
      const telefonoStr = this.participante.telefono.toString().trim();
      if (telefonoStr && !this.validarFormatoTelefono(telefonoStr)) {
        this.errorMessage = 'El teléfono debe tener 9 dígitos numéricos';
        return false;
      }
    }
   
    return true;
  }
  
  private validarFormatoEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
  private validarFormatoTelefono(telefono: string): boolean {
    if (!telefono || telefono.trim() === '') {
      return true;
    }
    const telefonoRegex = /^\d{9}$/;
    return telefonoRegex.test(telefono);
  }
  
  // Carga el participante a editar con OPCIÓN 2: Reintentos automáticos
  private cargarParticipante(id: string): void {
    this.participanteService.getParticipante(id)
      .pipe(
        // OPCIÓN 2: Mecanismo de reintentos
        retry(3), // Reintentará hasta 3 veces si hay errores
        takeUntil(this.destroy$),
        timeout(this.TIMEOUT_MS),
        catchError(error => {
          this.handleError(error);
          this.loading = false;
          return of(null); // Devuelve un observable con valor null para evitar romper la cadena
        }),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (participante) => {
          if (participante) {
            this.participante = participante;
          } else {
            // Solo mostrar este mensaje si no se mostró un error antes
            if (!this.errorMessage) {
              this.errorMessage = `No se pudo cargar el participante con ID: ${id}`;
            }
          }
        }
      });
  }
  
  async actualizarParticipante(): Promise<void> {
    if (!this.participante.id) {
      this.errorMessage = 'ID de participante no válido';
      return;
    }
  
    if (!this.validarDatosParticipante()) {
      return;
    }
  
    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
  
    const participanteActualizado: Participante = {
      ...this.participante,
      id: this.participante.id?.trim() || '',
      nombre: this.participante.nombre?.trim() || '',
      apellidos: this.participante.apellidos?.trim() || '',
      email: this.participante.email?.trim() || '',
      telefono: this.participante.telefono || null
    };
  
    try {
      const response = await firstValueFrom(
        this.participanteService.actualizarParticipante(participanteActualizado.id, participanteActualizado).pipe(
          delay(500),
          timeout(this.TIMEOUT_MS),
          retry(2),
          takeUntil(this.destroy$)
        )
      );
  
      this.successMessage = 'Participante actualizado correctamente';
      setTimeout(() => {
        this.router.navigate(['/participantes']);
      }, 1000);
  
    } catch (error) {} 
    finally {
      this.loading = false;
    }
  }
  

  private handleError(error: unknown): void {    
    if (error instanceof TimeoutError) {
      this.errorMessage = 'La operación ha excedido el tiempo límite. Por favor, inténtelo de nuevo.';
    } else if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión.';
      } else if (error.status === 404) {
        this.errorMessage = 'El participante no ha sido encontrado.';
      } else if (error.status === 409) {
        this.errorMessage = 'Ya existe un participante con estos datos.';
      } else if (error.status === 400) {
        this.errorMessage = 'Datos inválidos. Por favor revise la información ingresada.';
      } else if (error.status === 200 && error.error) {
        // Redireccionar después de un pequeño delay
          this.router.navigate(['/participantes']);
        return; // Importante: retornamos para que no establezca errorMessage
      } else {
        this.errorMessage = `Error del servidor: ${error.status} - ${error.statusText || 'Error desconocido'}`;
      }
    } else if (error instanceof Error) {
      // Si el error menciona parsing, podría ser un problema de formato pero la operación fue exitosa
      if (error.message?.includes('Http failure during parsing')) {
        console.warn('Error de parsing detectado, posiblemente operación exitosa:', error);
        this.successMessage = 'La operación se ha completado correctamente.';
        // Redireccionar después de un pequeño delay
        setTimeout(() => {
          this.router.navigate(['/participantes']);
        }, 1000);
        return; // Importante: retornamos para que no establezca errorMessage
      } else {
        this.errorMessage = error.message;
      }
    } else {
      this.errorMessage = 'Error al procesar la solicitud. Por favor, inténtelo de nuevo.';
    }
  }
}