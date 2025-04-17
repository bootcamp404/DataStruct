import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface Usuario{
  email: string;
  contrasenia: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
private _auth = inject(Auth)
constructor(private router: Router) { }



registrarse(usuario: Usuario){
  return createUserWithEmailAndPassword(this._auth, usuario.email, usuario.contrasenia)
}

iniciarSesión(usuario: Usuario){
  return signInWithEmailAndPassword(this._auth, usuario.email, usuario.contrasenia)
}
iniciarSesionGoogle(){
  const google = new GoogleAuthProvider

  return signInWithPopup(this._auth, google)
}
iniciarSesionFacebook(){
  const facebook = new FacebookAuthProvider

  return signInWithPopup(this._auth, facebook)
}

logout() {
  return signOut(this._auth)
}

getCurrentUser(): Promise<User| null> {
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
