import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaParticipanteComponent } from './Pages/Participantes/listaParticipante/listaParticipante.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaParticipanteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'API-CRUD';
}
