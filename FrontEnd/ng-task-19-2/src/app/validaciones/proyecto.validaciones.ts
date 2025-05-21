import { FormGroup } from '@angular/forms';
import { Proyecto } from '../modelos/proyecto';

export class ProyectoValidaciones {
  static validarFormulario(formulario: FormGroup, proyectos: Proyecto[]): { valido: boolean; errores: string[] } {
    const errores: string[] = [];
    const valores = formulario.value;

    // Validar campos requeridos
    if (!valores.nombre) {
      errores.push('Nombre requerido');
    }
    if (!valores.objetivo) {
      errores.push('Objetivo requerido');
    }
    if (!valores.fecha_ini) {
      errores.push('Fecha de inicio requerida');
    }
    if (!valores.id_departamento) {
      errores.push('Departamento requerido');
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

    // Validar formato del nombre y objetivo
    if (valores.nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valores.nombre)) {
      errores.push('El nombre solo puede contener letras y espacios');
    }

    if (valores.objetivo && valores.objetivo.length < 10) {
      errores.push('El objetivo debe tener al menos 10 caracteres');
    }

    // Validar fechas
    if (valores.fecha_ini && valores.fecha_fin) {
      const fechaInicio = new Date(valores.fecha_ini);
      const fechaFin = new Date(valores.fecha_fin);

      if (fechaInicio > fechaFin) {
        errores.push('La fecha de inicio no puede ser posterior a la fecha de finalización');
      }
    }

    // Validar duplicados
    if (valores.id) {
      const idDuplicado = proyectos.some(p => p.id_proyecto === valores.id);
      if (idDuplicado) {
        errores.push('Ya existe un proyecto con ese ID');
      }
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }
}
