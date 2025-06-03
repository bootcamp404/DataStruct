import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, updateProfile } from '@angular/fire/auth';
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
          contrasenya: '',
          rol: { id: 16 }
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
          contrasenya: '',
          rol: { id: 16 }
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

  // Obtener usuario actual desde localStorage
  getCurrentUser(): Promise<Usuario | null> {
    return new Promise((resolve) => {
      const storedUser = localStorage.getItem('usuario');
      if (!storedUser) {
        console.log('AuthService: No user found in localStorage.');
        resolve(null);
        return;
      }

      try {
        const user = JSON.parse(storedUser) as Usuario;
        console.log('AuthService: User parsed from localStorage:', user);
        resolve(user);
      } catch (error) {
        console.error('AuthService: Error parseando los datos del usuario:', error);
        resolve(null);
      }
    });
  }

  // Actualizar datos de usuario por ID - CORREGIDO
  actualizarUsuario(id: number, usuario: Partial<Usuario>): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this._http.put(`${this.apiUrl}/usuarios/${id}`, usuario, { 
      headers,
      responseType: 'text' // Esto resuelve el problema de parsing
    });
  }

  // Método principal para actualizar perfil - SIMPLIFICADO Y CORREGIDO
  async updateUserProfile(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    try {
      console.log('AuthService: Iniciando actualización de usuario:', { id, usuario });
      
      // Actualizar en la API
      const response = await firstValueFrom(this.actualizarUsuario(id, usuario));
      console.log('AuthService: Usuario actualizado en API correctamente:', response);

      // Obtener usuario actual del localStorage
      const currentUserData = localStorage.getItem('usuario');
      if (!currentUserData) {
        throw new Error('No se encontró usuario en localStorage');
      }

      const currentUser = JSON.parse(currentUserData) as Usuario;
      
      // Merge de los datos actualizados
      const updatedUser = { ...currentUser };
      
      // Solo actualizar campos que tienen valor
      Object.keys(usuario).forEach(key => {
        const value = usuario[key as keyof Usuario];
        if (value !== undefined && value !== null) {
          (updatedUser as any)[key] = value;
        }
      });
      
      // Actualizar localStorage
      localStorage.setItem('usuario', JSON.stringify(updatedUser));
      
      // Actualizar role en memoria si se modificó
      if (usuario.rol?.id) {
        this.userRole = usuario.rol.id;
      }

      // Si está autenticado con Firebase, actualizar también ahí
      const firebaseUser = this._auth.currentUser;
      if (firebaseUser) {
        await this.updateUser(usuario);
      }

      return updatedUser;

    } catch (error) {
      console.error('Error actualizando perfil de usuario:', error);
      throw error;
    }
  }

  // Actualizar perfil en Firebase si está autenticado con Firebase
  private async updateUser(usuario: Partial<Usuario>): Promise<void> {
    const user = this._auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    try {
      await updateProfile(user, {
        displayName: usuario.nombre || user.displayName || ''
      });

      console.log('AuthService: Perfil actualizado en Firebase');
    } catch (error) {
      console.error('Error actualizando perfil en Firebase:', error);
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