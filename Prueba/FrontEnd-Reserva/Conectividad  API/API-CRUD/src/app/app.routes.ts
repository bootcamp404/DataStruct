import { Routes } from '@angular/router';
import { CrearParticipanteComponent } from './Pages/Participantes/crear-participante/crear-participante.component';
import { EditarParticipanteComponent } from './Pages/Participantes/editar-participante/editar-participante.component';
import { ListaParticipanteComponent } from './Pages/Participantes/listar-participantes/listar-participantes.component';
import { ListarDepartamentoComponent } from './Pages/Departamentos/listar-departamento/listar-departamentos.component';
import { CrearDepartamentoComponent } from './Pages/Departamentos/crear-departamento/crear-departamento.component';
import { EditarDepartamentoComponent } from './Pages/Departamentos/editar-departamento/editar-departamento.component';

export const routes: Routes = [
    { path: 'participantes', component: ListaParticipanteComponent },
    { path: 'participante/crear', component: CrearParticipanteComponent },
    { path: 'participante/editar/:id', component: EditarParticipanteComponent },
    { path: '', component: ListarDepartamentoComponent},
    { path: 'departamento/crear', component: CrearDepartamentoComponent},
    { path: 'departamento/editar/:id', component: EditarDepartamentoComponent},
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
];
