import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private apiUrl = '/api'; // Ajusta esto a tu API base
  
  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las estadísticas necesarias para el dashboard
   */
  obtenerEstadisticas(year: number): Observable<any> {
    // Hacemos múltiples peticiones en paralelo y combinamos resultados
    return forkJoin({
      formularios: this.obtenerFormularios(),
      respuestas: this.obtenerRespuestas(year),
      departamentos: this.obtenerDepartamentos()
    }).pipe(
      map(results => this.calcularEstadisticas(results, year)),
      catchError(error => {
        console.error('Error al obtener estadísticas:', error);
        return of(this.getEstadisticasVacias());
      })
    );
  }

  /**
   * Obtiene la lista de formularios
   */
  private obtenerFormularios(): Observable<any[]> {
    // Ajusta la URL según tu API
    return this.http.get<any[]>(`${this.apiUrl}/formularios`).pipe(
      catchError(error => {
        console.error('Error al obtener formularios:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene las respuestas filtradas por año
   */
  private obtenerRespuestas(year: number): Observable<any[]> {
    // Ajusta la URL según tu API
    return this.http.get<any[]>(`${this.apiUrl}/respuestas?year=${year}`).pipe(
      catchError(error => {
        console.error('Error al obtener respuestas:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene la lista de departamentos
   */
  private obtenerDepartamentos(): Observable<any[]> {
    // Ajusta la URL según tu API
    return this.http.get<any[]>(`${this.apiUrl}/departamentos`).pipe(
      catchError(error => {
        console.error('Error al obtener departamentos:', error);
        return of([]);
      })
    );
  }

  /**
   * Calcula todas las estadísticas necesarias
   */
  private calcularEstadisticas(data: any, year: number): any {
    const { formularios, respuestas, departamentos } = data;
    
    // Calcular estadísticas básicas
    const totalFormularios = formularios.length;
    const totalRespuestas = respuestas.length;
    
    // Calcular respuestas por mes
    const respuestasPorMes = this.calcularRespuestasPorMes(respuestas);
    
    // Calcular respuestas por formulario
    const respuestasPorFormulario = this.calcularRespuestasPorFormulario(respuestas, formularios);
    
    // Calcular respuestas por departamento
    const respuestasPorDepartamento = this.calcularRespuestasPorDepartamento(respuestas, departamentos);
    
    return {
      totalFormularios,
      totalRespuestas,
      respuestasPorMes,
      respuestasPorFormulario: respuestasPorFormulario.conteos,
      nombresFormularios: respuestasPorFormulario.nombres,
      respuestasPorDepartamento: respuestasPorDepartamento.conteos,
      nombresDepartamentos: respuestasPorDepartamento.nombres
    };
  }

  /**
   * Calcula respuestas por mes para el año seleccionado
   */
  private calcularRespuestasPorMes(respuestas: any[]): number[] {
    // Inicializar array de 12 meses con ceros
    const meses = Array(12).fill(0);
    
    // Contar respuestas por mes
    respuestas.forEach(respuesta => {
      const fecha = new Date(respuesta.fechaCreacion);
      const mes = fecha.getMonth(); // 0-11
      meses[mes]++;
    });
    
    return meses;
  }

  /**
   * Calcula respuestas por formulario
   */
  private calcularRespuestasPorFormulario(respuestas: any[], formularios: any[]): any {
    const conteos = Array(formularios.length).fill(0);
    const nombres = formularios.map(f => f.titulo || f.nombre);
    
    // Contar respuestas por formulario
    respuestas.forEach(respuesta => {
      const formularioId = respuesta.formularioId;
      const index = formularios.findIndex(f => f.id === formularioId);
      if (index !== -1) {
        conteos[index]++;
      }
    });
    
    return { conteos, nombres };
  }

  /**
   * Calcula respuestas por departamento
   */
  private calcularRespuestasPorDepartamento(respuestas: any[], departamentos: any[]): any {
    const conteos = Array(departamentos.length).fill(0);
    const nombres = departamentos.map(d => d.nombre);
    
    // Contar respuestas por departamento
    respuestas.forEach(respuesta => {
      const deptoId = respuesta.departamentoId;
      const index = departamentos.findIndex(d => d.id === deptoId);
      if (index !== -1) {
        conteos[index]++;
      }
    });
    
    return { conteos, nombres };
  }

  /**
   * Devuelve objeto con estadísticas vacías
   */
  private getEstadisticasVacias(): any {
    return {
      totalFormularios: 0,
      totalRespuestas: 0,
      respuestasPorMes: Array(12).fill(0),
      respuestasPorFormulario: [],
      nombresFormularios: [],
      respuestasPorDepartamento: [],
      nombresDepartamentos: []
    };
  }
}