import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface Departamento {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  formularios: string[];
  colorClase: string;
}

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './departamentos.component.html',
})
export class DepartamentosComponent {
  departamentos: Departamento[] = [
    {
      id: 'RRHH',
      nombre: 'Recursos Humanos',
      icono: 'rrhh.png',
      descripcion: 'Gestión de empleados y contrataciones',
      formularios: ['Empleados', 'Contratos'],
      colorClase: 'text-pink-500'
    },
    {
      id: 'EMP',
      nombre: 'Empleo y Formación',
      icono: 'empleo.png',
      descripcion: 'Gestión de proyectos y seguimiento',
      formularios: ['Proyectos', 'Tareas'],
      colorClase: 'text-green-600'
    },
    {
      id: 'JUR',
      nombre: 'Jurídico Administrativo',
      icono: 'legal.png',
      descripcion: 'Documentos administrativos y contratos',
      formularios: ['Facturas', 'Presupuestos'],
      colorClase: 'text-orange-500'
    },
    {
      id: 'MRK',
      nombre: 'Marketing y Comunicación',
      icono: 'marketing.png',
      descripcion: 'Gestión de comunicación y campañas de marketing',
      formularios: ['Informes', 'Objetivos'],
      colorClase: 'text-blue-600'
    }
  ];

  constructor(private router: Router) {}

  accederDepartamento(deptoId: string): void {
    this.router.navigate(['/departamentos', deptoId]);
  }
}
