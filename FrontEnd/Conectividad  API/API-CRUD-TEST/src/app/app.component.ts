import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudentListComponent } from './Mycomp/student-list/student-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, StudentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
