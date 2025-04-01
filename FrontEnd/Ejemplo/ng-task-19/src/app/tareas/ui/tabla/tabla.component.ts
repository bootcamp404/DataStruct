import { Component, effect, input } from '@angular/core';
import { Tareas } from '../../data-access/tareas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla',
  imports: [RouterLink],
  templateUrl: './tabla.component.html',
  styles: ``
})
export class TablaComponent {
tareas = input.required<Tareas[]>();
}
