import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Formulario {
  id: number;
  titulo: string;
  departamento: string;
  descripcion: string;
  respuestas: number;
  fecha: string;
  estado: 'Activo' | 'Borrador' | 'Inactivo';
}

@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {
  formularios: Formulario[] = [];
  vistaActual: 'cuadricula' | 'lista' = 'cuadricula';
  filtroEstado: string = 'Todos los estados';
  filtroDepartamento: string = 'Todos los...';
  
  constructor() { }

  ngOnInit(): void {

    // Simulación de datos de formularios
    this.formularios = [
      {
        id: 1,
        titulo: 'Evaluación de Desempeño',
        departamento: 'Recursos Humanos',
        descripcion: 'Formulario para evaluar el rendimiento de los empleados',
        respuestas: 24,
        fecha: '12/4/2024',
        estado: 'Activo'
      },
      {
        id: 2,
        titulo: 'Encuesta de Satisfacción',
        departamento: 'Marketing',
        descripcion: 'Formulario para medir la satisfacción de los clientes',
        respuestas: 56,
        fecha: '5/4/2024',
        estado: 'Activo'
      },
      {
        id: 3,
        titulo: 'Reporte de Gastos',
        departamento: 'Finanzas',
        descripcion: 'Formulario para reportar gastos relacionados con el trabajo',
        respuestas: 18,
        fecha: '2/4/2024',
        estado: 'Activo'
      },
      {
        id: 4,
        titulo: 'Solicitud de Vacaciones',
        departamento: 'Recursos Humanos',
        descripcion: 'Formulario para solicitar días de vacaciones',
        respuestas: 32,
        fecha: '1/4/2024',
        estado: 'Activo'
      },
      {
        id: 5,
        titulo: 'Solicitud de Material',
        departamento: 'Operaciones',
        descripcion: 'Formulario para solicitar material de oficina',
        respuestas: 0,
        fecha: '15/3/2024',
        estado: 'Borrador'
      }
    ];
  }

  cambiarVista(vista: 'cuadricula' | 'lista'): void {
    this.vistaActual = vista;
  }

  crearFormulario(): void {
    // Implementar lógica para crear nuevo formulario
    console.log('Crear nuevo formulario');
  }

  verFormulario(id: number): void {
    // Implementar lógica para ver un formulario
    console.log('Ver formulario', id);
  }

  editarFormulario(id: number, event: Event): void {
    event.stopPropagation();
    // Implementar lógica para editar formulario
    console.log('Editar formulario', id);
  }

  duplicarFormulario(id: number, event: Event): void {
    event.stopPropagation();
    // Implementar lógica para duplicar formulario
    console.log('Duplicar formulario', id);
  }

  eliminarFormulario(id: number, event: Event): void {
    event.stopPropagation();
    // Implementar lógica para eliminar formulario
    console.log('Eliminar formulario', id);
  }
}