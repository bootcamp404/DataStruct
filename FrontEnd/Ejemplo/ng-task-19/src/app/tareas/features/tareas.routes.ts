import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./lista-tareas/lista-tareas.component')
    },

] as Routes