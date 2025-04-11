import { Routes } from '@angular/router';
import { MainviewComponent } from './mainview/mainview.component'; 
import { privateGuard, publicGuard } from './core/auth.guard';
import { VerificacionComponent } from './auth/verificacion/verificacion.component';

export const routes: Routes = [
   {
    canActivateChild: [publicGuard()],
     path: 'auth',
     loadChildren: () => import('./auth/features/auth.routes')
   },
   {
<<<<<<< HEAD
      path: 'mainview',
      component: MainviewComponent,
      canActivate: [privateGuard()]
    }
=======
    canActivateChild: [privateGuard()],
    path: 'tareas',
    loadComponent: () => import('./compartido/interfaz/layout.component'),
   },
   {
      path: 'verificacion',
      component: VerificacionComponent
   }
>>>>>>> 5c7ba17cdefaba8b9b43a91b2a9d2fcda68ea2be
];
