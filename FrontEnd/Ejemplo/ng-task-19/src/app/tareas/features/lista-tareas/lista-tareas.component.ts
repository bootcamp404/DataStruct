import { Component } from '@angular/core';
import { TablaComponent } from '../../ui/tabla/tabla.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-tareas',
  imports: [TablaComponent, RouterLink],
  templateUrl: './lista-tareas.component.html',
  styles: ``
})
export default class ListaTareasComponent {

}
