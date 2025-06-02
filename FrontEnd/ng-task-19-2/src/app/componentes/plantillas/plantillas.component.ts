import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { DepartamentoService } from '../../services/departamento.service';
import { ActividadService } from '../../services/actividad.service';
import { SubvencionService } from '../../services/subvencion.service';
import { EstadoSubvencionService, EstadoSubvencion } from '../../services/estado-subvencion.service';
import { TranslateService } from '@ngx-translate/core';
import { Template } from '../../modelos/template';
import { Departamento } from '../../modelos/departamento';
import { Proyecto } from '../../modelos/proyecto';
import { Subvencion } from '../../modelos/subvencion';
import { HeaderComponent } from '../../mainview/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plantillas',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],   
  templateUrl: './plantillas.component.html',
  styleUrl:  './plantillas.component.css'
})
export class PlantillasComponent implements OnInit {

  /* ----------  PLANTILLAS  ---------- */
  templates: Template[] = [
    { id: 1, name: 'Crear Proyecto', description: 'Formulario para crear nuevos proyectos', category: 'Gestión', isActive: true },
    { id: 2, name: 'Crear Actividad', description: 'Formulario para crear nuevas actividades', category: 'Gestión', isActive: true },
    { id: 3, name: 'Crear Subvención', description: 'Formulario para crear nuevas subvenciones', category: 'Gestión', isActive: true }
  ];

  /* ----------  FILTRO / BUSCADOR  ---------- */
  searchTerm = '';
  selectedCategory = '';
  filteredTemplates: Template[] = this.templates;
  categories = [...new Set(this.templates.map(t => t.category))];

  /* ----------  MODAL CREACIÓN  ---------- */
  mostrarModalCreacion = false;
  templateSeleccionado: Template | null = null;
  departamentoSeleccionado: Departamento | null = null;

  /* ----------  FORMULARIO  ---------- */
  formularioProyecto: FormGroup;
  formularioActividad: FormGroup;
  formularioSubvencion: FormGroup;
  creando = false;
  error = false;
  mensajeError: string | null = null;

