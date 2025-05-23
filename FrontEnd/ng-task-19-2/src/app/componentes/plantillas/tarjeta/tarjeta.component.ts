import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  selector: 'app-tarjeta',
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() template!: Template;
  @Output() rellenar = new EventEmitter<void>();

  onRellenar(){
    this.rellenar.emit();
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      Finanzas: "bg-blue-100 text-blue-800",
      Marketing: "bg-green-100 text-green-800",
      Logística: "bg-yellow-100 text-yellow-800",
      Compras: "bg-purple-100 text-purple-800",
    }

    return colors[category] || "bg-gray-100 text-gray-800"
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString()
  }
}
