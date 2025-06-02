import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatResponse {
  respuesta: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private url = 'http://localhost:8080/alicanteFutura/api/v1/chat';

  constructor(private http: HttpClient) {}

  // Cambiamos el nombre a 'chat' para que coincida con el componente
  chat(pregunta: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.url, { pregunta });
  }
}
