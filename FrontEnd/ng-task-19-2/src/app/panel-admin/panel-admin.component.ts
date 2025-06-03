import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../mainview/footer/footer.component';
import { HeaderComponent } from '../mainview/header/header.component';
import { AnimatedBackgroundComponent } from '../shared/components/animated-background/animated-background.component';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, AnimatedBackgroundComponent],
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

  usuariosOriginales: any[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargandoLista = true;
    this.errorAlCargar = false;

    this.http.get<any[]>(`${this.apiUrl}/usuarios`).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosOriginales = JSON.parse(JSON.stringify(data)); // Copia profunda
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
    const headers = { 'Content-Type': 'application/json' };
    const body = { rol: { id: usuario.rol.id } };

    this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, body, {headers}).subscribe({
      next: () => {
        this.actualizandoRolEmail = null;
        alert('Rol actualizado correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar rol', error);
        this.actualizandoRolEmail = null;
        alert('Error al actualizar rol');
      }
    });
  }

  guardarTodosLosCambios() {
    console.log("funciona")
    const cambios = this.usuarios.filter(usuario => {
      const original = this.usuariosOriginales.find(u => u.id === usuario.id);
      return original && usuario.rol?.id !== original.rol?.id;
    });

    if (cambios.length === 0) {
      alert('No hay cambios de roles para guardar.');
      return;
    }

    const peticiones = cambios.map(usuario =>
      this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, {
        rol: { id: usuario.rol.id }
      }).toPromise()
    );

    Promise.all(peticiones)
      .then(() => {
        alert('Roles actualizados correctamente.');
        this.usuariosOriginales = JSON.parse(JSON.stringify(this.usuarios)); // Actualizar copia
      })
      .catch((error) => {
        console.error('Error al guardar roles', error);
        alert('Ocurrió un error al guardar los cambios.');
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
