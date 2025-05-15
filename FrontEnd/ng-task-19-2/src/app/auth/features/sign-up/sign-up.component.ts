import { Component, inject } from '@angular/core';
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
  contrasenia: FormControl<string | null>;
  confirmarContrasenia: FormControl<string | null>;
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('contrasenia');
  const confirmPassword = control.get('confirmarContrasenia');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  
  return null;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleComponent, FacebookComponent, CommonModule], // Añadir CommonModule aquí
  templateUrl: './sign-up.component.html'
})
export default class SignUpComponent {

  // Actualizar el método para incluir confirmarContrasenia
  esRequerido(campo: 'email' | 'contrasenia' | 'confirmarContrasenia') {
    return seRequiere(campo, this.form);
  }
  
  emailRequerido() {
    return errorMail(this.form);
  }
  
  passwordNoCoincide() {
    const confirmPassword = this.form.get('confirmarContrasenia');
    return confirmPassword?.errors?.['passwordMismatch'] && confirmPassword?.touched;
  }
  
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    contrasenia: this._formBuilder.control('', Validators.required),
    confirmarContrasenia: this._formBuilder.control('', Validators.required)
  }, { validators: passwordMatchValidator });

  async submit() {
    try {
      if(this.form.invalid) return;

      const { email, contrasenia } = this.form.value;

      if (!email || !contrasenia) return;

      await this._authService.registrarse({email, contrasenia});

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