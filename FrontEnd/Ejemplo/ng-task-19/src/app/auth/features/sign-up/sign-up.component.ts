import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { errorMail, seRequiere } from '../../validadores/validadores';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleComponent } from '../../ui/google/google.component';
import { FacebookComponent } from '../../ui/facebook/facebook.component';

interface FormSignUp {
  email: FormControl<string | null>;
  contrasenia: FormControl<string | null>;
  confirmarcontrasenia: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleComponent, FacebookComponent],
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent {

  esRequerido(campo: 'email' | 'contrasenia' | 'confirmarcontrasenia'){
    return seRequiere(campo, this.form)
  }
  emailRequerido(){
    return errorMail(this.form)
  }
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    contrasenia: this._formBuilder.control('', Validators.required),
    confirmarcontrasenia: this._formBuilder.control('', Validators.required)
  })

  async submit() {
    try {
    if(this.form.invalid){
      toast.error('Ha ocurrido un error.');
      return;
    };

    const { email, contrasenia} = this.form.value

    if (!email || !contrasenia) return;

    await this._authService.registrarse({email, contrasenia})

      toast.success('Usuario creado correctamente')
      //this._router.navigateByUrl('tareas');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }
  async iniciarSesionConGoogle(){
    try {
      await this._authService.iniciarSesionGoogle();
      toast.success('Bienvenido.');
      //this._router.navigateByUrl('tareas');
    } catch (error) {
      toast.error('Ha ocurrido un error.')
    }
  }
  async iniciarSesionConFacebook(){
    try {
      await this._authService.iniciarSesionFacebook();
      toast.success('Bienvenido.');
      //this._router.navigateByUrl('tareas');
    } catch (error) {
      toast.error('Ha ocurrido un error.')
    }
  }
}
