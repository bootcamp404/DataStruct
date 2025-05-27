import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { TranslateService } from '@ngx-translate/core'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './componentes/chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,  // ¡importante para usar imports aquí!
  imports: [RouterOutlet, NgxSonnerToaster, CommonModule, HttpClientModule, ChatComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-task-19';

  // controla si el chat está visible
  chatAbierto = false;

  constructor(private translate: TranslateService) {
    // Lee el idioma guardado en localStorage, o usa 'es' (Castellano)
    const savedLang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang('es');
    this.translate.use(savedLang);
  }

    toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }
}
