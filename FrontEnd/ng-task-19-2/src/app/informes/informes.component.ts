import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../services/estadisticas.service';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})

export class InformesComponent implements OnInit {
  activeTab: string = 'resumen';
  year: number = 2024;
  loading: boolean = true;
  
  // Estadísticas inicializadas con valores vacíos
  estadisticas = {
    totalFormularios: 0,
    totalRespuestas: 0,
    respuestasPorMes: Array(12).fill(0),
    respuestasPorFormulario: [],
    nombresFormularios: [],
    respuestasPorDepartamento: [],
    nombresDepartamentos: []
  };
  
  // Etiquetas para los gráficos
  mesesLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private estadisticasService: EstadisticasService) { }

  ngOnInit(): void {
    this.cargarEstadisticas();
    
    // Configurar escucha para actualizaciones (opcional)
    this.configurarEscuchaActualizaciones();
  }

  cargarEstadisticas(): void {
    this.loading = true;
    
    this.estadisticasService.obtenerEstadisticas(this.year).subscribe(
      (data) => {
        this.estadisticas = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar estadísticas:', error);
        this.loading = false;
      }
    );
  }

  cambiarTab(tab: string): void {
    this.activeTab = tab;
  }

  cambiarAnio(anio: number): void {
    this.year = anio;
    this.cargarEstadisticas();
  }

  // Opcional: escucha para actualizaciones en tiempo real
  configurarEscuchaActualizaciones(): void {
    // Si tienes eventos de cambio de datos, puedes suscribirte aquí
    // Por ejemplo, si tienes un servicio de WebSockets o un BehaviorSubject
    
    // Ejemplo con intervalo:
    // const intervalo = setInterval(() => {
    //   this.cargarEstadisticas();
    // }, 60000); // Actualizar cada minuto
  }
}
