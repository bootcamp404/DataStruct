import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      title: 'Formularios Personalizados',
      description: 'Crea formularios adaptados a las necesidades específicas de cada departamento.'
    },
    {
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      title: 'Organización Departamental',
      description: 'Gestiona formularios por departamentos para una mejor organización y seguimiento.'
    },
    {
      icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
      title: 'Exportación a PDF',
      description: 'Exporta formularios e informes en formato PDF para compartir o archivar.'
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Análisis Avanzado',
      description: 'Visualiza datos y tendencias con gráficos interactivos y paneles personalizables.'
    },
    {
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      title: 'Colaboración en Equipo',
      description: 'Trabaja en conjunto con diferentes roles y permisos para cada miembro del equipo.'
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Automatización de Procesos',
      description: 'Automatiza flujos de trabajo con aprobaciones y notificaciones.'
    }
  ];
}