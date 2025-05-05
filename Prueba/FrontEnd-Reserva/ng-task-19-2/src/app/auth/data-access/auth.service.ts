import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, updateProfile, User } from '@angular/fire/auth';

export interface Usuario {
  email: string;
  contrasenia: string;
}

export interface AuthResponse {
  token: string;
  usuario: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private _auth = inject(Auth);
  private _router = inject(Router);

  private baseUrl = 'http://localhost:8080/alicanteFutura/api/v1';

  constructor() {}

  // Registro usando TU API
  async registrarse(usuario: Usuario): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this._http.post<AuthResponse>(`${this.baseUrl}/usuarios`, {
        email: usuario.email,
        contrasenya: usuario.contrasenia
      })
    );
    return response;
  }

  // Login usando TU API
  async iniciarSesión(usuario: Usuario): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this._http.post<AuthResponse>(`${this.baseUrl}/usuarios`, {
        email: usuario.email,
        contrasenya: usuario.contrasenia
      })
    );
    return response;
  }

  // Login con Google usando Firebase
  async iniciarSesionGoogle() {
    const googleProvider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this._auth, googleProvider);
    return credential.user;
  }

  // Login con Facebook usando Firebase
  async iniciarSesionFacebook() {
    const facebookProvider = new FacebookAuthProvider();
    const credential = await signInWithPopup(this._auth, facebookProvider);
    return credential.user;
  }

  // Cerrar sesión (Firebase y LocalStorage)
  async logout() {
    await signOut(this._auth);
    localStorage.removeItem('token');
    this._router.navigate(['/auth/sign-in']);
  }

  // Guardar el token
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = this._auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }

  updateUser(usuario: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = this._auth.currentUser;
      if (user) {
        updateProfile(user, {
          displayName: usuario.nombre
        }).then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        });
      } else {
        reject('Usuario no autenticado');
      }
    });
  }
}
