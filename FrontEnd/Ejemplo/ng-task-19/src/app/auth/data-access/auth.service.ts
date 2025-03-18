import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';


export interface Usuario{
  email: string;
  contrasenia: string;
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
}
