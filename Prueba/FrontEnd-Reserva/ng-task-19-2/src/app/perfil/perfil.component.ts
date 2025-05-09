import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/data-access/auth.service';

interface Usuario {
  nombre: string;
  apellidos: string;
  dni: string;
  email: string;
  telefono: string;
  departamento?: string;
  cargo?: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    apellidos: '',
    dni: '',
    email: '',
    telefono: '',
    departamento: '',
    cargo: ''
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
      this.usuario = { // Aquí asignas los datos a la propiedad 'usuario'
        nombre: user.nombre,
        apellidos: user.apellidos,
        dni: user.dni,
        email: user.email,
        telefono: user.telefono,
        departamento: user.departamento,
        cargo: user.cargo
      };
      this.cargando = false;
    }).catch(error => {
      this.errorMsg = 'Error al cargar los datos del usuario';
      this.cargando = false;
      console.error('Error obteniendo usuario actual:', error);
    });
  }

  mostrarEditarPerfil() {
    this.mostrarFormularioEdicion = true;
    this.usuario = {
      nombre: this.usuarioActual?.displayName || '',
      apellidos: this.usuarioActual?.apellidos || '',
      dni: this.usuarioActual?.dni || '',
      email: this.usuarioActual?.email || '',
      telefono: this.usuarioActual?.telefono || '',
      departamento: this.usuarioActual?.departamento || '',
      cargo: this.usuarioActual?.cargo || ''
    };
  }

  cancelarEdicion() {
    this.mostrarFormularioEdicion = false;
  }

  gguardarCambios() {
    this.authService.updateUser(this.usuario)
      .then(() => {
        this.mostrarFormularioEdicion = false;
        this.cargarDatosUsuario(); // Recarga los datos actualizados
      })
      .catch(error => {
        this.errorMsg = 'Error al guardar los cambios';
        console.error('Error al guardar datos:', error);
      });
  }
}
