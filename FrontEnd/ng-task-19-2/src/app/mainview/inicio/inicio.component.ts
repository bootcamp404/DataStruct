import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../auth/data-access/auth.service';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';
import { AnimatedBackgroundComponent } from '../../shared/components/animated-background/animated-background.component';

@Component({
  selector: 'app-inicio',
  imports: [TranslateModule, RouterModule, HeaderComponent, FooterComponent, CommonModule, AnimatedBackgroundComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  standalone: true
})
export class InicioComponent {
}
