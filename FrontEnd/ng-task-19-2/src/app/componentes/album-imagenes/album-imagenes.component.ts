import { Component, type OnInit, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ImagenService } from "../../services/imagen.service"

interface AlbumImage {
  id: number
  nombre: string
  url: string
  categoria: string
  descripcion?: string
  tags?: string
  selected?: boolean
}

@Component({
  selector: "app-album-imagenes",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./album-imagenes.component.html",
  styleUrls: ["./album-imagenes.component.css"],
})
export class AlbumImagenesComponent implements OnInit {
  @Output() imageSelected = new EventEmitter<{ url: string; name: string }>()

  images: AlbumImage[] = []
  filteredImages: AlbumImage[] = []
  categories: string[] = []
  selectedCategory = "todas"
  searchTerm = ""
  isLoading = true
  error: string | null = null

  constructor(private imagenService: ImagenService) {}

  ngOnInit(): void {
    this.loadImages()
  }

  loadImages(): void {
    this.isLoading = true
    this.error = null
    
    this.imagenService.obtenerTodas().subscribe({
      next: (images) => {
        console.log('Imágenes recibidas:', images) // Debug
        this.images = images
        this.filteredImages = [...images]
        this.extractCategories()
        this.isLoading = false
        
        // Verificar URLs de imágenes
        this.checkImageUrls()
      },
      error: (err) => {
        console.error("Error al cargar imágenes:", err)
        this.error = "No se pudieron cargar las imágenes. Por favor, inténtalo de nuevo."
        this.isLoading = false
      },
    })
  }

  // Método para verificar si las URLs de las imágenes son válidas
  checkImageUrls(): void {
    this.images.forEach((image, index) => {
      if (!image.url || image.url.trim() === '') {
        console.warn(`Imagen ${index} no tiene URL válida:`, image)
      } else {
        console.log(`Imagen ${index} URL:`, image.url)
      }
    })
  }

  extractCategories(): void {
    const uniqueCategories = new Set<string>()
    this.images.forEach((img) => {
      if (img.categoria) {
        uniqueCategories.add(img.categoria)
      }
    })
    this.categories = Array.from(uniqueCategories)
    console.log('Categorías extraídas:', this.categories) // Debug
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category
    this.applyFilters()
  }

  onSearch(): void {
    this.applyFilters()
  }

  applyFilters(): void {
    let result = [...this.images]

    // Filtrar por categoría
    if (this.selectedCategory !== "todas") {
      result = result.filter((img) => img.categoria === this.selectedCategory)
    }

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase()
      result = result.filter(
        (img) =>
          img.nombre?.toLowerCase().includes(term) ||
          img.descripcion?.toLowerCase().includes(term) ||
          img.tags?.toLowerCase().includes(term),
      )
    }

    this.filteredImages = result
    console.log('Imágenes filtradas:', this.filteredImages.length) // Debug
  }

  selectImage(image: AlbumImage): void {
    this.imageSelected.emit({
      url: image.url,
      name: image.nombre,
    })
  }

  // Método para manejar errores de carga de imágenes
  onImageError(event: any, image: AlbumImage): void {
    console.error(`Error al cargar imagen: ${image.nombre}`, event)
    // Opcional: establecer una imagen por defecto
    event.target.src = 'assets/images/placeholder.png' // Asegúrate de tener esta imagen
  }

  // Método para confirmar que la imagen se cargó correctamente
  onImageLoad(image: AlbumImage): void {
    console.log(`Imagen cargada correctamente: ${image.nombre}`)
  }

  // Método para trackBy en ngFor (mejora el rendimiento)
  trackByImageId(index: number, image: AlbumImage): number {
    return image.id
  }

  loadImagenesAgrupadas(): void {
    this.imagenService.obtenerImagenesAgrupadas().subscribe({
      next: (imageGroups) => {
        console.log("Imágenes agrupadas:", imageGroups)
      },
      error: (err) => {
        console.error("Error al cargar imágenes agrupadas:", err)
      },
    })
  }
}