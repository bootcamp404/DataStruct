import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"

@Component({
  selector: 'app-buscador',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  @Input() categories: string[] = []
  @Output() searchChange = new EventEmitter<string>()
  @Output() categoryChange = new EventEmitter<string>()

  searchTerm = ""
  selectedCategory = ""

  onSearchInput(): void {
    this.searchChange.emit(this.searchTerm)
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category
    this.categoryChange.emit(category)
  }

  clearFilters(): void {
    this.searchTerm = ""
    this.selectedCategory = ""
    this.searchChange.emit("")
    this.categoryChange.emit("")
  }
}
