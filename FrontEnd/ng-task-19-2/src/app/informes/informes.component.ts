import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../services/estadisticas.service';
import { Chart, registerables } from 'chart.js';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})

export class InformesComponent implements OnInit {
  activeTab: string = 'resumen';
  year: number = 2025;
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

    // Referencias a los gráficos
  graficoPorFormulario: Chart | null = null;
  graficoActividadMensual: Chart | null = null;
  
  // Etiquetas para los gráficos
  mesesLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


  aniosDisponibles = [2025, 2024, 2023, 2022];

  constructor(private estadisticasService: EstadisticasService) { }

  ngOnInit(): void {
    this.cargarEstadisticas();
  
  }

  cargarEstadisticas(): void {
    this.loading = true;
    
    this.estadisticasService.obtenerEstadisticas(this.year).subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.loading = false;
        
        // Crear gráficos una vez que los datos estén cargados
        setTimeout(() => {
          this.crearGraficoFormularios();
          this.crearGraficoActividadMensual();
        }, 100);
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
        this.loading = false;
      }
    });
  }

  cambiarTab(tab: string): void {
    this.activeTab = tab;

     // Recrear gráficos si se cambia al tab de resumen
     if (tab === 'resumen') {
      setTimeout(() => {
        this.crearGraficoFormularios();
        this.crearGraficoActividadMensual();
      }, 100);
    }
  }

  cambiarAnio(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const anio = parseInt(selectElement.value, 10);
    
    if (this.year !== anio) {
      this.year = anio;
      this.cargarEstadisticas();
    }
  }

  crearGraficoFormularios(): void {
    // Destruir gráfico anterior si existe
    if (this.graficoPorFormulario) {
      this.graficoPorFormulario.destroy();
    }
    
    const ctx = document.getElementById('graficoFormularios') as HTMLCanvasElement;
    if (!ctx) return;
    
    // Limitar a los 10 formularios con más respuestas si hay muchos
    const datos = [...this.estadisticas.respuestasPorFormulario];
    const nombres = [...this.estadisticas.nombresFormularios];
    
    if (datos.length > 10) {
      datos.splice(10);
      nombres.splice(10);
    }
    
    this.graficoPorFormulario = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [{
          label: 'Respuestas',
          data: datos,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }


  crearGraficoActividadMensual(): void {
    // Destruir gráfico anterior si existe
    if (this.graficoActividadMensual) {
      this.graficoActividadMensual.destroy();
    }
    
    const ctx = document.getElementById('graficoActividadMensual') as HTMLCanvasElement;
    if (!ctx) return;
    
    this.graficoActividadMensual = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.mesesLabels,
        datasets: [{
          label: 'Respuestas',
          data: this.estadisticas.respuestasPorMes,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  exportarMemoriaAnual(): void {
    // Implementar la generación y descarga del documento de memoria anual
    this.estadisticasService.generarMemoriaAnual(this.year).subscribe({
      next: (data) => {
        // Crear un enlace temporal para la descarga del archivo
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Memoria_Anual_${this.year}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al generar la memoria anual:', error);
      }
    });
  }

  imprimirPagina(): void {
    window.print();
  }

  compartirInforme(): void {
    // Aquí puedes implementar la funcionalidad para compartir
    // Por ejemplo, mostrar un modal con opciones de compartir
    alert('Función de compartir en desarrollo');
  }

}
