import { Injectable } from '@angular/core';
import { Participante } from '../Modelos/Participante';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  baseURL: string = 'http://localhost:8080/alicanteFutura/api/v1/participantes';
  participantes: Participante[] = [];

  constructor(private httpClient: HttpClient) {}

  // Te muestra los participantes de la API
  listaParticipantes(): Observable<Participante[]> {
    return this.httpClient.get<Participante[]>(this.baseURL)
      .pipe(
        tap(res => this.participantes = res)
      );  
  }

  // Te muestra el participante de la API
  getParticipante(id: any): Observable<Participante> {
    return this.httpClient.get<Participante>(`${this.baseURL}/${id}`)
  }

  crearParticipante(participante: Participante): Observable<Participante> {
    return this.httpClient.post<Participante>(this.baseURL, participante)
      .pipe(
        tap(nuevoParticipante => {
          this.participantes.push(nuevoParticipante);
        })
      );  
    }

  actualizarParticipante(id: string, participante: Participante): Observable<Participante> {
    return this.httpClient.put<Participante>(`${this.baseURL}/${id}`, participante)
      .pipe(
        tap(participanteActualizado => {
          const index = this.participantes.findIndex(p => p.id === id);
          if (index !== -1) {
            this.participantes[index] = participanteActualizado;
          }
        })
      );
    }

  eliminarParticipante(id: any): Observable<Participante> {
    return this.httpClient.delete<Participante>(`${this.baseURL}/${id}`)
  }
}
