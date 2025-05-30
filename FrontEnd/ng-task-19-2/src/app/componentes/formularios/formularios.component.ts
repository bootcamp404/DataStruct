import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../mainview/header/header.component";

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
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {
  formularios: Formulario[] = [];
  vistaActual: 'cuadricula' | 'lista' = 'cuadricula';
  filtroEstado: string = 'Todos los estados';
  filtroDepartamento: string = 'Todos los...';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Simulación de datos de formularios
    this.formularios = [
      {
        id: 1,
        titulo: 'Crear Proyecto',
        departamento: 'Gestión',
        descripcion: 'Formulario para crear nuevos proyectos',
        respuestas: 24,
        fecha: '12/4/2024',
        estado: 'Activo'
      },
      {
        id: 2,
        titulo: 'Crear Actividad',
        departamento: 'Gestión',
        descripcion: 'Formulario para crear nuevas actividades',
        respuestas: 56,
        fecha: '5/4/2024',
        estado: 'Activo'
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
    // Navegar a proyectos o actividades según el id
    if (id === 1) {
      this.router.navigate(['/proyectos']);
    } else if (id === 2) {
      this.router.navigate(['/actividades']);
    }
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