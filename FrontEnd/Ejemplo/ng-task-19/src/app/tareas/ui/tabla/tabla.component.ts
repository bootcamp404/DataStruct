import { Component, effect, input } from '@angular/core';
import { Tareas } from '../../data-access/tareas.service';

@Component({
  selector: 'app-tabla',
  imports: [],
  templateUrl: './tabla.component.html',
  styles: ``
})
export class TablaComponent {
tareas = input.required<Tareas[]>();

constructor(){
  effect(() => {
    console.log(this.tareas())
  })
}
}
