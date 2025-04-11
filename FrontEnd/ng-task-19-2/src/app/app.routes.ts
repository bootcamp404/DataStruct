import { Routes } from '@angular/router';
import { MainviewComponent } from './mainview/mainview.component'; 
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
   {
    canActivateChild: [publicGuard()],
     path: 'auth',
     loadChildren: () => import('./auth/features/auth.routes')
   },
   {
      path: 'mainview',
      component: MainviewComponent,
      canActivate: [privateGuard()]
    }
];
