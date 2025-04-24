import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../mainview/header/header.component";
import { DepartamentoService, Department as ApiDepartment } from '../services/departamento.service';

interface Department extends ApiDepartment {
  icon: string;
  iconColorClass: string;
  bgColorClass: string;
  textColorClass: string;
  buttonBgClass: string;
  buttonHoverClass: string;
}

@Component({
  selector: 'app-departaments',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.css']
})
export class DepartamentsComponent implements OnInit {
  departments: Department[] = [];
  vistaActual: 'cuadricula' | 'lista' = 'cuadricula';
  searchTerm: string = '';

  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departments = data.map(dept => this.enriquecerDepartamento(dept));
      },
      error: (err) => {
        console.error('Error al cargar departamentos:', err);
      }
    });
  }

  cambiarVista(vista: 'cuadricula' | 'lista'): void {
    this.vistaActual = vista;
  }

  verDepartamento(id: number): void {
    console.log('Ver departamento', id);
  }

  crearDepartamento(): void {
    console.log('Crear nuevo departamento');
  }

  buscarDepartamentos(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  private enriquecerDepartamento(dept: ApiDepartment): Department {
    const nombre = dept.nombre.toLowerCase();

    type VisualStyle = {
      icon: string;
      iconColorClass: string;
      bgColorClass: string;
      textColorClass: string;
    };
    const estilos: Record<string, VisualStyle> = {
      'recursos humanos': {
        icon: 'M15.75 6a3.75 3.75 0 11-7.5 0...',
        iconColorClass: 'text-blue-500',
        bgColorClass: 'bg-blue-100',
        textColorClass: 'text-blue-700'
      },
      'empleo formación': {
        icon: 'M8.25 9.75L10.5 12 8.25 14.25...',
        iconColorClass: 'text-green-500',
        bgColorClass: 'bg-green-100',
        textColorClass: 'text-green-700'
      },
      'promoción económica': {
        icon: 'M2.25 12h2.25m8.25-9l4.5 16.5...',
        iconColorClass: 'text-purple-500',
        bgColorClass: 'bg-purple-100',
        textColorClass: 'text-purple-700'
      },
      'marketing comunicación': {
        icon: 'M2.25 12l8.954-8.955c.44-.439...',
        iconColorClass: 'text-orange-500',
        bgColorClass: 'bg-orange-100',
        textColorClass: 'text-orange-700'
      },
      'jurídico administrativos': {
        icon: 'M12 21v-2m0 2a2 2 0 01-2-2V7a2...',
        iconColorClass: 'text-red-500',
        bgColorClass: 'bg-red-100',
        textColorClass: 'text-red-700'
      },
      'desarrollo local estratégico': {
        icon: 'M3.75 13.5l10.5-11.25L12 10.5...',
        iconColorClass: 'text-indigo-500',
        bgColorClass: 'bg-indigo-100',
        textColorClass: 'text-indigo-700'
      }
    };

    const visual = estilos[nombre] || {
      icon: '',
      iconColorClass: 'text-gray-500',
      bgColorClass: 'bg-gray-100',
      textColorClass: 'text-gray-700'
    };

    return {
      ...dept,
      ...visual,
      buttonBgClass: 'bg-custom-blue',
      buttonHoverClass: 'hover:bg-custom-blue-hover'
    };
  }
}
