import { Component } from '@angular/core';
import { BuscadorComponent } from './buscador/buscador.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { HeaderComponent } from "../../mainview/header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../modelos/departamento';
import { DepartamentoService } from '../../services/departamento.service';


interface Template {
  id: number
  name: string
  description: string
  category: string
  fields: number
  createdAt: Date
  isActive: boolean
}

@Component({
  selector: 'app-plantillas',
  imports: [BuscadorComponent, TarjetaComponent, HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './plantillas.component.html',
  styleUrl: './plantillas.component.css'
})
export class PlantillasComponent {
  templates: Template[] = [
    {
      id: 1,
      name: "Factura Estándar",
      description: "Plantilla para facturas con campos básicos",
      category: "Finanzas",
      fields: 12,
      createdAt: new Date("2023-12-10"),
      isActive: true,
    },
    {
      id: 2,
      name: "Formulario de Contacto",
      description: "Plantilla para recopilar información de contacto",
      category: "Marketing",
      fields: 8,
      createdAt: new Date("2024-01-15"),
      isActive: true,
    },
    {
      id: 3,
      name: "Inventario de Productos",
      description: "Plantilla para gestionar inventario",
      category: "Logística",
      fields: 15,
      createdAt: new Date("2024-02-20"),
      isActive: true,
    },
    {
      id: 4,
      name: "Reporte de Gastos",
      description: "Plantilla para reportar gastos mensuales",
      category: "Finanzas",
      fields: 10,
      createdAt: new Date("2024-03-05"),
      isActive: false,
    },
    {
      id: 5,
      name: "Encuesta de Satisfacción",
      description: "Plantilla para encuestas a clientes",
      category: "Marketing",
      fields: 12,
      createdAt: new Date("2024-03-18"),
      isActive: true,
    },
    {
      id: 6,
      name: "Orden de Compra",
      description: "Plantilla para órdenes de compra",
      category: "Compras",
      fields: 14,
      createdAt: new Date("2024-04-02"),
      isActive: true,
    },
  ]

  departamentos: Departamento[] = [];
  formularioProyecto: FormGroup;
  creando = false;
  error = false;
  mensajeError: string | null = null;
  filteredTemplates: Template[] = this.templates
  searchTerm = ""
  selectedCategory = ""
  categories: string[] = [...new Set(this.templates.map((template) => template.category))]
  mostrarModalCreacionProyecto = false;
  proyectoAsociado: any = null;
  proyectosCreados: any[] = [];


  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private departamentoService: DepartamentoService,
    private translate: TranslateService
  ) {
    this.formularioProyecto = this.fb.group({
      id_proyecto: ['', Validators.required],
      nombre: ['', Validators.required],
      objetivo: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      departamento_id: ['', Validators.required]
    });

    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe({
      next: (datos) => {
        this.departamentos = datos;
      },
      error: (err) => {
        console.error('Error al cargar departamentos', err);
      }
    });
  }

  abrirModalCreacionProyecto(template: any) {
    this.proyectoAsociado = template;
    this.mostrarModalCreacionProyecto = true;
    this.error = false;
    this.mensajeError = null;
  }

  cerrarModalCreacionProyecto() {
    this.mostrarModalCreacionProyecto = false;
    this.proyectoAsociado = null;
    this.formularioProyecto.reset();
  }

  guardarProyecto() {
    if (this.formularioProyecto.invalid) {
      this.error = true;
      this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    this.creando = true;
    this.error = false;
    this.mensajeError = null;

    const form = this.formularioProyecto.value;

    // Si el backend espera un objeto "departamento" en lugar de solo "departamento_id", ajusta aquí:
    const proyecto = {
      id_proyecto: form.id_proyecto,
      nombre: form.nombre,
      objetivo: form.objetivo,
      fecha_ini: form.fecha_ini,
      fecha_fin: form.fecha_fin,
      departamento: {
        id: form.departamento_id
      }
    };

    this.proyectoService.crearProyecto(proyecto).subscribe({
      next: () => {
        this.cerrarModalCreacionProyecto();
        this.creando = false;
        // Opcional: notificación de éxito
      },
      error: (err) => {
        this.error = true;
        this.creando = false;
        this.mensajeError = err.error?.message || 'Ocurrió un error al crear el proyecto.';
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term
    this.applyFilters()
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category
    this.applyFilters()
  }

  applyFilters(): void {
    this.filteredTemplates = this.templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(this.searchTerm.toLowerCase())

      const matchesCategory = this.selectedCategory === "" || template.category === this.selectedCategory

      return matchesSearch && matchesCategory && template.isActive
    })
  }
}
