import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
   {
    canActivateChild: [publicGuard()],
     path: 'auth',
     loadChildren: () => import('./auth/features/auth.routes')
   },
   {
    canActivateChild: [privateGuard()],
    path: 'tareas',
    loadChildren: () => import('./tareas/features/tareas.routes')
   },
   {
    path:'**',
    redirectTo: '/tareas'
   }
];
