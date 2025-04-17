import { Component,  ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service'; 
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';


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

  user = {
    email: '' as string | null,
    displayName: '' as string | null,
  }
  

  

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  currentLanguage: string = 'Castellano';
showLanguageDropdown: boolean = false;



async ngOnInit() {
  const currentUser = await this.authService.getCurrentUser();
  if (currentUser) {
    this.user.email = currentUser.email;
    this.user.displayName = currentUser.displayName || '';
  }
}


ngOnDestroy(): void {
  document.removeEventListener('click', this.closeDropdownOnClickOutside.bind(this));
}

toggleLanguageDropdown(event: Event): void {
  this.showLanguageDropdown = !this.showLanguageDropdown;
  event.stopPropagation(); // evita que el listener global lo cierre de inmediato
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
  console.log(`Idioma cambiado a: ${language}`);
  // Aquí puedes emitir un evento o guardar la preferencia si hace falta
}


  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
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
      console.log('Sesión cerrada correctamente');
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

  
}