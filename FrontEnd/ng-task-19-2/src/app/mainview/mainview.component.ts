import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/data-access/auth.service';
import { FeaturesComponent } from "./features/features.component";
import { HeaderComponent } from "./header/header.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FeaturesComponent, 
    FooterComponent, 
    ContentComponent,
    HeaderComponent, 
    TranslateModule
  ]
})
export class MainviewComponent implements OnInit, OnDestroy {
  currentLanguage = 'Castellano';
  searchControl = new FormControl('');
  showLanguageDropdown = false; // Nueva propiedad para controlar el dropdown

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
  const usuario = await this.authService.getCurrentUser();

  if (usuario) {
    this.authService['_authStateService'].setAuthEstado(true);
  } else {
    this.authService['_authStateService'].setAuthEstado(false);
  }

  document.addEventListener('click', this.closeDropdownOnClickOutside.bind(this));
}


  ngOnDestroy(): void {
    // Eliminar el evento cuando se destruye el componente
    document.removeEventListener('click', this.closeDropdownOnClickOutside.bind(this));
  }

  closeDropdownOnClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-dropdown')) {
      this.showLanguageDropdown = false;
    }
  }

  toggleLanguageDropdown(event?: Event): void {
    this.showLanguageDropdown = !this.showLanguageDropdown;
    // Detener la propagación para evitar que se active el manejador de documento
    event?.stopPropagation();
  }

  changeLanguage(language: string): void {
    this.currentLanguage = language;
    this.showLanguageDropdown = false; // Cerrar el dropdown después de seleccionar
    console.log(`Idioma cambiado a: ${language}`);
  }

  search(): void {
    const searchTerm = this.searchControl.value;
    if (searchTerm && searchTerm.trim()) {
      console.log(`Buscando: ${searchTerm}`);
      // Implementa tu lógica de búsqueda aquí
    }
  }

  async logOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}
