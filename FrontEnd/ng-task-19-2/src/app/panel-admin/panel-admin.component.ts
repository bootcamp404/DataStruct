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
  filtro: string = '';
  actualizandoRolEmail: string | null = null;
  private apiUrl = 'http://localhost:8080/alicanteFutura/api/v1';

  rolesDisponibles = [
    { id: 1, nombre: 'Administrador total' },
    { id: 2, nombre: 'Administrador empleo y formación' },
    { id: 3, nombre: 'Administrador promoción económica' },
    { id: 4, nombre: 'Administrador económico-financiero' },
    { id: 5, nombre: 'Administrador jurídico-administrativo' },
    { id: 6, nombre: 'Administrador marketing y comunicación' },
    { id: 7, nombre: 'Administrador recursos humanos' },
    { id: 8, nombre: 'Administrador desarrollo local y estratégico' },
    { id: 9, nombre: 'Empleado marketing y comunicación' },
    { id: 10, nombre: 'Empleado jurídico-administrativo' },
    { id: 11, nombre: 'Empleado empleo y formación' },
    { id: 12, nombre: 'Empleado económico-financiero' },
    { id: 13, nombre: 'Empleado promoción económica' },
    { id: 14, nombre: 'Empleado recursos humanos' },
    { id: 15, nombre: 'Empleado desarrollo local y estratégico' },
    { id: 16, nombre: 'Usuario' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargandoLista = true;
    this.errorAlCargar = false;

    this.http.get<any[]>(`${this.apiUrl}/usuarios`).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargandoLista = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.errorAlCargar = true;
        this.cargandoLista = false;
      }
    });
  }

  actualizarRol(usuario: any) {
    this.actualizandoRolEmail = usuario.email;

    this.http.put(`${this.apiUrl}/usuarios/${usuario.email}/rol`, { rol: { id: usuario.rol.id } }).subscribe({
      next: () => {
        this.actualizandoRolEmail = null;
      },
      error: () => {
        alert('Error al actualizar rol');
        this.actualizandoRolEmail = null;
      }
    });
  }

  get usuariosFiltrados(): any[] {
    const texto = this.filtro.toLowerCase();
    return this.usuarios.filter(u =>
      u.email?.toLowerCase().includes(texto) ||
      u.nombre?.toLowerCase().includes(texto) ||
      u.apellidos?.toLowerCase().includes(texto)
    );
  }
}
