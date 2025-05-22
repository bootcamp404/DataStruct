import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, updateProfile, User } from '@angular/fire/auth';
import { AuthStateService } from '../../compartido/data-access/auth-state.service';
import { Usuario } from '../../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private _auth = inject(Auth);
  private _router = inject(Router);
  private _authStateService = inject(AuthStateService);

  private apiUrl = 'http://localhost:8080/alicanteFutura/api/v1';

  constructor() {}

  // Registro usando TU API
  async registrarse(usuario: Pick<Usuario, 'email' | 'contrasenya'>): Promise<Usuario> {
    try {
      return await firstValueFrom(
        this._http.post<Usuario>(`${this.apiUrl}/usuarios`, {
          email: usuario.email,
          constrasenya: usuario.contrasenya
        })
      );
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }


  // Login usando TU API
  async iniciarSesión(usuario: Pick<Usuario, 'email' | 'contrasenya'>): Promise<Usuario> {
    const response = await firstValueFrom(
      this._http.post<Usuario>(`${this.apiUrl}/usuarios/login`, {
        email: usuario.email,
        contrasenya: usuario.contrasenya
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

  // Obtener usuario actual desde localStorage
  getCurrentUser(): Promise<Usuario | null> {
    return new Promise((resolve) => {
      const storedUser = localStorage.getItem('usuario');
      if (!storedUser) {
        resolve(null); // en lugar de reject
        return;
      }

      try {
        const user = JSON.parse(storedUser) as Usuario;
        resolve(user);
      } catch (error) {
        console.error('Error parseando los datos del usuario', error);
        resolve(null); // también aquí en lugar de reject
      }
    });
  }

  // Actualizar datos de usuario por email
  actualizarUsuario(email: string, usuario: any): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

    return this._http.put(`${this.apiUrl}/usuarios/${email}`, usuario, {
      headers: headers,
      observe: 'response'
    });
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
