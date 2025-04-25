import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Department } from '../modelos/departamento';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
=======
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id: number;
  nombre: string;
  description: string;
}
>>>>>>> dad23b5fa5042b0972907991275e94c9f238435b

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
<<<<<<< HEAD
  baseUrl: string = 'http://localhost:8080/alicanteFutura/api/v1/departamentos';
  departamentos: Department[] = []

  constructor(private httpClient: HttpClient) { }

  listaDepartamentos(): Observable<Department[]>{
    return this.httpClient.get<Department[]>(this.baseUrl)
    .pipe(
      tap(res => this.departamentos = res)
    );
  }

  getDepartamento(id: any): Observable<Department> {
    return this.httpClient.get<Department>(`${this.baseUrl}/${id}`)
  }

  crearDepartamento(departamento: Department): Observable<Department> {
    return this.httpClient.post<Department>(this.baseUrl, departamento)
    .pipe(
      tap(nuevoDepartamento => {
        this.departamentos.push(nuevoDepartamento);
      })
    );
  }

  actualizarDepartamento(id: any, departamento: Department): Observable<Department> {
    return this.httpClient.put<Department>(`${this.baseUrl}/${id}`, departamento)
    .pipe(
      tap(departamentoActualizado => {
        const indice = this.departamentos.findIndex(p => p.id === id);
        if(indice !== -1) {
          this.departamentos[indice] = departamentoActualizado;
        }
      })
    );
  }

  eliminarDepartamento(id: any): Observable<Department> {
    return this.httpClient.delete<Department>(`${this.baseUrl}/${id}`)
=======
  private baseUrl = 'http://localhost:8080/alicanteFutura/api/v1/departamentos'; 

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
>>>>>>> dad23b5fa5042b0972907991275e94c9f238435b
  }
}
