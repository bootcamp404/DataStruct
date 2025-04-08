import { Routes } from '@angular/router';
import { CrearParticipanteComponent } from './Pages/Participantes/crearParticipante/crearParticipante.component';
import { EditarParticipanteComponent } from './Pages/Participantes/editarParticipante/editarParticipante.component';
import { ListaParticipanteComponent } from './Pages/Participantes/listaParticipante/listaParticipante.component';

export const routes: Routes = [
    { path: '', component: ListaParticipanteComponent },
    { path: 'participante/crear', component: CrearParticipanteComponent },
    { path: 'participante/editar/:id', component: EditarParticipanteComponent },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
    // { path: '', component: },
];
