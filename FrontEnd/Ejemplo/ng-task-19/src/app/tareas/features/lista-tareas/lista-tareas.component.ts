import { Component, inject } from '@angular/core';
import { TablaComponent } from '../../ui/tabla/tabla.component';
import { RouterLink } from '@angular/router';
import { TareasService } from '../../data-access/tareas.service';

@Component({
  selector: 'app-lista-tareas',
  imports: [TablaComponent, RouterLink],
  templateUrl: './lista-tareas.component.html',
  styles: ``
})
export default class ListaTareasComponent {
  tareas = inject(TareasService).conseguirTarea;
}