  /* ----------  DATOS AUXILIARES  ---------- */
  departamentos: Departamento[] = [];
  proyectos: Proyecto[] = [];
  subvenciones: Subvencion[] = [];
  estadosSubvencion: EstadoSubvencion[] = [];
  modalidades: string[] = ['A', 'B', 'C'];

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private departamentoService: DepartamentoService,
    private actividadService: ActividadService,
    private subvencionService: SubvencionService,
    private estadoSubvencionService: EstadoSubvencionService,
    private translate: TranslateService
  ) {
    // Formulario de Proyecto
    this.formularioProyecto = this.fb.group({
      id_proyecto: ['', Validators.required],
      nombre: ['', Validators.required],
      objetivo: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      departamento_id: ['', Validators.required],
    });

    // Formulario de Actividad
    this.formularioActividad = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      num_participantes: [0, [Validators.required, Validators.min(0)]],
      horas: [0, [Validators.required, Validators.min(0)]],
      id_departamento: ['', Validators.required],
      id_proyecto: ['', Validators.required],
    });

    // Formulario de Subvención
    this.formularioSubvencion = this.fb.group({
      entidad: ['', Validators.required],
      importe: [0, [Validators.required, Validators.min(0)]],
      id_estado_sub: ['', Validators.required],
      id_proyecto: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
      modalidad: ['', Validators.required],
    });
  }

  /* ----------  Life cycle  ---------- */
  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarProyectos();
    this.cargarEstadosSubvencion();
  }

  /* ----------  Departamentos (select)  ---------- */
  cargarDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe({
      next: data => this.departamentos = data,
      error: err => console.error('Error al cargar departamentos', err)
    });
  }

  /* ----------  Proyectos (select)  ---------- */
  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe({
      next: data => this.proyectos = data,
      error: err => console.error('Error al cargar proyectos', err)
    });
  }

  /* ----------  Estados de Subvención (select)  ---------- */
  cargarEstadosSubvencion(): void {
    this.estadoSubvencionService.obtenerEstados().subscribe({
      next: estados => this.estadosSubvencion = estados,
      error: err => console.error('Error al cargar estados de subvención', err)
    });
  }

  /* ----------  Abrir / cerrar modal  ---------- */
  abrirModalCreacion(template: Template): void {
    this.templateSeleccionado = template;
    this.mostrarModalCreacion = true;
    this.error = false;
    this.mensajeError = null;

    if (template.id === 1) {
      this.formularioProyecto.reset();
    } else if (template.id === 2) {
      this.formularioActividad.reset();
    } else if (template.id === 3) {
      this.formularioSubvencion.reset();
    }
  }

  cerrarModalCreacion(): void {
    this.mostrarModalCreacion = false;
    this.templateSeleccionado = null;
    this.formularioProyecto.reset();
    this.formularioActividad.reset();
    this.formularioSubvencion.reset();
  }

  /* ----------  Guardar formulario  ---------- */
  guardarFormulario(): void {
    if (!this.templateSeleccionado) return;

    this.creando = true;
    this.error = false;

    if (this.templateSeleccionado.id === 1) {
      this.guardarProyecto();
    } else if (this.templateSeleccionado.id === 2) {
      this.guardarActividad();
    } else if (this.templateSeleccionado.id === 3) {
      this.guardarSubvencion();
    }
  }

  guardarProyecto(): void {
    if (this.formularioProyecto.invalid) {
      this.error = true;
      this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
      this.creando = false;
      return;
    }

    const proyecto = this.formularioProyecto.value;
    proyecto.departamento = { id: proyecto.departamento_id };

    this.proyectoService.crearProyecto(proyecto).subscribe({
      next: () => {
        this.cerrarModalCreacion();
        this.creando = false;
      },
      error: err => {
        this.error = true;
        this.creando = false;
        this.mensajeError = err.error?.message || 'Ocurrió un error al crear el proyecto.';
      }
    });
  }

  guardarActividad(): void {
    if (this.formularioActividad.invalid) {
      this.error = true;
      this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
      this.creando = false;
      return;
    }

    // Generar un ID único usando timestamp y número aleatorio
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const id_actividad = `ACT-${timestamp}-${random}`;

    const actividad = {
      id_actividad,
      ...this.formularioActividad.value,
      num_participantes: Number(this.formularioActividad.value.num_participantes),
      horas: Number(this.formularioActividad.value.horas)
    };

    console.log('Enviando actividad:', actividad); // Para debug

    this.actividadService.crearActividad(actividad).subscribe({
      next: (response) => {
        if (response.status === 201 || response.status === 200) {
          console.log('Actividad creada:', response.body); // Para debug
          this.cerrarModalCreacion();
          this.creando = false;
        } else {
          this.error = true;
          this.creando = false;
          this.mensajeError = 'Error al crear la actividad. Por favor, intente nuevamente.';
        }
      },
      error: err => {
        this.error = true;
        this.creando = false;
        this.mensajeError = err.error?.message || 'Ocurrió un error al crear la actividad.';
        console.error('Error al crear actividad:', err);
      }
    });
  }

  guardarSubvencion(): void {
    if (this.formularioSubvencion.invalid) {
      this.error = true;
      this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
      this.creando = false;
      return;
    }

    const subvencion: Subvencion = {
      ...this.formularioSubvencion.value,
      importe: Number(this.formularioSubvencion.value.importe),
      fecha_creacion: new Date(this.formularioSubvencion.value.fecha_creacion).toISOString(),
    };

    this.subvencionService.crearSubvencion(subvencion).subscribe({
      next: (response) => {
        if (response.status === 201 || response.status === 200) {
          this.cerrarModalCreacion();
          this.creando = false;
        } else {
          this.error = true;
          this.creando = false;
          this.mensajeError = 'Error al crear la subvención. Por favor, intente nuevamente.';
        }
      },
      error: err => {
        this.error = true;
        this.creando = false;
        this.mensajeError = err.error?.message || 'Ocurrió un error al crear la subvención.';
        console.error('Error al crear subvención:', err);
      }
    });
  }

  /* ----------  Filtros de búsqueda / categoría  ---------- */
  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTemplates = this.templates.filter(t => {
      const matchesSearch =
        t.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.selectedCategory === '' || t.category === this.selectedCategory;

      return matchesSearch && matchesCategory && t.isActive;
    });
  }
}
