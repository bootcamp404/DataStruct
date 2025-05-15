import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private authEstadoSubject = new BehaviorSubject<boolean>(false);
  authEstado: Observable<boolean> = this.authEstadoSubject.asObservable();

  constructor() {
    // Verifica si hay token al cargar la app
    const token = localStorage.getItem('token');
    this.authEstadoSubject.next(!!token);
  }

  setAuthEstado(valor: boolean) {
    this.authEstadoSubject.next(valor);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.authEstadoSubject.next(false);
  }
}
