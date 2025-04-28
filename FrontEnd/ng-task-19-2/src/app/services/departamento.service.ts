import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Department {
  id: number;
  nombre: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
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
}
