import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../mainview/footer/footer.component';
import { HeaderComponent } from '../mainview/header/header.component';
import { AnimatedBackgroundComponent } from '../shared/components/animated-background/animated-background.component';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/data-access/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, AnimatedBackgroundComponent, TranslateModule],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class AdminPanelComponent implements OnInit {
  usuarios: any[] = [];
  cargandoLista: boolean = false;
  errorAlCargar: boolean = false;
  filtro: string = '';
  actualizandoRolEmail: string | null = null;
  private apiUrl = 'https://datastruct.onrender.com/alicanteFutura/api/v1';

  rolesDisponibles = [
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
  authService: any;

  constructor(private http: HttpClient, authService: AuthService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.cargandoLista = true;
    this.errorAlCargar = false;

    try {
      const data = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/usuarios`));

      // Filtrar para excluir usuarios con rol.id === 1
      this.usuarios = data.filter(usuario => usuario.rol?.id !== 1);

      this.usuariosOriginales = JSON.parse(JSON.stringify(this.usuarios)); // Guarda copia de respaldo
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

    const body = {
      ...usuario,
      rol: { id: usuario.rol.id }
    };

    try {
      await firstValueFrom(
        this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, body, { headers })
      );

      // 🔄 Actualizar usuario en sesión si corresponde
      const usuarioActual = this.authService.getCurrentUserSync();
      if (usuarioActual && usuarioActual.id === usuario.id) {
        await this.authService.updateUserProfile(usuario.id, { rol: usuario.rol });
      }

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
    let exitosos = 0;
    let errores = 0;

    // Procesar cambios uno por uno para mejor control
    for (const usuario of cambios) {
      try {
        const response = await firstValueFrom(
          this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, {
            ...usuario,
            rol: { id: usuario.rol.id }
          }, {
            headers,
            observe: 'response' // Esto nos da acceso al status code
          })
        );

        // Si el status es 200, 201, 202, etc. (códigos de éxito)
        if (response.status >= 200 && response.status < 300) {
          exitosos++;

          const usuarioActual = this.authService.getCurrentUserSync?.();
          if (usuarioActual && usuarioActual.id === usuario.id) {
            await this.authService.updateUserProfile(usuario.id, { rol: usuario.rol });
          }

          console.log(`Usuario ${usuario.email} actualizado correctamente`);
        }

      } catch (error: any) {
        // Verificar si es realmente un error o solo una respuesta sin body
        if (error.status >= 200 && error.status < 300) {
          // No es realmente un error, el servidor respondió OK
          exitosos++;
          console.log(`Usuario ${usuario.email} actualizado (sin response body)`);
        } else {
          errores++;
          console.error(`Error al actualizar ${usuario.email}:`, error);
        }
      }
    }

    // Siempre recargar los datos para mostrar el estado actual
    await this.cargarUsuarios();

    // Mostrar resultado
    if (errores === 0) {
      alert(`${exitosos} roles actualizados correctamente.`);
    } else if (exitosos > 0) {
      alert(`${exitosos} roles actualizados correctamente. ${errores} con errores.`);
    } else {
      alert('No se pudieron actualizar los roles. Revisa la consola para más detalles.');
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
  async eliminarUsuario(usuario: any) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al usuario ${usuario.email}? Esta acción no se puede deshacer.`);

    if (!confirmacion) return;

    try {
      await firstValueFrom(
      this.http.delete(`${this.apiUrl}/usuarios/${usuario.id}`, { responseType: 'text' }));
      alert('Usuario eliminado correctamente');

      // Recarga la lista de usuarios actualizada
      await this.cargarUsuarios();

    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Hubo un error al eliminar el usuario');
    }
  }
  // Número de usuarios por página
pageSize: number = 10;

// Página actual
currentPage: number = 1;

// Devuelve el índice inicial mostrado
get indiceInicial(): number {
  return (this.currentPage - 1) * this.pageSize + 1;
}

// Devuelve el índice final mostrado (con tope)
get indiceFinal(): number {
  return Math.min(this.currentPage * this.pageSize, this.usuariosFiltrados.length);
}

// Devuelve los usuarios a mostrar en la página actual
get usuariosPaginados() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this.usuariosFiltrados.slice(start, end);
}

// Total de páginas
get totalPaginas() {
  return Math.ceil(this.usuariosFiltrados.length / this.pageSize);
}

async actualizarEmail(usuario: any) {
  if (!usuario.email || !usuario.email.includes('@')) {
    alert('Por favor, introduce un email válido.');
    return;
  }

  const headers = { 'Content-Type': 'application/json' };
  const body = {
    ...usuario,
    email: usuario.email,
    rol: { id: usuario.rol.id }
  };

  try {
    const response = await firstValueFrom(
      this.http.put(`${this.apiUrl}/usuarios/${usuario.id}`, body, {
        headers,
        observe: 'response' // Para poder leer el status
      })
    );

    // Si status 2xx
    if (response.status >= 200 && response.status < 300) {
      alert(`Email actualizado correctamente para ${usuario.email}`);
      usuario.editandoEmail = false;

      const usuarioActual = this.authService.getCurrentUserSync?.();
      if (usuarioActual && usuarioActual.id === usuario.id) {
        await this.authService.updateUserProfile(usuario.id, { email: usuario.email });
      }

      await this.cargarUsuarios();
    }
  } catch (error: any) {
    // Si el error tiene status 2xx, no es error real
    if (error.status >= 200 && error.status < 300) {
      alert(`Email actualizado correctamente para ${usuario.email} (sin respuesta body)`);
      usuario.editandoEmail = false;
      await this.cargarUsuarios();
    } else {
      console.error('Error al actualizar email:', error);
      alert('Error al actualizar email.');
    }
  }
}
}