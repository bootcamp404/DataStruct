import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../mainview/footer/footer.component';
import { HeaderComponent } from '../mainview/header/header.component';
import { AnimatedBackgroundComponent } from '../shared/components/animated-background/animated-background.component';
import { firstValueFrom } from 'rxjs';

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
    { id: 1,  nombre: 'Administrador total' },
    { id: 2,  nombre: 'Administrador empleo y formación' },
    { id: 3,  nombre: 'Administrador promoción económica' },
    { id: 4,  nombre: 'Administrador económico-financiero' },
    { id: 5,  nombre: 'Administrador jurídico-administrativo' },
    { id: 6,  nombre: 'Administrador marketing y comunicación' },
    { id: 7,  nombre: 'Administrador recursos humanos' },
    { id: 8,  nombre: 'Administrador desarrollo local y estratégico' },
    { id: 9,  nombre: 'Empleado marketing y comunicación' },
    { id: 10, nombre: 'Empleado jurídico-administrativo' },
    { id: 11, nombre: 'Empleado empleo y formación' },
    { id: 12, nombre: 'Empleado económico-financiero' },
    { id: 13, nombre: 'Empleado promoción económica' },
    { id: 14, nombre: 'Empleado recursos humanos' },
    { id: 15, nombre: 'Empleado desarrollo local y estratégico' },
    { id: 16, nombre: 'Usuario' }
  ];

  usuariosOriginales: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.cargandoLista = true;
    this.errorAlCargar = false;

    try {
      const data = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/usuarios`));
      this.usuarios = data;
      this.usuariosOriginales = JSON.parse(JSON.stringify(data));
    } catch (err) {
      console.error('Error al cargar usuarios', err);
      this.errorAlCargar = true;
    } finally {
      this.cargandoLista = false;
    }
  }

  async actualizarRol(usuario: any) {
    this.actualizandoRolEmail = usuario.email;
    const headers = { 'Content-Type': 'application/json' };

    // Enviar el objeto completo del usuario con el rol actualizado
    const body = {
      ...usuario,
      rol: { id: usuario.rol.id }
    };

    try {
      await firstValueFrom(
        this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, body, { headers })
      );

      // Recargar la lista completa para asegurar sincronización
      await this.cargarUsuarios();

      alert('Rol actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      alert('Error al actualizar rol');
    } finally {
      this.actualizandoRolEmail = null;
    }
  }

  async guardarTodosLosCambios() {
    const cambios = this.usuarios.filter(usuario => {
      const original = this.usuariosOriginales.find(u => u.id === usuario.id);
      return original && usuario.rol?.id !== original.rol?.id;
    });

    if (cambios.length === 0) {
      alert('No hay cambios de roles para guardar.');
      return;
    }

    const headers = { 'Content-Type': 'application/json' };

    try {
      // Ejecutar todas las peticiones en paralelo con objetos completos
      await Promise.all(
        cambios.map(usuario =>
          firstValueFrom(
            this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, {
              ...usuario,
              rol: { id: usuario.rol.id }
            }, { headers })
          )
        )
      );

      // Refrescar datos tras guardar
      await this.cargarUsuarios();

      alert(`${cambios.length} roles actualizados correctamente.`);
    } catch (error) {
      console.error('Error al guardar roles:', error);
      alert('Ocurrió un error al guardar los cambios.');

      // En caso de error, recargar para mostrar el estado real
      await this.cargarUsuarios();
    }
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
