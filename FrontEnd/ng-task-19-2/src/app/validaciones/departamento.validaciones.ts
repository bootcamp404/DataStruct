import { FormGroup } from '@angular/forms';
import { Departamento } from '../modelos/departamento';

export class DepartamentoValidaciones {
  static validarFormulario(formulario: FormGroup, departamentos: Departamento[]): { valido: boolean; errores: string[] } {
    const errores: string[] = [];
    const valores = formulario.value;

    // Validar campos requeridos
    if (!valores.nombre) {
      errores.push('Nombre requerido');
    }

    // Validar formato del nombre
    if (valores.nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valores.nombre)) {
      errores.push('El nombre solo puede contener letras y espacios');
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }
} 