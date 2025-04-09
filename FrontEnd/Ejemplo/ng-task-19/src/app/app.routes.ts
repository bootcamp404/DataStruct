import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';
import { VerificacionComponent } from './auth/verificacion/verificacion.component';

export const routes: Routes = [
   {
    canActivateChild: [publicGuard()],
     path: 'auth',
     loadChildren: () => import('./auth/features/auth.routes')
   },
   {
    canActivateChild: [privateGuard()],
    path: 'tareas',
    loadComponent: () => import('./compartido/interfaz/layout.component'),
   },
   {
    path:'**',
    redirectTo: '/auth/sign-in'
   },
   {
      path: 'verificacion',
      component: VerificacionComponent
   }
];
