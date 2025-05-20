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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get<any[]>(`/api/usuarios`).subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  actualizarRol(usuario: any) {
    this.http.put(`/api/usuarios/${usuario.email}/rol`, { rol: usuario.rol })
      .subscribe({
        next: () => alert('Rol actualizado'),
        error: () => alert('Error al actualizar rol')
      });
  }
}
