import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Template } from '../../../modelos/template';

@Component({
  selector: 'app-tarjeta',
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() template!: Template;
  @Input() departamentoId!: string;
  @Output() rellenar = new EventEmitter<{ template: Template, departamentoId: string }>();

  onRellenar() {
    console.log('departamentoId recibido:', this.departamentoId);
    this.rellenar.emit({ template: this.template, departamentoId: this.departamentoId });
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
