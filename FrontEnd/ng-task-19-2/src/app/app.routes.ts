import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { privateGuard, publicGuard } from './core/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { PlantillasComponent } from './componentes/plantillas/plantillas.component';
import { AdminPanelComponent } from './panel-admin/panel-admin.component';
import { InicioComponent } from './mainview/inicio/inicio.component';
import { ProyectoComponent } from './componentes/formularios/proyecto/proyecto.component';
import { PrevisualizacionComponent } from './componentes/previsualizacion/previsualizacion.component';

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
    path: "previsualizacion/:year",
    component: PrevisualizacionComponent,
  },
  {
    path: "previsualizacion",
    redirectTo: "/previsualizacion/2025",
    pathMatch: "full",
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
