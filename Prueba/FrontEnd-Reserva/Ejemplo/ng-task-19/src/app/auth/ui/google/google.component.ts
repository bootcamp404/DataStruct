import { Component, output } from '@angular/core';

@Component({
  selector: 'app-google',
  imports: [],
  templateUrl: './google.component.html'
})
export class GoogleComponent {
onClick = output<void>();
}
