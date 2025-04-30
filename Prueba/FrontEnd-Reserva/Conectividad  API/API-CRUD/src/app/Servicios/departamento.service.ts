import { Injectable } from '@angular/core';
import { Departamento } from '../Modelos/Departamento';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  baseUrl: string = 'http://localhost:8080/alicanteFutura/api/v1/departamentos';
  departamentos: Departamento[] = []

  constructor(private httpClient: HttpClient) { }

  listaDepartamentos(): Observable<Departamento[]>{
    return this.httpClient.get<Departamento[]>(this.baseUrl).pipe(
      tap(res => this.departamentos = res)
    );
  }

  getDepartamento(id: any): Observable<Departamento> {
    return this.httpClient.get<Departamento>(`${this.baseUrl}/${id}`)
  }

  crearDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.httpClient.post<Departamento>(this.baseUrl, departamento).pipe(
      tap(nuevoDepartamento => {
        this.departamentos.push(nuevoDepartamento);
      })
    );
  }

  actualizarDepartamento(id: any, departamento: Departamento): Observable<Departamento> {
    return this.httpClient.put<Departamento>(`${this.baseUrl}/${id}`, departamento).pipe(
      tap(departamentoActualizado => {
        const indice = this.departamentos.findIndex(p => p.id === id);
        if(indice !== -1) {
          this.departamentos[indice] = departamentoActualizado;
        }
      })
    );
  }

  eliminarDepartamento(id: any): Observable<Departamento> {
    return this.httpClient.delete<Departamento>(`${this.baseUrl}/${id}`)
  }
}
