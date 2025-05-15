import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../compartido/data-access/auth-state.service";
import { map, take } from 'rxjs';


export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authEstados = inject(AuthStateService);

    return authEstados.authEstado.pipe(
      take(1),
      map(estado => {
        if (!estado) {
          router.navigateByUrl('/auth/sign-in');
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
      take(1), // Muy importante
      map((estado) => {
        if (estado) {
          router.navigateByUrl('/mainview');
          return false;
        }
        return true;
      })
    );
  };
};