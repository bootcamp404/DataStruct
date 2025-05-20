import { Component,  HostListener,  ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


export class SharedModule { }

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
    this.translate.use(language);
    // Aquí puedes emitir un evento o guardar la preferencia si hace falta
  }

  toggleProfileMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.showLanguageDropdown = false;
    }
  }

  // Método para cerrar cualquier menú cuando se hace clic fuera
  closeMenus(): void {
    this.isProfileMenuOpen = false;
  }


  // Lógica para manejar los botones
  onLanguageClick() {
    console.log('Cambiar idioma');
  }

  async onLogoutClick() {
    try {
      await this.authService.logout();
      this.router.navigate(['/auth/sign-in']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Método para manejar la búsqueda
  search(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(`Buscando: ${input.value}`);
    // Implementar lógica de búsqueda
  }

  // Método para cambiar tema (claro/oscuro)
  toggleTheme(): void {
    console.log('Cambiando tema...');
    // Implementar cambio de tema
  }

  // Cierra los menús al hacer click fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Si el click no fue en ningún elemento relacionado con los desplegables
    if (!target.closest('.language-dropdown') && !target.closest('.profile-menu')) {
      this.closeAllDropdowns();
    }
  }
  
  closeAllDropdowns() {
    this.showLanguageDropdown = false;
    this.isProfileMenuOpen = false;
  }
}
