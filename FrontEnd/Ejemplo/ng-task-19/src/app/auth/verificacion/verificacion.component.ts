import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../compartido/data-access/auth-state.service';
@Component({
  selector: 'app-verificacion',
  imports: [RouterModule],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent {
  private _authEstado = inject(AuthStateService);
  private _router = inject(Router);
  async cerrarSesion() {
    await this._authEstado.cerrarSesion();
    this._router.navigateByUrl('/auth/sign-in');
  }
  mensaje: string = '';
  cargando: boolean = false;

  constructor(private authState: AuthStateService) {}

  reenviarCorreo() {
    this.cargando = true;
    this.mensaje = '';
    this.authState.enviarCorreoDeVerificacion()
      .then(() => {
        this.mensaje = '📩 Correo de verificación enviado. Revisa tu bandeja de entrada.';
      })
      .catch(() => {
        this.mensaje = '⚠️ Hubo un problema al enviar el correo. Intenta más tarde.';
      })
      .finally(() => {
        this.cargando = false;
      });
  }
}
