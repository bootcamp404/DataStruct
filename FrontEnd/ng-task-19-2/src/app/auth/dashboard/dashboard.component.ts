import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../mainview/header/header.component";
import { DepartamentsComponent } from '../../departaments/departaments.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [HeaderComponent, DepartamentsComponent],
})
export class DashboardComponent {
  showDropdown = false;

  departamentos = [
    { nombre: 'RRHH' },
    { nombre: 'Innovación' },
    // 🔄 puedes cargar dinámicamente desde API
  ];

  documentos = [
    {
      nombre: 'Plan de Empleo',
      descripcion: 'Documento de estrategia laboral',
      departamento: 'RRHH'
    },
    // Más documentos...
  ];

  constructor(private router: Router) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.showDropdown = false;
  }

  editDept(dept: any) {
    console.log('Editando departamento:', dept);
  }

  deleteDept(dept: any) {
    console.log('Eliminando departamento:', dept);
  }

  editDoc(doc: any) {
    console.log('Editando documento:', doc);
  }

  deleteDoc(doc: any) {
    console.log('Eliminando documento:', doc);
  }
}
