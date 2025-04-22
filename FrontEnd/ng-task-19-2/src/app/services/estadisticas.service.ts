import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las estadísticas para un año específico
   * @param year Año para el cual obtener estadísticas
   */
  obtenerEstadisticas(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas?year=${year}`).pipe(
      map(response => {
        // Asegurarse de que los datos tengan el formato correcto
        return {
          totalFormularios: response.totalFormularios || 0,
          totalRespuestas: response.totalRespuestas || 0,
          respuestasPorMes: response.respuestasPorMes || Array(12).fill(0),
          respuestasPorFormulario: response.respuestasPorFormulario || [],
          nombresFormularios: response.nombresFormularios || [],
          respuestasPorDepartamento: response.respuestasPorDepartamento || [],
          nombresDepartamentos: response.nombresDepartamentos || []
        };
      }),
      catchError(error => {
        console.error('Error obteniendo estadísticas:', error);
        // Devolver datos vacíos en caso de error
        return of({
          totalFormularios: 0,
          totalRespuestas: 0,
          respuestasPorMes: Array(12).fill(0),
          respuestasPorFormulario: [],
          nombresFormularios: [],
          respuestasPorDepartamento: [],
          nombresDepartamentos: []
        });
      })
    );
  }

  /**
   * Genera la memoria anual como PDF
   * @param year Año para el cual generar la memoria
   */
  generarMemoriaAnual(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/memoria-anual/${year}`, {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        console.error('Error generando memoria anual:', error);
        throw error;
      })
    );
  }

  /**
   * Opcional: Obtener datos de un formulario específico
   * @param formId ID del formulario
   * @param year Año para filtrar los datos
   */
  obtenerDatosFormulario(formId: string, year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/formularios/${formId}/estadisticas?year=${year}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo datos del formulario ${formId}:`, error);
        return of({});
      })
    );
  }

  /**
   * Opcional: Obtener datos de un departamento específico
   * @param deptId ID del departamento
   * @param year Año para filtrar los datos
   */
  obtenerDatosDepartamento(deptId: string, year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/departamentos/${deptId}/estadisticas?year=${year}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo datos del departamento ${deptId}:`, error);
        return of({});
      })
    );
  }
}