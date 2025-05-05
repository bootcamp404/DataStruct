import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {
  // Subject para emitir eventos de actualización
  private actualizarService = new Subject<void>();
  
  // Observable al que otros componentes pueden suscribirse
  actualizarPagina$ = this.actualizarService.asObservable();
  
  // Método para notificar que se debe actualizar la lista de pagina
  refreshPagina() {
    this.actualizarService.next();
  }
}