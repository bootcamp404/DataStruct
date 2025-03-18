import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner'
import { AuthStateService } from './compartido/data-access/auth-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private _authState = inject(AuthStateService)
  private _router = inject(Router)
  
  async cerrarSesion(){
    await this._authState.cerrarSesion();
    this._router.navigateByUrl("./auth/sign-in")
  }
}
