import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Formulario {
  id: number;
  nombre: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private baseUrl = 'https://datastruct.onrender.com/alicanteFutura/api/v1/formularios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Formulario[]> {
    return this.http.get<Formulario[]>(this.baseUrl);
  }
}
