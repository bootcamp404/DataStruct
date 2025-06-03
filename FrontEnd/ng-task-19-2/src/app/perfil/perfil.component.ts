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
    this.errorMsg = '';
        
    this.authService.getCurrentUser()
      .then(user => {
        if (user) {
          this.usuarioActual = user;
        } else {
          console.warn('PerfilComponent: No user found');
          this.errorMsg = 'No se encontró información del usuario';
        }
        this.cargando = false;
      })
      .catch(error => {
        this.errorMsg = 'Error al cargar los datos del usuario';
        this.cargando = false;
        console.error('PerfilComponent: Error obteniendo usuario actual:', error);
      });
  }

  volver(): void {
    this.router.navigate(['/ruta-anterior']);
  }

  mostrarEditarPerfil() {
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
    const usuarioParaEnviar: Partial<Usuario> = {
      nombre: this.usuario.nombre,
      apellidos: this.usuario.apellidos,
      email: this.usuario.email,
      telefono: this.usuario.telefono,
      contrasenya: this.usuario.contrasenya,
      rol: this.usuario.rol
    };
  
    // Usar updateUserProfile (Promise) en lugar de actualizarUsuario (Observable)
    this.authService.updateUserProfile(this.usuario.id, usuarioParaEnviar)
      .then((usuarioActualizado) => {
        this.usuarioActual = usuarioActualizado;
        this.mostrarFormularioEdicion = false;
        this.errorMsg = '';
      })
      .catch((error) => {
        this.errorMsg = 'Error al guardar los cambios';
        console.error('Error al guardar datos:', error);
      });
  }

}
