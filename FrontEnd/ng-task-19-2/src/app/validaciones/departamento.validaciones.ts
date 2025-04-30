import { FormGroup } from '@angular/forms';
import { Departamento } from '../modelos/departamento';

export class DepartamentoValidaciones {
  static validarFormulario(formulario: FormGroup, departamentos: Departamento[]): { valido: boolean; errores: string[] } {
    const errores: string[] = [];
    const valores = formulario.value;

    // Validar campos requeridos
    if (!valores.id) {
      errores.push('ID requerido');
    }
    if (!valores.nombre) {
      errores.push('Nombre requerido');
    }

    // Validar formato del ID
    if (valores.id) {
      if (valores.id.length < 3) {
        errores.push('El ID debe tener al menos 3 caracteres');
      }
      if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(valores.id)) {
        errores.push('El ID debe empezar con una letra y solo puede contener letras y números');
      }
    }

    // Validar formato del nombre
    if (valores.nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valores.nombre)) {
      errores.push('El nombre solo puede contener letras y espacios');
    }

    // Validar duplicados
    if (valores.id) {
      const idDuplicado = departamentos.some(d => d.id === valores.id);
      if (idDuplicado) {
        errores.push('Ya existe un departamento con ese ID');
      }
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }
} 