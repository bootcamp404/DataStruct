import { inject, Injectable } from "@angular/core";
import { Auth, authState, getAuth, signOut, sendEmailVerification, reload } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})

export class AuthStateService{
    private _auth = inject(Auth);

    get authEstado(): Observable<any>{
        return authState(this._auth)
    }
    get usuarioActual(){
      return getAuth().currentUser;
    }
    cerrarSesion(){
        return signOut(this._auth);
    }

    enviarCorreoDeVerificacion(): Promise<void> {
        const user = this.usuarioActual;
        if (user && !user.emailVerified) {
          return sendEmailVerification(user);
        }
        return Promise.resolve();
      }
      refrescarUsuario(): Promise<void> {
        const user = this.usuarioActual;
        if (user) {
          return reload(user);
        }
        return Promise.resolve();
      }
}
