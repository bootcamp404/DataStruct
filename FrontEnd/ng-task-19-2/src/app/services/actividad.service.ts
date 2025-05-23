// src/app/services/actividad.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Actividad } from '../modelos/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = `${environment.apiUrl}/actividades`;
  private actividadSubject = new BehaviorSubject<Actividad[]>([]);
  actividades$ = this.actividadSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Sobrescribe el listado interno y notifica a los suscriptores */
  setActividades(actividades: Actividad[]) {
    this.actividadSubject.next(actividades);
  }

  /** Lista todas las actividades */
  obtenerActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl)
      .pipe(
        tap(list => this.setActividades(list)),
        catchError(err => {
          console.error('Error al obtener actividades', err);
          return throwError(() => err);
        })
      );
  }

  /** Elimina una actividad por su ID */
  eliminarActividad(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          // Actualizar el cache local
          const actuales = this.actividadSubject.value.filter(a => a.id_actividad !== id);
          this.setActividades(actuales);
        }),
        catchError(err => {
          console.error(`Error al eliminar actividad ${id}`, err);
          return throwError(() => err);
        })
      );
  }

  /** Crea una nueva actividad, devolviendo el response completo */
  crearActividad(data: Actividad): Observable<HttpResponse<Actividad>> {
    return this.http.post<Actividad>(
      this.apiUrl,
      data,
      { observe: 'response' }
    ).pipe(
      tap(resp => {
        // Añadir al cache local
        const nueva = resp.body!;
        this.setActividades([ ...this.actividadSubject.value, nueva ]);
      }),
      catchError(err => {
        console.error('Error al crear actividad', err);
        return throwError(() => err);
      })
    );
  }

  /** Actualiza una actividad existente */
  actualizarActividad(id: string, data: Actividad): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      { headers, observe: 'response' }
    ).pipe(
      tap(resp => {
        // Refrescar la lista local
        const lista = this.actividadSubject.value.map(a =>
          a.id_actividad === id ? resp.body as Actividad : a
        );
        this.setActividades(lista);
      }),
      catchError(err => {
        console.error(`Error al actualizar actividad ${id}`, err);
        return throwError(() => err);
      })
    );
  }
}
