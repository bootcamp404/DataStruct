import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class FooterComponent {

  companyName: string = 'ImpulsAlicante';
  currentYear: number = new Date().getFullYear();
}
