import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Proyecto } from '../../modelos/proyecto';
import { Subscription } from 'rxjs';
import { ProyectoService } from '../../services/proyecto.service';
import { ActualizarService } from '../../services/actualizar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  imports: [],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})
export class ProyectoComponent implements OnInit {
  formularioEdicion: FormGroup;
  proyectos: Proyecto[] = [];
  selectedDepartamento: Proyecto | null = null;
  cargando = false;
  cargandoLista = false;
  enviado = false;
  error = false;
  errorLista = false;
  mensajeError: string | null = null;
  eliminando = false;
  mostrarModalEdicion = false;
  editando = false;
  private refreshSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private actualizarPag: ActualizarService,
    private router: Router
  ) {
    // this.formularioProyecto = this.fb.group({
    //   id_proyecto: [''],
    //   nombre: [''],
    //   objetivo: [''],
    //   fecha_ini: new Date(),
    //   fecha_fin: [null],
    //   id_departamento: [''],
    // });

    this.formularioEdicion = this.fb.group({
      id_proyecto: [''],
      nombre: [''],
      objetivo: [''],
      fecha_ini: [],
      fecha_fin: [],
      id_departamento: [''],
    });
  }

  ngOnInit() {
    this.cargarProyectos();
    // Suscribirse al evento de actualización
    this.refreshSubscription = this.actualizarPag.actualizarPagina$.subscribe(() => {
      this.cargarProyectos();
    });
  }

  cargarProyectos() {
    this.cargandoLista = true;
    this.proyectoService.obtenerProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos = proyectos;
        this.cargandoLista = false;
        this.proyectoService.setProyectos(proyectos);
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
        this.errorLista = true;
        this.cargandoLista = false;
      }
    });
  }
}
