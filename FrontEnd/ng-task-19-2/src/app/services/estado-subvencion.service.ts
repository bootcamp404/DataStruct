import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface EstadoSubvencion {
  id_estado_sub: string;
}

@Injectable({ providedIn: 'root' })
export class EstadoSubvencionService {
  private apiUrl = `${environment.apiUrl}/estados-subvencion`;

  constructor(private http: HttpClient) {}

  obtenerEstados(): Observable<EstadoSubvencion[]> {
    return this.http.get<EstadoSubvencion[]>(this.apiUrl);
  }
} 