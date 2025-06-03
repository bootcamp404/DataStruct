import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
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
  private _isLoggedIn: boolean | null = null;
  private userRole: number | null = null;

  private apiUrl = 'http://localhost:8080/alicanteFutura/api/v1';

  constructor() {}

  // Registro usando TU API
  async registrarse(usuario: { email: string, contrasenya: string }): Promise<Usuario> {
    try {
      return await firstValueFrom(
        this._http.post<Usuario>(`${this.apiUrl}/usuarios`, {
          email: usuario.email,
          contrasenya: usuario.contrasenya,
          rol: { id: 16 },
          nombre: null,
          apellidos: null,
          telefono: null
        })
      );
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // Login usando TU API
  async iniciarSesion(usuario: Pick<Usuario, 'email' | 'contrasenya'>): Promise<Usuario> {
    const response = await firstValueFrom(
      this._http.post<Usuario>(`${this.apiUrl}/usuarios/login`, {
        email: usuario.email,
        contrasenya: usuario.contrasenya
      })
    );

    localStorage.setItem('usuario', JSON.stringify(response));
    this._authStateService.setAuthEstado(true);
    this.userRole = response.rol?.id || null;
    this._router.navigate(['/inicio']);

    return response;
  }

  // Inicio de sesión con Google (Firebase)
  async iniciarSesionGoogle(): Promise<Usuario | null> {
    const google = new GoogleAuthProvider();

    try {
      const credential = await signInWithPopup(this._auth, google);
      const user = credential.user;

      if (user && user.email) {
        const usuario: Usuario = {
          id: 0,
          nombre: user.displayName?.split(' ')[0] || '',
          apellidos: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          telefono: user.phoneNumber || '',
          contrasenya: '', // Firebase no proporciona contraseña para login social
          rol: { id: 9 }
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        this._authStateService.setAuthEstado(true);
        this._router.navigate(['/inicio']);

        return usuario;
      } else {
        console.error('No se obtuvo un email válido desde Google.');
        return null;
      }
    } catch (error) {
      console.error('Error en login con Google:', error);
      return null;
    }
  }

  // Inicio de sesión con Facebook (Firebase)
  async iniciarSesionFacebook(): Promise<Usuario | null> {
    const facebook = new FacebookAuthProvider();

    try {
      const credential = await signInWithPopup(this._auth, facebook);
      const user = credential.user;

      if (user && user.email) {
        const usuario: Usuario = {
          id: 0,
          nombre: user.displayName?.split(' ')[0] || '',
          apellidos: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          telefono: user.phoneNumber || '',
          contrasenya: '', // No viene en login social
          rol: { id: 9 }
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        this._authStateService.setAuthEstado(true);
        this._router.navigate(['/inicio']);

        return usuario;
      } else {
        console.error('No se obtuvo un email válido desde Facebook.');
        return null;
      }
    } catch (error) {
      console.error('Error en login con Facebook:', error);
      return null;
    }
  }

  // Logout general
  async logout() {
    await signOut(this._auth)
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

  // Actualizar datos de usuario por ID
  actualizarUsuario(id: number, usuario: Partial<Usuario>): Observable<void> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json'); // Keep Accept just in case

    // Use `put<void>` to indicate no response body is expected
    return this._http.put<void>(`${this.apiUrl}/usuarios/${id}`, usuario, { headers })
      .pipe(
        // No tap here to update localStorage directly, we'll refetch in the component
        // Removed previous tap logic as it's no longer suitable if no body is returned
      );
  }

  // Actualizar perfil en Firebase si está autenticado con Firebase
  async updateUser(usuario: Partial<Usuario>): Promise<void> {
    const user = this._auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    try {
      // Actualizar perfil en Firebase
      await updateProfile(user, {
        displayName: usuario.nombre || user.displayName || ''
      });

      // Actualizar el usuario en localStorage
      const currentUser = localStorage.getItem('usuario');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser) as Usuario;
        const mergedUser = { ...parsedUser, ...usuario };
        localStorage.setItem('usuario', JSON.stringify(mergedUser));
      }
    } catch (error) {
      console.error('Error actualizando perfil en Firebase:', error);
      throw error;
    }
  }

  // Método combinado para actualizar usuario tanto en API como en Firebase si es necesario
  async updateUserProfile(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    try {
      // Actualizar en la API
      // Await the void response from the updated actualizarUsuario
      await firstValueFrom(this.actualizarUsuario(id, usuario));

      // After successful API update, refetch the user to update local state
      const updatedUser = await this.getCurrentUser();

      // If the user is authenticated with Firebase, update also there
      const currentUser = this._auth.currentUser;
      // Only attempt Firebase update if we successfully got an updated user from API/localStorage
      if (currentUser && updatedUser) {
        await this.updateUser(usuario);
      }

      // Return the refetched user, which is now in localStorage
      if (!updatedUser) {
          throw new Error('Failed to refetch user after update');
      }
      return updatedUser;
    } catch (error) {
      console.error('Error actualizando perfil de usuario:', error);
      throw error;
    }
  }

  getRole(): number | null {
    if (this.userRole) return this.userRole;
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) return null;
    try {
      const usuario = JSON.parse(storedUser) as Usuario;
      this.userRole = usuario.rol?.id || null;
      return this.userRole;
    } catch {
      return null;
    }
  }
}
