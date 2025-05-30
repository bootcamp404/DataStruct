import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { errorMail, seRequiere } from '../../validadores/validadores';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleComponent } from '../../ui/google/google.component';
import { FacebookComponent } from '../../ui/facebook/facebook.component';
import { CommonModule } from '@angular/common'; 

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('contrasenya');
  const confirmPassword = control.get('confirmarContrasenya');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  
  return null;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleComponent, FacebookComponent, CommonModule],
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent {

  // Actualizar el método para incluir confirmarContrasenya
  esRequerido(campo: 'email' | 'contrasenya' | 'confirmarContrasenya') {
    return seRequiere(campo, this.form);
  }
  
  emailRequerido() {
    return errorMail(this.form);
  }
  
  passwordNoCoincide() {
    const confirmPassword = this.form.get('confirmarContrasenya');
    return confirmPassword?.errors?.['passwordMismatch'] && confirmPassword?.touched;
  }
  
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    contrasenya: this._formBuilder.control('', Validators.required),
    confirmarContrasenya: this._formBuilder.control('', Validators.required)
  }, { validators: passwordMatchValidator });

  async submit() {
    try {
      if (this.form.invalid) return;
      const { email, contrasenya } = this.form.value;
      if (!email || !contrasenya) return;

      // Registrar usuario con rol: { id: 9 }
      await this._authService.registrarse({ email, contrasenya });

      // Login automático
      await this._authService.iniciarSesion({ email, contrasenya });

      toast.success('Usuario creado correctamente');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }
  
  async iniciarSesionConGoogle() {
    try {
      await this._authService.iniciarSesionGoogle();
      toast.success('Bienvenido.');
      this._router.navigateByUrl('/inicio');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }
  
  async iniciarSesionConFacebook() {
    try {
      await this._authService.iniciarSesionFacebook();
      toast.success('Bienvenido.');
      this._router.navigateByUrl('/inicio');
    } catch (error) {
      toast.error('Ha ocurrido un error.');
    }
  }
}