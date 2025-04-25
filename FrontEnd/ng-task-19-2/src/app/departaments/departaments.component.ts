import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../mainview/header/header.component";
import { RouterLink } from '@angular/router';

interface Department {
  id: number;
  name: string;
  description: string;
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
  imports: [CommonModule, FormsModule, HeaderComponent, RouterLink],
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.css']
})
export class DepartamentsComponent implements OnInit {
  departments: Department[] = [];
  vistaActual: 'cuadricula' | 'lista' = 'cuadricula';
  searchTerm: string = '';
  
  constructor() { }

  ngOnInit(): void {
    // Inicializar departamentos
    this.departments = [
      {
        id: 1,
        name: 'Recursos Humanos',
        description: 'Gestiona el personal y las evaluaciones.',
        icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125h15.002M4.501 20.125a.75.75 0 00-.75.75V21.75a.75.75 0 00.75.75h15.002a.75.75 0 00.75-.75v-.875a.75.75 0 00-.75-.75H4.501z',
        iconColorClass: 'text-blue-500',
        bgColorClass: 'bg-blue-100',
        textColorClass: 'text-blue-700',
        buttonBgClass: 'bg-custom-blue',
        buttonHoverClass: 'hover:bg-custom-blue-hover'
      },
      {
        id: 2,
        name: 'Empleo Formación',
        description: 'Encuentra oportunidades y aprende.',
        icon: 'M8.25 9.75L10.5 12 8.25 14.25M16.5 9.75L14.25 12 16.5 14.25M14.25 6.75L12 9 9.75 6.75M12 12L9.75 14.25 12 16.5 14.25 14.25 12 12z',
        iconColorClass: 'text-green-500',
        bgColorClass: 'bg-green-100',
        textColorClass: 'text-green-700',
        buttonBgClass: 'bg-custom-blue',
        buttonHoverClass: 'hover:bg-custom-blue-hover'
      },
      {
        id: 3,
        name: 'Promoción Económica',
        description: 'Impulsa el desarrollo de la economía.',
        icon: 'M2.25 12h2.25m8.25-9l4.5 16.5m-8.25-9l4.5 16.5m-3 3h15m-15 6h15m1.121-14.29l9.579 15.79m-4.5-14.29l9.579 15.79',
        iconColorClass: 'text-purple-500',
        bgColorClass: 'bg-purple-100',
        textColorClass: 'text-purple-700',
        buttonBgClass: 'bg-custom-blue',
        buttonHoverClass: 'hover:bg-custom-blue-hover'
      },
      {
        id: 4,
        name: 'Marketing Comunicación',
        description: 'Comparte mensajes y promociona.',
        icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .857.911 1.39 1.677.947l4.8-2.88a1.237 1.237 0 011.342 0l4.8 2.88c.766.443 1.677-.09 1.677-.947V9.75',
        iconColorClass: 'text-orange-500',
        bgColorClass: 'bg-orange-100',
        textColorClass: 'text-orange-700',
        buttonBgClass: 'bg-custom-blue',
        buttonHoverClass: 'hover:bg-custom-blue-hover'
      },
      {
        id: 5,
        name: 'Jurídico Administrativos',
        description: 'Se encarga de los temas legales.',
        icon: 'M12 21v-2m0 2a2 2 0 01-2-2V7a2 2 0 012-2m0 2a2 2 0 002 2v13a2 2 0 00-2 2z',
        iconColorClass: 'text-red-500',
        bgColorClass: 'bg-red-100',
        textColorClass: 'text-red-700',
        buttonBgClass: 'bg-custom-blue',
        buttonHoverClass: 'hover:bg-custom-blue-hover'
      },
      {
        id: 6,
        name: 'Desarrollo Local Estratégico',
        description: 'Planifica el futuro de la zona.',
        icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25M3.75 13.5h8.25m-3-3l3-3M3.75 13.5l-3 3L12 21l3-3m-3-3h8.25',
        iconColorClass: 'text-indigo-500',
        bgColorClass: 'bg-indigo-100',
        textColorClass: 'text-indigo-700',
        buttonBgClass: 'bg-custom-blue',
        buttonHoverClass: 'hover:bg-custom-blue-hover'
      }
    ];
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
    // Implementar lógica de búsqueda
  }

  
}
