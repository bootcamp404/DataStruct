import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainviewComponent } from './mainview/mainview.component';
import { privateGuard, publicGuard } from './core/auth.guard';
import { PerfilComponent } from './perfil/perfil.component'; 
import { FormulariosComponent } from './formularios/formularios.component';
import { DepartamentsComponent } from './departaments/departaments.component';
import { InformesComponent } from './informes/informes.component';

export const routes: Routes = [
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes')
  },
  {
    path: 'mainview',
    component: MainviewComponent,
    canActivate: [privateGuard()],
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'formularios',
    component: FormulariosComponent
  },
  {
    path:'departaments',
    component: DepartamentsComponent
  },
  {
    path: 'informes',
    component: InformesComponent
  },
  {
    path: '**',
    redirectTo: '/auth/sign-in'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 