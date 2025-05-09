import { Component } from '@angular/core';
import { BuscadorComponent } from './buscador/buscador.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { HeaderComponent } from "../../mainview/header/header.component";


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
  imports: [BuscadorComponent, TarjetaComponent, HeaderComponent],
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

  filteredTemplates: Template[] = this.templates
  searchTerm = ""
  selectedCategory = ""
  categories: string[] = [...new Set(this.templates.map((template) => template.category))]

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
