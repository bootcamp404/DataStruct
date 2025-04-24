import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id: number;
  nombre: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private baseUrl = 'http://localhost:8080/alicanteFutura/api/v1/departamentos'; 

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }
}
