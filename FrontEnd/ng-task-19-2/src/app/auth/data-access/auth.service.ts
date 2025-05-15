import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, updateProfile, User } from '@angular/fire/auth';


export interface Usuario{
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

  private apiUrl = 'http://localhost:8080/alicanteFutura/api/v1';

  constructor() {}

// Registro usando TU API
  async registrarse(usuario: Usuario): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this._http.post<AuthResponse>(`${this.apiUrl}/usuarios`, {
        email: usuario.email,
        contrasenya: usuario.contrasenia
      })
    );
    this._router.navigate(['/mainview'])
    this.guardarToken(response.token)
    return response;
  }

  // Login usando TU API
 async iniciarSesión(usuario: Usuario): Promise<AuthResponse> {
  const response = await firstValueFrom(
    this._http.post<AuthResponse>(`${this.apiUrl}/usuarios/login`, {
      email: usuario.email,
      contrasenya: usuario.contrasenia
    })
  );

  console.log('Respuesta del backend al iniciar sesión:', response);

  this.guardarToken(response.token); // Aquí puede estar el fallo si response.token es undefined
  localStorage.setItem('usuario', JSON.stringify(response)); // Aquí igual
  this._router.navigate(['/mainview']);
  return response;
}

iniciarSesionGoogle(){
  const google = new GoogleAuthProvider

  return signInWithPopup(this._auth, google)
}
iniciarSesionFacebook(){
  const facebook = new FacebookAuthProvider

  return signInWithPopup(this._auth, facebook)
}

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
  isLoggedIn(): boolean{
    return !!this.obtenerToken();
  }

getCurrentUser(): Promise<any> {
  return new Promise((resolve, reject) => {
    const token = this.obtenerToken();
    if (!token) {
      reject('Token no encontrado');
      return;
    }

    this._http.get<any>(`${this.apiUrl}/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(
      response => resolve(response),
      error => reject(error)
    );
  });
}

updateUser(usuario: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const user = this._auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: usuario.nombre, // Actualiza el nombre
        // photoURL: usuario.photoURL, // Actualiza la foto si la tienes
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject('Usuario no autenticado');
    }
  });
}
}
