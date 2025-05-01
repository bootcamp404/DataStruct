import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Departamento } from '../modelos/departamento';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = `${environment.apiUrl}/departamentos`;
  private departamentosSubject = new BehaviorSubject<Departamento[]>([]);
  departamentos$ = this.departamentosSubject.asObservable();

setDepartamentos(departamentos: Departamento[]) {
  this.departamentosSubject.next(departamentos);
}

  constructor(private http: HttpClient) {}

  obtenerDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  eliminarDepartamento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  crearDepartamento(departamento: Departamento): Observable<HttpResponse<Departamento>> {
    return this.http.post<Departamento>(
      `${this.apiUrl}`, 
      departamento, 
      { observe: 'response' } // This makes Angular return the full response object
    );
  }
  actualizarDepartamento(id: string, departamento: Departamento): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/${id}`, departamento, { headers, observe: 'response' })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }
} 