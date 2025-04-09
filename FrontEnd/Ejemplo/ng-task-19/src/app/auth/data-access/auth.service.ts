import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from '@angular/fire/auth';
import {sendEmailVerification} from '@angular/fire/auth';

export interface Usuario{
  email: string;
  contrasenia: string;
}
export interface UsuarioRegistro{
  email: string;
  contrasenia: string;
  confirmarcontrasenia: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _auth = inject(Auth)

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
}
