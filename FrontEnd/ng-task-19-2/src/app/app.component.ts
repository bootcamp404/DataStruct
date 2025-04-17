import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner'
import { HeaderComponent } from "./mainview/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-task-19'; 
}
