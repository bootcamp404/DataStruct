import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  constructor(private router:Router) {}
  irFormularios(){
  this.router.navigate(['/formularios'])
}
}
