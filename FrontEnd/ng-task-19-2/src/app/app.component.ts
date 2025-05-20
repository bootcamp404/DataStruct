import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { TranslateService } from '@ngx-translate/core';  // importar

@Component({
  selector: 'app-root',
  standalone: true,  // ¡importante para usar imports aquí!
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-task-19';

  constructor(private translate: TranslateService) {
    // Lee el idioma guardado en localStorage, o usa 'es' (Castellano)
    const savedLang = localStorage.getItem('lang') || 'es';
    this.translate.use(savedLang);
  }
}
