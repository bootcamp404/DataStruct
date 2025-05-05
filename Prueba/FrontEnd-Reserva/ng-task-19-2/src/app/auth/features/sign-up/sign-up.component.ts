import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { errorMail, seRequiere } from '../../validadores/validadores';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleComponent } from '../../ui/google/google.component';
import { FacebookComponent } from '../../ui/facebook/facebook.component';
import { CommonModule } from '@angular/common';

interface FormSignUp {
  email: FormControl<string | null>;
  contrasenya: FormControl<string | null>;
  confirmarContrasenia: FormControl<string | null>;
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const contrasenya = control.get('contrasenia')?.value;
  const confirmPassword = control.get('confirmarContrasenia')?.value;

  return contrasenya && confirmPassword && contrasenya !== confirmPassword
    ? { passwordMismatch: true }
    : null;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleComponent, FacebookComponent, CommonModule],
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent implements OnInit{
  ngOnInit(): void {
    const token = this._authService.obtenerToken();
    if (token) {
      this._router.navigateByUrl('/mainview');
    }
  }

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    contrasenia: this._formBuilder.control('', Validators.required),
    confirmarContrasenia: this._formBuilder.control('', Validators.required)
  }, { validators: passwordMatchValidator });

  esRequerido(campo: 'email' | 'contrasenia' | 'confirmarContrasenia') {
    return seRequiere(campo, this.form);
  }

  emailRequerido() {
    return errorMail(this.form);
  }

  passwordNoCoincide() {
    return this.form.errors?.['passwordMismatch'] && this.form.get('confirmarContrasenia')?.touched;
  }

  async submit() {
    try {
      if (this.form.invalid) return;

      const { email, contrasenia } = this.form.value;
      if (!email || !contrasenia) return;

      const response = await this._authService.registrarse({ email, contrasenia });
      this._authService.guardarToken(response.token);

      toast.success('Usuario creado correctamente');
      this._router.navigateByUrl('/mainview');
    } catch (error) {
      console.log(this.form.value.email);
      toast.error('Ha ocurrido un error.');
    }
  }

  async iniciarSesionConGoogle() {
    try {
      await this._authService.iniciarSesionGoogle();
      toast.success('Bienvenido.');
      this._router.navigateByUrl('/mainview');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }

  async iniciarSesionConFacebook() {
    try {
      await this._authService.iniciarSesionFacebook();
      toast.success('Bienvenido.');
      this._router.navigateByUrl('/mainview');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }
}
