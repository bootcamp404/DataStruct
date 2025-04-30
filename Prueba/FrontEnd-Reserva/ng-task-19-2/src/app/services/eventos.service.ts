// src/app/services/eventos.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private cambiosDatosSubject = new Subject<string>();
  cambiosDatos$ = this.cambiosDatosSubject.asObservable();

  notificarCambio(tipo: string): void {
    this.cambiosDatosSubject.next(tipo);
  }
}