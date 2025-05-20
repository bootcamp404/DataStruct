import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainviewComponent } from './mainview/mainview.component';
import { privateGuard, publicGuard } from './core/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { FormulariosComponent } from './componentes/formularios/formularios.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { PlantillasComponent } from './componentes/plantillas/plantillas.component';
import { AdminPanelComponent } from './panel-admin/panel-admin.component';
import { InicioComponent } from './mainview/inicio/inicio.component';


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
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'plantillas',
    component: PlantillasComponent,
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
    path: 'informes',
    loadComponent: () => import('./informes/informes.component').then(m => m.InformesComponent),
    canActivate: [privateGuard()]
  },
  {
    path: 'informes/resumen',
    loadComponent: () => import('./informes/resumen.component').then(m => m.ResumenComponent),
    canActivate: [privateGuard()]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'panel-admin',
    component: AdminPanelComponent
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
