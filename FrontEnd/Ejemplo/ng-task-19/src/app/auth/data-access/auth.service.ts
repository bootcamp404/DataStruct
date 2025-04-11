import { inject, Injectable } from '@angular/core';
<<<<<<< HEAD
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from '@angular/fire/auth';
=======
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from '@angular/fire/auth';
import { sendSignInLinkToEmail } from '@angular/fire/auth';
>>>>>>> 5c7ba17cdefaba8b9b43a91b2a9d2fcda68ea2be


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

<<<<<<< HEAD
  return signInWithPopup(this._auth, facebook)
}

logout() {
  return signOut(this._auth)
}

getCurrentUser() {
  return this._auth.currentUser;
}
=======
return signInWithPopup(this._auth, facebook)
  }
>>>>>>> 5c7ba17cdefaba8b9b43a91b2a9d2fcda68ea2be
}
