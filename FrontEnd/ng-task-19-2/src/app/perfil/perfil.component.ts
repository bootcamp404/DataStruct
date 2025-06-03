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
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    contrasenya: '',
    rol: {id: 0}
    // departamento: '',
    // cargo: ''
  };

  mostrarFormularioEdicion = false;
  usuarioActual: any;
  cargando = true;
  errorMsg = '';

  constructor(private router: Router, private authService: AuthService, private translate: TranslateService) { }

  ngOnInit() {
    const lang = localStorage.getItem('idioma') || 'es'; // ✅ Recuperar idioma guardado
    this.translate.use(lang);

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
      id: this.usuarioActual?.id || 0,
      nombre: this.usuarioActual?.nombre || '',
      apellidos: this.usuarioActual?.apellidos || '',
      email: this.usuarioActual?.email || '',
      telefono: this.usuarioActual?.telefono || '',
      contrasenya: this.usuarioActual?.contrasenya || '',
      rol: this.usuarioActual?.rol || { id: 16 } // Preservar el rol original o usar el rol por defecto
    };
  }

  cancelarEdicion() {
    this.mostrarFormularioEdicion = false;
  }

  guardarCambios() {
    // Enviar el objeto usuario completo con los campos editados
    const usuarioParaEnviar: Partial<Usuario> = {
        id: this.usuario.id,
        nombre: this.usuario.nombre,
        apellidos: this.usuario.apellidos,
        email: this.usuario.email,
        telefono: this.usuario.telefono,
        contrasenya: this.usuario.contrasenya,
        // Enviar el rol tal como está (debería tener al menos el ID)
        rol: this.usuario.rol
    };

    console.log('Usuario a enviar:', usuarioParaEnviar);
    this.authService.actualizarUsuario(this.usuario.id, usuarioParaEnviar)
      .subscribe({
        next: (response) => {
          console.log('Respuesta de actualización:', response);
          this.mostrarFormularioEdicion = false;
          this.cargarDatosUsuario(); // Recargar datos del usuario después de la actualización
        },
        error: (error) => {
          this.errorMsg = 'Error al guardar los cambios';
          console.error('Error al guardar datos:', error);
        }
      });
  }

}
