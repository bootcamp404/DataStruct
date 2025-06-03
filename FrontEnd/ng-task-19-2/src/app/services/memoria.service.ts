import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResumenMemoriaDTO } from '../modelos/resumen-memoria.dto';
import { PrevisualizacionDTO } from '../modelos/previsualizacion.dto';

export interface ResumenDepartamentoDTO {
  id: string;
  nombre: string;
  personasAtendidas: number;
  altasDemandantes: number;
  accionesOrientacion: number;
  cursos: number;
  participantes: number;
  horas: number;
  empresasApoyadas: number;
  nuevasEmpresas: number;
  sesionesAsesoramiento: number;
}



@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

  private baseUrl = 'http://localhost:8080/memoria';

  constructor(private http: HttpClient) {}

  getResumen(anio: number): Observable<ResumenMemoriaDTO> {
    return this.http.get<ResumenMemoriaDTO>(`${this.baseUrl}/resumen/${anio}`);
  }
  generarMemoriaAnual(anio: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf/${anio}`, {
      responseType: 'blob'
    });
  }

  getPrevisualizacion(anio: number): Observable<PrevisualizacionDTO> {
  return this.http.get<PrevisualizacionDTO>(`${this.baseUrl}/previsualizacion/${anio}`);
}

generarPdfPersonalizado(anio: number, imagenesIds: number[]): Observable<Blob> {
  return this.http.post(`${this.baseUrl}/pdf/${anio}`, imagenesIds, {
    responseType: 'blob'
  });
}

  
}
