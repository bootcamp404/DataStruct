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
  confirmarContrasenya: FormControl<string | null>;
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('contrasenya')?.value;
  const confirmPassword = control.get('confirmarContrasenya')?.value;

  return password && confirmPassword && password !== confirmPassword
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
    contrasenya: this._formBuilder.control('', Validators.required),
    confirmarContrasenya: this._formBuilder.control('', Validators.required)
  }, { validators: passwordMatchValidator });

  esRequerido(campo: 'email' | 'contrasenya' | 'confirmarContrasenya') {
    return seRequiere(campo, this.form);
  }

  emailRequerido() {
    return errorMail(this.form);
  }

  passwordNoCoincide() {
    return this.form.errors?.['passwordMismatch'] && this.form.get('confirmarContrasenya')?.touched;
  }

  async submit() {
    try {
      if (this.form.invalid) return;

      const { email, contrasenya } = this.form.value;
      if (!email || !contrasenya) return;

      const response = await this._authService.registrarse({ email, contrasenya });
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
