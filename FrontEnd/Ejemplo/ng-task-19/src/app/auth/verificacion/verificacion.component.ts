import { Component } from '@angular/core';
import { AuthStateService } from '../../compartido/data-access/auth-state.service';
@Component({
  selector: 'app-verificacion',
  imports: [],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent {
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
