import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Subvencion } from '../modelos/subvencion';

@Injectable({ providedIn: 'root' })
export class SubvencionService {
  private apiUrl = `${environment.apiUrl}/subvenciones`;

  constructor(private http: HttpClient) {}

  obtenerSubvenciones(): Observable<Subvencion[]> {
    return this.http.get<Subvencion[]>(this.apiUrl);
  }

  crearSubvencion(subvencion: Subvencion): Observable<HttpResponse<Subvencion>> {
    return this.http.post<Subvencion>(this.apiUrl, subvencion, { observe: 'response' });
  }
} 