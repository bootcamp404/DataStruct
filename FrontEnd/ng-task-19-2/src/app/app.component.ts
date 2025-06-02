import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './theme.service';
import { AuthService } from './auth/data-access/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './componentes/chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,  // ¡importante para usar imports aquí!
  imports: [RouterOutlet, NgxSonnerToaster, CommonModule, HttpClientModule, ChatComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-task-19';
  chatAbierto = false;
  mostrarChat = true;
  isLoggedIn = false;
  role: number | null = null;

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService
  ) {
    // Configuración de idioma
    const savedLang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang('es');
    this.translate.use(savedLang);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navEndEvent = event as NavigationEnd;
        const url = navEndEvent.urlAfterRedirects;
        this.mostrarChat = !(
          url.includes('/auth/sign-in') ||
          url.includes('/auth/sign-up') // ← o cualquier otra ruta que quieras excluir
        );
      });
  }

  ngOnInit(): void {
    // Aplicar tema al iniciar
    this.themeService.initializeTheme();
  }
  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
}
}
