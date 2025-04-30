import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResumenMemoriaDTO {
  anio: number;
  presupuestoTotal: number;
  presupuestoEjecutado: number;
  porcentajeEjecucion: number;
  personasOrientadas: number;
  actividadesFormacion: number;
  participantesFormacion: number;
  contrataciones: number;
  empresasCreadas: number;
  asesoramientos: number;
  ayudasEmpresas: number;
  importeAyudas: number;
  resumenDepartamentos: ResumenDepartamentoDTO[];
}

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
  
}
