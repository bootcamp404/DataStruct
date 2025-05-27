import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../auth/data-access/auth.service';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  ruta: string;
}

@Component({
  selector: 'app-inicio',
  imports: [TranslateModule, RouterModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  features: Feature[] = [
    {
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      titleKey: 'FEATURES.ITEMS.CUSTOM_FORMS.TITLE',
      descriptionKey: 'FEATURES.ITEMS.CUSTOM_FORMS.DESC',
      ruta: "/formularios"
    },
    {
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      titleKey: 'FEATURES.ITEMS.DEPARTMENT_ORGANIZATION.TITLE',
      descriptionKey: 'FEATURES.ITEMS.DEPARTMENT_ORGANIZATION.DESC',
      ruta: "/dashboard"
    },
    {
      icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
      titleKey: 'FEATURES.ITEMS.EXPORT_PDF.TITLE',
      descriptionKey: 'FEATURES.ITEMS.EXPORT_PDF.DESC',
      ruta: "auth/sign-in"
    }
  ];
}
