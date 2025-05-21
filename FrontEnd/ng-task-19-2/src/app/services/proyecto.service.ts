import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Proyecto } from '../modelos/proyecto';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = `${environment.apiUrl}/proyectos`;
  private proyectoSubject = new BehaviorSubject<Proyecto[]>([]);
  proyectos$ = this.proyectoSubject.asObservable();

  setProyectos(proyectos: Proyecto[]) {
    this.proyectoSubject.next(proyectos);
  }

  constructor(private http: HttpClient) { }

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  eliminarProyecto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(proyecto: Proyecto): Observable<HttpResponse<Proyecto>> {
    return this.http.post<Proyecto>(
      `${this.apiUrl}`, 
      proyecto, 
      { observe: 'response' } // This makes Angular return the full response object
    );
  }
  
  actualizarProyecto(id: string, proyecto: Proyecto): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.put(`${this.apiUrl}/${id}`, proyecto, {
      headers: headers,
      observe: 'response'
    });
  }
}
