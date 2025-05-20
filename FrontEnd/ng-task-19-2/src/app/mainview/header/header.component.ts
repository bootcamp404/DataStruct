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
  currentLanguage: string = 'Castellano';
  showLanguageDropdown: boolean = false;

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
    // Cargar idioma desde localStorage o usar 'es' por defecto
    const savedLang = localStorage.getItem('idioma') || 'es';
    this.translate.use(savedLang);
    this.setCurrentLanguageLabel(savedLang);

    // Cargar usuario actual
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      this.user.email = currentUser.email;
      const nombre = currentUser.nombre?.trim();
      const apellidos = currentUser.apellidos?.trim();
      if (nombre && apellidos) {
        this.user.displayName = `${nombre} ${apellidos}`;
      } else {
        this.user.displayName = null; // Forzar el uso del email
      }
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeDropdownOnClickOutside.bind(this));
  }

  toggleLanguageDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.showLanguageDropdown = !this.showLanguageDropdown;
    if (this.showLanguageDropdown) {
      this.isProfileMenuOpen = false;
    }
  }

  closeDropdownOnClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showLanguageDropdown = false;
    }
  }

  changeLanguage(language: string): void {
    this.currentLanguage = language;
    this.showLanguageDropdown = false;

    const langMap = {
      Castellano: 'es',
      Valenciano: 'va',
      Inglés: 'en'
    };

    const langCode = langMap[language as keyof typeof langMap] || 'es';

    this.translate.use(langCode);
    localStorage.setItem('lang', langCode);
  }


  private setCurrentLanguageLabel(languageCode: string) {
    switch(languageCode) {
      case 'es':
        this.currentLanguage = 'Castellano';
        break;
      case 'va':
        this.currentLanguage = 'Valencià';
        break;
      case 'en':
        this.currentLanguage = 'English';
        break;
      default:
        this.currentLanguage = 'Castellano';
    }
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
    console.log(`Buscando: ${input.value}`);
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
