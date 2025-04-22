import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Participante } from '../Modelos/Participante';

@Injectable({
  providedIn: 'root'
})
export class ValidarParticipanteService {
  constructor(private fb: FormBuilder) {}

  crearFormulario(): FormGroup {
    return this.fb.group({
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

  validarDuplicados(participante: Participante, existentes: Participante[]): string | null {
    if (existentes.some(p => p.id === participante.id)) {
      return `El ID '${participante.id}' ya está en uso. Por favor, utilice otro.`;
    }
    if (existentes.some(p => p.email === participante.email)) {
      return `El email '${participante.email}' ya está en uso. Por favor, utilice otro.`;
    }
    if (participante.telefono && existentes.some(p => p.telefono === participante.telefono)) {
      return `El teléfono '${participante.telefono}' ya está en uso. Por favor, utilice otro.`;
    }
    return null;
  }

  validarParticipante(participante: Participante): string | null {
    if (!participante.nombre?.trim()) {
      return 'El nombre es obligatorio';
    }
    if (!participante.email?.trim()) {
      return 'El email es obligatorio';
    }
    if (!this.validarFormatoEmail(participante.email)) {
      return 'El formato del email no es válido';
    }
    if (participante.telefono !== undefined && participante.telefono !== null) {
      const telefonoStr = participante.telefono.toString().trim();
      if (telefonoStr && !this.validarFormatoTelefono(telefonoStr)) {
        return 'El teléfono debe tener 9 dígitos numéricos';
      }
    }
    return null;
  }

  // Método para verificar si un control tiene errores y ha sido tocado
  hasError(control: AbstractControl | null, errorType?: string): boolean {
    if (!control) return false;
    
    if (errorType) {
      return control.touched && control.hasError(errorType);
    }
    return control.touched && control.invalid;
  }

  // Método para obtener el mensaje de error de un control específico
  getErrorMessage(control: AbstractControl | null, controlName: string): string {
    if (!control || !control.errors || !control.touched) return '';
    
    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    
    if (control.hasError('pattern')) {
      if (controlName === 'email') {
        return 'Formato de email inválido';
      }
      if (controlName === 'telefono') {
        return 'El teléfono debe tener 9 dígitos numéricos';
      }
    }
    
    if (control.hasError('minlength')) {
      return `Mínimo ${control.getError('minlength').requiredLength} caracteres`;
    }
    
    return 'Campo inválido';
  }

  // Método para validar el formulario completo y devolver un mensaje de error general
  validarFormulario(form: FormGroup): string | null {
    if (form.valid) return null;
    
    // Marcar todos los campos como tocados para mostrar los errores
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      control?.markAsTouched();
    });
    
    return 'Por favor, corrija los errores en el formulario antes de continuar.';
  }

  private validarFormatoEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private validarFormatoTelefono(telefono: string): boolean {
    const telefonoRegex = /^\d{9}$/;
    return telefonoRegex.test(telefono);
  }
}
