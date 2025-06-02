import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { privateGuard, publicGuard } from './core/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { FormulariosComponent } from './componentes/formularios/formularios.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { PlantillasComponent } from './componentes/plantillas/plantillas.component';
import { AdminPanelComponent } from './panel-admin/panel-admin.component';
import { InicioComponent } from './mainview/inicio/inicio.component';
import { ProyectoComponent } from './componentes/formularios/proyecto/proyecto.component';
import { ActividadComponent } from './componentes/formularios/actividad/actividad.component';


export const routes: Routes = [
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes')
  },
  {
    path: 'inicio',
    component: InicioComponent

  },
  {
    path: 'test',
    component: ActividadComponent
  },
  {
    path: 'plantillas',
    component: PlantillasComponent,
    canActivate: [privateGuard()]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [privateGuard()]
  },
  {
    path: 'formularios',
    component: FormulariosComponent,
    canActivate: [privateGuard()]
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
    component: DashboardComponent,
    canActivate: [privateGuard()]
  },
  {
    path: 'panel-admin',
    component: AdminPanelComponent,
    canActivate: [privateGuard()]
  },
  {
    path: '**',
    redirectTo: '/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
