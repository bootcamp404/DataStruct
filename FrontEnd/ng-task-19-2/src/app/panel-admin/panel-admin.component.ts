import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class AdminPanelComponent implements OnInit {
  usuarios: any[] = [];
  cargandoLista: boolean = false;
  errorAlCargar: boolean = false;

  rolesDisponibles = [
    { id: 1, nombre: 'Administrador total' },
    { id: 2, nombre: 'Administrador empleo y formación' },
    { id: 3, nombre: 'Administrador promoción económica' },
    { id: 4, nombre: 'Administrador recursos humanos' },
    { id: 5, nombre: 'Administrador jurídico-administrativo' },
    { id: 6, nombre: 'Empleado empleo y formación' },
    { id: 7, nombre: 'Empleado promoción económica' },
    { id: 8, nombre: 'Empleado recursos humanos' },
    { id: 9, nombre: 'Empleado D4' },
    { id: 10, nombre: 'Administrador jurídico-administrativo (2)' },
    { id: 11, nombre: 'Administrador D2 (2)' },
    { id: 12, nombre: 'Administrador D1 (2)' },
    { id: 13, nombre: 'Administrador D3 (2)' },
    { id: 14, nombre: 'Empleado RRHH (2)' },
    { id: 15, nombre: 'Empleado D4 (2)' },
    { id: 16, nombre: 'Usuario (sin permisos)' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargandoLista = true;
    this.errorAlCargar = false;

    this.http.get<any[]>(`/api/usuarios`).subscribe({
      next: (data) => {
        this.usuarios = data.filter(u => u.rol?.id !== 5); // si quieres excluir uno en particular
        this.cargandoLista = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.errorAlCargar = true;
        this.cargandoLista = false;
      }
    });
  }

  filtro: string = '';
  actualizandoRolEmail: string | null = null;

  get usuariosFiltrados() {
    const filtroNormalizado = this.filtro.trim().toLowerCase();
    return this.usuarios.filter(usuario =>
      usuario.email.toLowerCase().includes(filtroNormalizado) ||
      (usuario.nombre && usuario.nombre.toLowerCase().includes(filtroNormalizado)) ||
      (usuario.apellidos && usuario.apellidos.toLowerCase().includes(filtroNormalizado))
    );
  }

  actualizarRol(usuario: any) {
    this.actualizandoRolEmail = usuario.email;

    this.http.put(`/api/usuarios/${usuario.email}/rol`, { rol: { id: usuario.rol.id } })
      .subscribe({
        next: () => {
          alert('Rol actualizado correctamente');
          this.actualizandoRolEmail = null;
        },
        error: () => {
          alert('Error al actualizar el rol');
          this.actualizandoRolEmail = null;
        }
      });
  }
}
