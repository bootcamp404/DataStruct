import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/data-access/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Usuario {
  nombre: string;
  apellidos: string;
  // dni: string;
  email: string;
  telefono: string;
//   departamento?: string;
//   cargo?: string;
 }

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
    // dni: '',
    email: '',
    telefono: '',
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
      nombre: this.usuarioActual?.nombre || '',
      apellidos: this.usuarioActual?.apellidos || '',
      email: this.usuarioActual?.email || '',
      telefono: this.usuarioActual?.telefono || ''
    };
  }

  cancelarEdicion() {
    this.mostrarFormularioEdicion = false;
  }

  guardarCambios() {
  // 'usuario' ya incluye el email (campo readonly)
  this.authService.actualizarUsuario(this.usuario.email, this.usuario)
    .then(updated => {
      this.mostrarFormularioEdicion = false;
      // Recargamos datos para reflejar cambios
      this.cargarDatosUsuario();
    })
    .catch(error => {
      this.errorMsg = 'Error al guardar los cambios';
      console.error('Error al guardar datos:', error);
    });
  }
}
