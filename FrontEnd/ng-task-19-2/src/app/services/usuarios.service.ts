import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'https://datastruct.onrender.com/alicanteFutura/api/v1/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }
}
