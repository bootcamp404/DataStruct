import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { DepartamentoService } from '../../services/departamento.service';
import { TranslateService } from '@ngx-translate/core';
import { Template } from '../../modelos/template';          // ←  la nueva interfaz
import { Departamento } from '../../modelos/departamento';
import { HeaderComponent } from '../../mainview/header/header.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plantillas',
  standalone: true,
  imports: [HeaderComponent, TarjetaComponent, BuscadorComponent, ReactiveFormsModule, CommonModule],   
  templateUrl: './plantillas.component.html',
  styleUrl:  './plantillas.component.css'
})
export class PlantillasComponent implements OnInit {

  /* ----------  PLANTILLAS  ---------- */
  templates: Template[] = [
    { id: 1, name: 'Proyecto',              description: 'Plantilla para proyectos',         category: 'Proyecto', isActive: true },
    { id: 2, name: 'Formulario Contacto',   description: 'Recopila info de contacto',        category: 'Marketing', isActive: true },
    { id: 3, name: 'Inventario Productos',  description: 'Gestión de inventario',            category: 'Logística', isActive: true },
    { id: 4, name: 'Reporte de Gastos',     description: 'Gastos mensuales',                 category: 'Finanzas', isActive: true },
    { id: 5, name: 'Encuesta Satisfacción', description: 'Encuestas a clientes',             category: 'Marketing', isActive: true },
    { id: 6, name: 'Orden de Compra',       description: 'Plantilla para órdenes de compra', category: 'Compras', isActive: true },
  ];

  /* ----------  FILTRO / BUSCADOR  ---------- */
  searchTerm = '';
  selectedCategory = '';
  filteredTemplates: Template[] = this.templates;
  categories = [...new Set(this.templates.map(t => t.category))];

  /* ----------  MODAL CREACIÓN  ---------- */
  mostrarModalCreacionProyecto = false;
  proyectoAsociado: Template | null = null;

  /* ----------  FORMULARIO  ---------- */
  formularioProyecto: FormGroup;
  creando = false;
  error = false;
  mensajeError: string | null = null;

  /* ----------  LISTA DE PROYECTOS CREADOS (caché local)  ---------- */
  proyectosCreados: any[] = [];

  /* ----------  DATOS AUXILIARES  ---------- */
  departamentos: Departamento[] = [];

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private departamentoService: DepartamentoService,
    private translate: TranslateService
  ) {
    this.formularioProyecto = this.fb.group({
      id_proyecto: ['', Validators.required],
      nombre:      ['', Validators.required],
      objetivo:    ['', Validators.required],
      fecha_ini:   ['', Validators.required],
      fecha_fin:   ['', Validators.required],
      departamento_id: ['', Validators.required],

      /* Campos opcionales según la categoría -------------------- */
      cliente: [''],           // Finanzas → Factura
      proveedor: [''],         // Compras → Orden de compra
      correo: [''],            // Marketing → Formulario contacto
    });
  }

  /* ----------  Life cycle  ---------- */
  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  /* ----------  Departamentos (select)  ---------- */
  cargarDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe({
      next: data => this.departamentos = data,
      error: err => console.error('Error al cargar departamentos', err)
    });
  }

  /* ----------  Abrir / cerrar modal  ---------- */
  abrirModalCreacionProyecto(template: Template): void {
    this.proyectoAsociado = template;
    this.mostrarModalCreacionProyecto = true;

    this.error = false;
    this.mensajeError = null;

    /* Limpia campos opcionales */
    this.formularioProyecto.patchValue({ cliente: '', proveedor: '', correo: '' });
  }

  cerrarModalCreacionProyecto(): void {
    this.mostrarModalCreacionProyecto = false;
    this.proyectoAsociado = null;
    this.formularioProyecto.reset();
  }

  /* ----------  Guardar proyecto (POST API)  ---------- */
  guardarProyecto(): void {
    if (this.formularioProyecto.invalid || !this.proyectoAsociado) {
      this.error = true;
      this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    this.creando = true;
    this.error = false;

    const f   = this.formularioProyecto.value;
    const cat = this.proyectoAsociado.category;   // clave diferenciadora

    /* Construir payload genérico + campos extra por categoría ---------- */
    const proyecto: any = {
      id_proyecto: f.id_proyecto,
      nombre:      f.nombre,
      objetivo:    f.objetivo,
      fecha_ini:   f.fecha_ini,
      fecha_fin:   f.fecha_fin,
      categoria:   cat,
      departamento: { id: f.departamento_id }
    };

    /* Campos adicionales */
    if (cat === 'Finanzas')  proyecto.cliente   = f.cliente;    // Factura / Gastos
    if (cat === 'Compras')   proyecto.proveedor = f.proveedor;  // Orden de compra
    if (cat === 'Marketing') proyecto.correo    = f.correo;     // Formulario contacto / Encuesta

    /* POST al backend --------------------------------------------------- */
    this.proyectoService.crearProyecto(proyecto).subscribe({
      next: () => {
        /* Añadimos al array local solo para visualización inmediata -------- */
        this.proyectosCreados.push(proyecto);

        this.cerrarModalCreacionProyecto();
        this.creando = false;
      },
      error: err => {
        this.error = true;
        this.creando = false;
        this.mensajeError = err.error?.message || 'Ocurrió un error al crear el proyecto.';
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
