import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {
  // Subject para emitir eventos de actualización
  private actualizarArchivoDepartamento = new Subject<void>();
  
  // Observable al que otros componentes pueden suscribirse
  actualizarDepartamentos$ = this.actualizarArchivoDepartamento.asObservable();
  
  // Método para notificar que se debe actualizar la lista de departamentos
  refreshDepartamentos() {
    this.actualizarArchivoDepartamento.next();
  }
}