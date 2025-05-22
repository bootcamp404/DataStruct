import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/data-access/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Usuario } from '../modelos/usuario';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    contrasenya: '',
    // departamento: '',
    // cargo: ''
  };

  mostrarFormularioEdicion = false;
  usuarioActual: any;
  cargando = true;
  errorMsg = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    this.cargando = true;
    this.authService.getCurrentUser().then(user => {
      this.usuarioActual = user;
      this.cargando = false;
      console.log('Usuario recibido:', user);
    }).catch(error => {
      this.errorMsg = 'Error al cargar los datos del usuario';
      this.cargando = false;
      console.error('Error obteniendo usuario actual:', error);
    });
  }

  volver(): void {
    this.router.navigate(['/ruta-anterior']);
  }

  mostrarEditarPerfil() {
    console.log('Usuario actual:', this.usuarioActual); // Verifica propiedades
    this.mostrarFormularioEdicion = true;
    this.usuario = {
      nombre: this.usuarioActual?.nombre || '',
      apellidos: this.usuarioActual?.apellidos || '',
      email: this.usuarioActual?.email || '',
      telefono: this.usuarioActual?.telefono || '',
      contrasenya: this.usuarioActual?.constrasenya || ''
    };
  }

  cancelarEdicion() {
    this.mostrarFormularioEdicion = false;
  }

  guardarCambios() {

    console.log('Usuario a enviar:', this.usuario); // 👈
    this.authService.actualizarUsuario(this.usuario.email, this.usuario)
      .subscribe({
        next: (response) => {
          this.mostrarFormularioEdicion = false;
          this.cargarDatosUsuario();
        },
        error: (error) => {
          this.errorMsg = 'Error al guardar los cambios';
          console.error('Error al guardar datos:', error);
        }
      });
  }

}
