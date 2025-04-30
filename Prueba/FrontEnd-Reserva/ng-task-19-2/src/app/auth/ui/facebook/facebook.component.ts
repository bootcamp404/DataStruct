import { Component, output } from '@angular/core';

@Component({
  selector: 'app-facebook',
  imports: [],
  templateUrl: './facebook.component.html'
})
export class FacebookComponent {
  onClick = output<void>();
}
