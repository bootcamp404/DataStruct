import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { errorMail, seRequiere } from '../../validadores/validadores';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleComponent } from '../../ui/google/google.component';

interface FormSignUp {
  email: FormControl<string | null>;
  contrasenia: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleComponent],
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent {

  esRequerido(campo: 'email' | 'contrasenia'){
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
  })

  async submit() {
    try {
    if(this.form.invalid) return;

    const { email, contrasenia} = this.form.value

    if (!email || !contrasenia) return;

    await this._authService.registrarse({email, contrasenia})

      toast.success('Usuario creado correctamente')
      this._router.navigateByUrl('tareas');
    } catch (error) {
      console.log(this.form.value.email)
      toast.error('Ha ocurrido un error.');
    }
  }
  async iniciarSesionConGoogle(){
    try {
      await this._authService.iniciarSesionGoogle()
      toast.success('Bienvenido.')
      this._router.navigateByUrl('tareas');
    } catch (error) {
      toast.error('Ha ocurrido un error.')
    }
  }
}
