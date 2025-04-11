import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../compartido/data-access/auth-state.service";
import { authState } from "@angular/fire/auth";
import { map } from 'rxjs';


export const privateGuard = (): CanActivateFn => {
    return () => {
        const router =  inject(Router);
        const authEstados = inject(AuthStateService);

        return authEstados.authEstado.pipe(
            map(estado => {
                if (!estado) {
                    router.navigateByUrl('/verificacion');
                    return false;
                }
                 authEstados.refrescarUsuario();

        if (!authEstados.usuarioActual?.emailVerified) {
          router.navigateByUrl('/verifica-tu-correo');
          return false;
        }
                return true;
            })
        );
    };
};

export const publicGuard = (): CanActivateFn => {
    return () => {
        const router = inject(Router);
        const authEstado = inject(AuthStateService);

        return authEstado.authEstado.pipe(
            map((estado) => {
                if(estado){
<<<<<<< HEAD
                    router.navigateByUrl('/mainview');
=======
                    router.navigateByUrl('/auth/sign-in');
>>>>>>> 5c7ba17cdefaba8b9b43a91b2a9d2fcda68ea2be
                    return false;
                }
                return true;
            })
        )
    };
};