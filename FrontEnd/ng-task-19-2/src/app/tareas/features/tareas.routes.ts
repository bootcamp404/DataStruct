import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./lista-tareas/lista-tareas.component')
    },
    {
        path:'nuevo',
        loadComponent: () =>import('./tareas-form/tareas-form.component')
    },
    {
        path:'editar/:idTarea',
        loadComponent: () =>import('./tareas-form/tareas-form.component')
    }

] as Routes
