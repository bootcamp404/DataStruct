import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, updateProfile, User } from '@angular/fire/auth';
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
  contrasenya: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private _auth = inject(Auth);
  private _router = inject(Router);
  private _authStateService = inject(AuthStateService);
  private _isLoggedIn: boolean | null = null;

  private apiUrl = 'http://localhost:8080/alicanteFutura/api/v1';

  constructor() {}

  // Registro usando TU API
  async registrarse(usuario: Usuario): Promise<AuthResponse> {
    try {
      return await firstValueFrom(
        this._http.post<AuthResponse>(`${this.apiUrl}/usuarios`, {
          email: usuario.email,
          contrasenia: usuario.contrasenia
        })
      );
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }


  // Login usando TU API
  async iniciarSesión(usuario: Usuario): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this._http.post<AuthResponse>(`${this.apiUrl}/usuarios/login`, {
        email: usuario.email,
        contrasenya: usuario.contrasenia
      })
    );

    localStorage.setItem('usuario', JSON.stringify(response));
    this._authStateService.setAuthEstado(true);
    this._router.navigate(['/mainview']);

    return response;
  }

  // Inicio de sesión con Google (Firebase)
  iniciarSesionGoogle() {
    const google = new GoogleAuthProvider();
    return signInWithPopup(this._auth, google);
  }

  // Inicio de sesión con Facebook (Firebase)
  iniciarSesionFacebook() {
    const facebook = new FacebookAuthProvider();
    return signInWithPopup(this._auth, facebook);
  }

  // Logout general
  async logout() {
    localStorage.removeItem('usuario');
    this._authStateService.setAuthEstado(false);
    this._router.navigate(['/auth/sign-in']);
  }

  // // Token, si en el futuro lo necesitas
  // guardarToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // obtenerToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn(): boolean {
  //   return !!this.obtenerToken();
  // }

  // Saber si el usuario esta logeado sin token
  async isLogged(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user; // Devuelve true si existe usuario, false si es null
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false; // En caso de error, considera no logueado
    }
  }
  // Getter para estado de autenticación
  get isLoggedIn(): boolean {
    return this._isLoggedIn ?? false;
  }


  // Obtener usuario actual desde localStorage
  getCurrentUser(): Promise<AuthResponse | null> {
    return new Promise((resolve) => {
      const storedUser = localStorage.getItem('usuario');
      if (!storedUser) {
        resolve(null); // en lugar de reject
        return;
      }

      try {
        const user = JSON.parse(storedUser) as AuthResponse;
        resolve(user);
      } catch (error) {
        console.error('Error parseando los datos del usuario', error);
        resolve(null); // también aquí en lugar de reject
      }
    });
  }


  // Actualizar datos de usuario por email
  actualizarUsuario(email: string, usuario: any): Promise<void> {
    return firstValueFrom(
      this._http.put<void>(`${this.apiUrl}/usuarios/${encodeURIComponent(email)}`, usuario)
    );
  }

  // Opcional: actualizar perfil en Firebase si usas Auth de Firebase
  updateUser(usuario: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = this._auth.currentUser;
      if (user) {
        updateProfile(user, {
          displayName: usuario.nombre
        }).then(() => resolve())
          .catch((error) => reject(error));
      } else {
        reject('Usuario no autenticado');
      }
    });
  }
}
