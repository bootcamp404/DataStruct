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

  constructor(private http: HttpClient) {}

  usuariosOriginales: any[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.cargandoLista = true;
    this.errorAlCargar = false;

    try {
      const data = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/usuarios`));
      this.usuarios = data;
      this.usuariosOriginales = JSON.parse(JSON.stringify(data)); // Copia profunda
      console.log('Usuarios cargados:', this.usuarios); // Debug
    } catch (err) {
      console.error('Error al cargar usuarios', err);
      this.errorAlCargar = true;
    } finally {
      this.cargandoLista = false;
    }
  }

  // SOLUCIÓN 1: Método mejorado con recarga de datos
  async actualizarRol(usuario: any) {
    this.actualizandoRolEmail = usuario.email;
    const headers = { 'Content-Type': 'application/json' };
    const body = { rol: { id: usuario.rol.id } };

    try {
      // Usar async/await en lugar de subscribe para mejor manejo de errores
      await firstValueFrom(
        this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, body, { headers })
      );

      console.log('Rol actualizado exitosamente'); // Debug

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

  // SOLUCIÓN 2: Método alternativo con actualización local
  async actualizarRolLocal(usuario: any) {
    this.actualizandoRolEmail = usuario.email;
    const headers = { 'Content-Type': 'application/json' };
    const body = { rol: { id: usuario.rol.id } };

    try {
      const response = await firstValueFrom(
        this.http.put<any>(`${this.apiUrl}/usuarios/${usuario.id}`, body, { headers })
      );

      console.log('Respuesta del servidor:', response); // Debug

      // Actualizar el usuario localmente
      const index = this.usuarios.findIndex(u => u.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.usuarios[index], rol: usuario.rol };
        // Forzar actualización de la vista
        this.usuarios = [...this.usuarios];
      }

      // Actualizar también el array original
      const originalIndex = this.usuariosOriginales.findIndex(u => u.id === usuario.id);
      if (originalIndex !== -1) {
        this.usuariosOriginales[originalIndex] = { ...this.usuariosOriginales[originalIndex], rol: usuario.rol };
      }

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

    console.log('Cambios a guardar:', cambios); // Debug

    const headers = { 'Content-Type': 'application/json' };

    try {
      // Ejecutar todas las peticiones en paralelo
      const responses = await Promise.all(
        cambios.map(usuario =>
          firstValueFrom(
            this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, {
              rol: { id: usuario.rol.id } // Simplificado: solo enviar el rol
            }, { headers })
          )
        )
      );

      console.log('Todas las respuestas:', responses); // Debug

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

  // SOLUCIÓN 3: Método para forzar actualización de la vista
  forzarActualizacionVista() {
    // Esto fuerza a Angular a re-renderizar la lista
    this.usuarios = [...this.usuarios];
  }

  get usuariosFiltrados(): any[] {
    const texto = this.filtro.toLowerCase();
    return this.usuarios.filter(u =>
      u.email?.toLowerCase().includes(texto) ||
      u.nombre?.toLowerCase().includes(texto) ||
      u.apellidos?.toLowerCase().includes(texto)
    );
  }

  // MÉTODO ADICIONAL: Para debuggear el estado actual
  mostrarEstadoActual() {
    console.log('Estado actual de usuarios:', this.usuarios);
    console.log('Estado original de usuarios:', this.usuariosOriginales);
  }
}
