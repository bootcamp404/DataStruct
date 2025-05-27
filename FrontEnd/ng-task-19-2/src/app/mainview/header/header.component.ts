import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Usuario } from '../../modelos/usuario';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, TranslateModule]
})
export class HeaderComponent {
  searchTerm: string = '';
  isProfileMenuOpen = false;
  showLanguageDropdown = false;
  usuarioActual: Usuario | null = null;

  // Estado del tema
  isDark: boolean = false;

  // Idioma
  currentLanguageCode: string = 'es';
  languageNames: { [key: string]: string } = {
    es: 'Castellano',
    va: 'Valencià',
    en: 'English'
  };

  user = {
    email: null as string | null,
    displayName: null as string | null,
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private translate: TranslateService,
    private themeService: ThemeService
  ) {}

  async ngOnInit() {
    // Idioma
    const savedLang = localStorage.getItem('idioma') || 'es';
    this.currentLanguageCode = savedLang;
    this.translate.use(savedLang);

    // Tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDark = true;
    } else {
      document.documentElement.classList.remove('dark');
      this.isDark = false;
    }

    // Usuario
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      this.usuarioActual = currentUser; 
      this.user.email = currentUser.email;
      const nombre = currentUser.nombre?.trim();
      const apellidos = currentUser.apellidos?.trim();
      this.user.displayName = [nombre, apellidos].filter(Boolean).join(' ') || null;
    }
  }

  toggleLanguageDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.showLanguageDropdown = !this.showLanguageDropdown;
    if (this.showLanguageDropdown) this.isProfileMenuOpen = false;
  }

  changeLanguage(langCode: string): void {
    this.currentLanguageCode = langCode;
    this.translate.use(langCode);
    localStorage.setItem('idioma', langCode);
    this.showLanguageDropdown = false;
  }

  toggleProfileMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) this.showLanguageDropdown = false;
  }

  closeMenus(): void {
    this.isProfileMenuOpen = false;
    this.showLanguageDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-dropdown') && !target.closest('.profile-menu')) {
      this.closeMenus();
    }
  }

  async onLogoutClick() {
    try {
      await this.authService.logout();
      this.router.navigate(['/auth/sign-in']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDarkMode();
  }
}
