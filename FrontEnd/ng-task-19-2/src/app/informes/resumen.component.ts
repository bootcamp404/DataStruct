import { Component, OnInit } from '@angular/core';
import { MemoriaService } from '../services/memoria.service';
import { ResumenMemoriaDTO } from '../modelos/resumen-memoria.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-memoria',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './resumen.component.html'
})
export class ResumenComponent implements OnInit {

  resumen?: ResumenMemoriaDTO;
  anio: number = 2025;
  selectedYear: number = 2025;

  constructor(private memoriaService: MemoriaService) {}

  ngOnInit(): void {
    this.memoriaService.getResumen(this.anio).subscribe({
      next: (data) => this.resumen = data,
      error: (err) => console.error('Error cargando resumen', err)
    });
  }

  generarMemoria() {
    const year = this.selectedYear || new Date().getFullYear();

    this.memoriaService.generarMemoriaAnual(year).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `memoria_${year}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Error al generar la memoria anual:', error);
      }
    });
  }
 

}
