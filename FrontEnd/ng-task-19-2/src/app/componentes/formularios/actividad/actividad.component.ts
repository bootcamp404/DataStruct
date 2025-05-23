// src/app/componentes/formularios/actividad/actividad.component.ts
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription, forkJoin } from 'rxjs';

import { ActividadService } from '../../../services/actividad.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { ProyectoService } from '../../../services/proyecto.service';

import { Actividad } from '../../../modelos/actividad';
import { Departamento } from '../../../modelos/departamento';
import { Proyecto } from '../../../modelos/proyecto';

import { HeaderComponent } from '../../../mainview/header/header.component';

@Component({
  selector: 'app-actividad-form',
  standalone: true,              // <--- Convertido a standalone
  imports: [
    CommonModule,                // *ngIf, *ngFor
    ReactiveFormsModule,         // [formGroup], formControlName
    FormsModule,                 // [(ngModel)] si lo necesitas
    HeaderComponent              // <app-header>
  ],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit, OnDestroy {
  @Input()  selectedActividad: Actividad | null = null;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  formActividad: FormGroup;
  departamentos: Departamento[] = [];
  proyectos:     Proyecto[]    = [];

  procesando = false;
  error      = false;
  mensajeError = '';
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private actividadSvc: ActividadService,
    private deptoSvc: DepartamentoService,
    private proyectoSvc: ProyectoService
  ) {
    // Definición del formulario
    this.formActividad = this.fb.group({
      nombre:             ['', Validators.required],
      descripcion:        [''],
      fecha_ini:          ['', Validators.required],
      fecha_fin:          ['', Validators.required],
      num_participantes:  [0,  [Validators.required, Validators.min(0)]],
      horas:              [0,  [Validators.required, Validators.min(0)]],
      id_departamento:    ['', Validators.required],
      id_proyecto:         ['', Validators.required],
    });
  }

  ngOnInit() {
    // Cargo departamentos y proyectos para los <select>
    const load$ = forkJoin({
      departamentos: this.deptoSvc.obtenerDepartamentos(),
      proyectos:     this.proyectoSvc.obtenerProyectos()
    }).subscribe({
      next: ({ departamentos, proyectos }) => {
        this.departamentos = departamentos;
        this.proyectos     = proyectos;
      },
      error: err => console.error('Error al cargar listas:', err)
    });
    this.subs.add(load$);

    // Si viene una actividad para editar, parcheo sus valores
    if (this.selectedActividad) {
      this.formActividad.patchValue({
        nombre:             this.selectedActividad.nombre,
        descripcion:        this.selectedActividad.descripcion,
        fecha_ini:          this.selectedActividad.fecha_ini,
        fecha_fin:          this.selectedActividad.fecha_fin,
        num_participantes:  this.selectedActividad.num_participantes,
        horas:              this.selectedActividad.horas,
        id_departamento:    this.selectedActividad.id_departamento,
        id_proyecto:         this.selectedActividad.id_proyecto
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  cerrarModal() {
    this.onClose.emit(false);
  }

  guardar() {
    if (this.formActividad.invalid) return;
    this.procesando = true;
    this.error      = false;

    const data = this.formActividad.value as Actividad;
    const peticion$ = this.selectedActividad
      ? this.actividadSvc.actualizarActividad(this.selectedActividad.id_actividad!, data)
      : this.actividadSvc.crearActividad(data);

    this.subs.add(
      peticion$.subscribe({
        next: () => {
          this.procesando = false;
          this.onClose.emit(true);
        },
        error: err => {
          this.procesando   = false;
          this.error        = true;
          this.mensajeError = err.message || 'Error al guardar actividad';
        }
      })
    );
  }
}
