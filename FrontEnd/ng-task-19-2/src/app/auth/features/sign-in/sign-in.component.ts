import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { errorMail, seRequiere } from '../../validadores/validadores';
import { GoogleComponent } from '../../ui/google/google.component';
import { FacebookComponent } from '../../ui/facebook/facebook.component';
import { Usuario } from '../../../modelos/usuario';

export interface FormSignIn {
  email: FormControl<string | null>;
  contrasenya: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleComponent, FacebookComponent],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    contrasenya: this._formBuilder.control('', Validators.required),
  });

  // Validación para campo requerido
  esRequerido(campo: keyof FormSignIn) {
    return seRequiere(campo, this.form);
  }

  // Validación para formato de email
  emailRequerido() {
    return errorMail(this.form);
  }

  async submit() {
    try {
      if (this.form.invalid) return;

      const { email, contrasenya } = this.form.value;

      if (!email || !contrasenya) return;

      // Crea objeto Usuario parcial para login
      const usuario: Pick<Usuario, 'email' | 'contrasenya'> = {
        email,
        contrasenya
      };

      await this._authService.iniciarSesión(usuario);

      toast.success('Bienvenido');
      this._router.navigateByUrl('/inicio');
    } catch (error) {
      toast.error('Nombre o contraseña incorrecto');
    }
  }

  async iniciarSesionConGoogle() {
    try {
      await this._authService.iniciarSesionGoogle();
      toast.success('Bienvenido');
      this._router.navigateByUrl('/inicio');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }

  async iniciarSesionConFacebook() {
    try {
      await this._authService.iniciarSesionFacebook();
      toast.success('Bienvenido');
      this._router.navigateByUrl('/inicio');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }
}
