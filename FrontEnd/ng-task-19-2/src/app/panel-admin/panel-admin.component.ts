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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargandoLista = true;
    this.errorAlCargar = false;

    this.http.get<any[]>(`/api/usuarios`).subscribe({
      next: (data) => {
        // Filtra fuera al admin_jefe (por ejemplo, id 5 si existe)
        this.usuarios = data.filter(u => u.rol?.id !== 5);
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
    this.http.put(`/api/usuarios/${usuario.email}/rol`, { rol: { id: usuario.rol.id } })
      .subscribe({
        next: () => alert('Rol actualizado'),
        error: () => alert('Error al actualizar rol')
      });
  }
}
