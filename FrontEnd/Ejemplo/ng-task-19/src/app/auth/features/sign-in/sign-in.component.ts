import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { errorMail, seRequiere } from '../../validadores/validadores';
import { GoogleComponent } from '../../ui/google/google.component';
import { FacebookComponent } from '../../ui/facebook/facebook.component';

export interface FormSignIn{
  email: FormControl<string | null>;
  contrasenia: FormControl<string | null>;
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

  esRequerido(campo: 'email' | 'contrasenia'){
      return seRequiere(campo, this.form)
    }
    emailRequerido(){
      return errorMail(this.form)
    }

  form = this._formBuilder.group<FormSignIn> ({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    contrasenia: this._formBuilder.control('', Validators.required),
  })

  async submit() {
    try {
    if(this.form.invalid) return;

    const { email, contrasenia} = this.form.value

    if (!email || !contrasenia) return;

    await this._authService.iniciarSesión({email, contrasenia})

      toast.success('Bienvenido')
      //this._router.navigateByUrl('tareas');
    } catch (error) {
      toast.error('Ha ocurrido un error');
    }
  }
  async iniciarSesionConGoogle(){
    try {
      await this._authService.iniciarSesionGoogle();
      toast.success('Bienvenido')
      //this._router.navigateByUrl('tareas');
    } catch (error) {
      toast.error('Ha ocurrido un error.')
    }
  }
  async iniciarSesionConFacebook(){
    try {
      await this._authService.iniciarSesionFacebook();
      toast.success('Bienvenido')
      //this._router.navigateByUrl('tareas')
    } catch (error) {
      toast.error('Ha ocurrido un error.')
    }
  }
}
