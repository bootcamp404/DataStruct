import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  searchTerm: string = '';
  isProfileMenuOpen = false;
  showLanguageDropdown = false;

  // Mapa de nombres legibles
  languageNames: { [key: string]: string } = {
    es: 'Castellano',
    va: 'Valencià',
    en: 'English'
  };

  // Idioma actual (en formato de código)
  currentLanguageCode: string = 'Español';

  user = {
    email: '' as string | null,
    displayName: '' as string | null,
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {}
async ngOnInit() {
    // Cargar idioma desde localStorage o usar 'es'
    const savedLang = localStorage.getItem('idioma') || 'es';
    this.currentLanguageCode = savedLang;
    this.translate.use(savedLang);

    // Cargar usuario actual
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      this.user.email = currentUser.email;
      const nombre = currentUser.nombre?.trim();
      const apellidos = currentUser.apellidos?.trim();
      if (nombre && apellidos) {
        this.user.displayName = `${nombre} ${apellidos}`;
      } else {
        this.user.displayName = null;
      }
    }
  }

  toggleLanguageDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.showLanguageDropdown = !this.showLanguageDropdown;
    if (this.showLanguageDropdown) {
      this.isProfileMenuOpen = false;
    }
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
    if (this.isProfileMenuOpen) {
      this.showLanguageDropdown = false;
    }
  }

  closeMenus(): void {
    this.isProfileMenuOpen = false;
  }
async onLogoutClick() {
    try {
      await this.authService.logout();
      this.router.navigate(['/auth/sign-in']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  search(event: Event): void {
    const input = event.target as HTMLInputElement;
  }

  toggleTheme(): void {
    console.log('Cambiando tema...');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-dropdown') && !target.closest('.profile-menu')) {
      this.closeAllDropdowns();
    }
  }

  closeAllDropdowns() {
    this.showLanguageDropdown = false;
    this.isProfileMenuOpen = false;
  }
}
