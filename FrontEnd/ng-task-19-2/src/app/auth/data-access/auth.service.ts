import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from '@angular/fire/auth';
import { AuthStateService } from '../../compartido/data-access/auth-state.service';

export interface Usuario {
  email: string;
  contrasenia: string;
}

export interface AuthResponse {
  email: string;
  nombre: string;
  apellidos: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http   = inject(HttpClient);
  private _router = inject(Router);
  private _auth   = inject(Auth);
  private _authStateService = inject(AuthStateService);

  private apiUrl = 'http://localhost:8080/alicanteFutura/api/v1';

  constructor() {}

  // Registro usando TU API
  async registrarse(usuario: Usuario): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this._http.post<AuthResponse>(
        `${this.apiUrl}/usuarios`,
        {
          email: usuario.email,
          contrasenya: usuario.contrasenia
        }
      )
    );
    localStorage.setItem('usuario', JSON.stringify(response));
    this._authStateService.setAuthEstado(true);
    this._router.navigate(['/mainview']);
    return response;
  }

  // Login usando TU API
  async iniciarSesión(usuario: Usuario): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this._http.post<AuthResponse>(
        `${this.apiUrl}/usuarios/login`,
        {
          email: usuario.email,
          contrasenya: usuario.contrasenia
        }
      )
    );

    console.log('Respuesta del backend:', response);

    localStorage.setItem('usuario', JSON.stringify(response));
    this._authStateService.setAuthEstado(true);
    this._router.navigate(['/mainview']);
    return response;
  }

  // Login con Google (Firebase) — temporal
  iniciarSesionGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider)
      .then(credential => {
        const fbUser = credential.user;
        // Construimos un objeto mínimo para tu perfil:
        const usuario: AuthResponse = {
          email: fbUser.email ?? '',
          nombre: fbUser.displayName ?? '',
          apellidos: '',
          telefono: ''
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this._authStateService.setAuthEstado(true);
        this._router.navigate(['/mainview']);
      });
  }

  // Login con Facebook (Firebase) — temporal
  iniciarSesionFacebook(): Promise<void> {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this._auth, provider)
      .then(credential => {
        const fbUser = credential.user;
        const usuario: AuthResponse = {
          email: fbUser.email ?? '',
          nombre: fbUser.displayName ?? '',
          apellidos: '',
          telefono: ''
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this._authStateService.setAuthEstado(true);
        this._router.navigate(['/mainview']);
      });
  }

  // Cerrar sesión (limpia tanto Firebase como localStorage)
  async logout() {
    await signOut(this._auth);
    localStorage.removeItem('usuario');
    this._authStateService.setAuthEstado(false);
    this._router.navigate(['/auth/sign-in']);
  }

  // Obtener usuario desde localStorage
  getCurrentUser(): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      const storedUser = localStorage.getItem('usuario');
      if (!storedUser) {
        reject('Usuario no encontrado en localStorage');
        return;
      }
      try {
        resolve(JSON.parse(storedUser));
      } catch {
        reject('Error parseando los datos del usuario');
      }
    });
  }

  // Actualizar perfil en backend y en localStorage
  updateUser(usuario: {
    email: string;
    nombre: string;
    apellidos: string;
    telefono: string;
  }): Promise<AuthResponse> {
    const url = `${this.apiUrl}/usuarios/${encodeURIComponent(usuario.email)}`;
    return firstValueFrom(
      this._http.put<AuthResponse>(
        url,
        {
          nombre:    usuario.nombre,
          apellidos: usuario.apellidos,
          telefono:  usuario.telefono
        }
      )
    ).then(updatedUser => {
      localStorage.setItem('usuario', JSON.stringify(updatedUser));
      this._authStateService.setAuthEstado(true);
      
      return updatedUser;
    });
  }
}
