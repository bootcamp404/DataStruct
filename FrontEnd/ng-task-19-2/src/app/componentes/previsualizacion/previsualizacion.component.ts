import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import  { ActivatedRoute } from "@angular/router"
import  { PdfService } from "../../services/pdf.service"
import  { ImagenService } from "../../services/imagen.service"
import  { ImagePlaceholder, UploadedImage } from "../../modelos/interfaces"
import  { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"
import { HeaderComponent } from "../../mainview/header/header.component"
import { FooterComponent } from "../../mainview/footer/footer.component"

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
  selector: "app-previsualizacion",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: "./previsualizacion.component.html",
  styleUrls: ["./previsualizacion.component.css"],
})
export class PrevisualizacionComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>

  // Estado de imágenes y placeholders
  uploadedImages: UploadedImage[] = []
  images: AlbumImage[] = []
  filteredImages: AlbumImage[] = []
  modalFilteredImages: AlbumImage[] = []
  categories: string[] = []
  placeholders: ImagePlaceholder[] = [
    {
       id: "portada_principal",
      name: "Portada Memoria Anual",
      section: "Portada Memoria Anual",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "portada_dpto_promocion",
      name: "Portada Departamento Promoción",
      section: "Sección 1 - DEPARTAMENTO DE AGENCIA LOCAL DE DESARROLLO ECONÓMICO Y SOCIAL",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "portada_dpto_empleo",
      name: "Portada Departamento Empleo",
      section: "Sección 2 - DEPARTAMENTO DE EMPLEO Y FORMACIÓN",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "portada_dpto_promociom",
      name: "Portada Departamento Promoción Económica",
      section: "Sección 3 - DEPARTAMENTO DE PROMOCIÓN ECONÓMICA",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "portada_dpto_desarrollo",
      name: "Portada Departamento Desarrollo",
      section: "Sección 4 - PROGRAMAS DE DESARROLLO LOCAL ESTRATÉGICO",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "portada_dpto_gestion",
      name: "Portada Departamento Gestión",
      section: "Sección 5 - ÁREAS DE GESTIÓN",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "portada_dpto_marketing",
      name: "Portada Departamento Marketing",
      section: "Sección 6 - DEPARTAMENTO DE MARKETING Y COMUNICACIÓN",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "anexo20",
      name: "Anexo 20",
      section: "Sección 2.7 - OTROS",
      description: "IV Feria de empleo y formación Zona Norte",
      width: 600,
      height: 400,
    },
    {
      id: "anexo21",
      name: "Anexo 21",
      section: "Sección 2.7 - OTROS",
      description: "IV Encuentro de Empleo dirigido a Personas con Diversidad Funcional",
      width: 600,
      height: 400,
    }
  ]

  // Estado de la aplicación
  isGenerating = false
  isLoading = true
  error: string | null = null
  pdfUrl: string | null = null
  safePdfUrl: SafeResourceUrl | null = null
  currentYear = 2025

  // Estado de la interfaz
  activeTab = "secciones"
  showEditView = false
  searchTerm = ""
  selectedCategory = "todas"
  modalSearchTerm = ""
  modalSelectedCategory = "todas"

  // Para el álbum de imágenes
  showAlbumModal = false
  selectedPlaceholderId: string | null = null

  constructor(
    private pdfService: PdfService,
    private imagenService: ImagenService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log("🚀 Iniciando PrevisualizacionComponent")

    // Obtener el año de la ruta
    this.route.params.subscribe((params) => {
      this.currentYear = Number.parseInt(params["year"]) || 2025
      console.log("📅 Año configurado:", this.currentYear)
    })

    // Cargar imágenes del álbum
    this.loadAlbumImages()
  }

  loadAlbumImages(): void {
    console.log("🔄 Iniciando carga de imágenes del álbum...")
    this.isLoading = true
    this.error = null

    // Verificar que el servicio está disponible
    if (!this.imagenService) {
      console.error("❌ ImagenService no está disponible")
      this.loadMockData()
      return
    }

    console.log("📡 Llamando a imagenService.obtenerTodas()...")

    this.imagenService.obtenerTodas().subscribe({
      next: (images) => {
        console.log("✅ Respuesta recibida del servidor:", images)

        if (!images || !Array.isArray(images) || images.length === 0) {
          console.warn("⚠️ No hay imágenes disponibles, cargando datos de prueba")
          this.loadMockData()
          return
        }

        // Mapear las imágenes del backend al formato del frontend
        this.images = images.map((img) => ({
          id: img.id,
          nombre: img.nombre,
          url: img.url,
          categoria: img.categoria,
          descripcion: img.descripcion || "",
          tags: img.tags || "",
          selected: false,
        }))

        this.filteredImages = [...this.images]
        this.modalFilteredImages = [...this.images]
        this.extractCategories()
        this.isLoading = false

        console.log("✅ Imágenes cargadas exitosamente:", this.images.length)
        console.log("📋 Categorías encontradas:", this.categories)
      },
      error: (err) => {
        console.error("❌ Error al cargar imágenes del álbum:", err)

        let errorMessage = "No se pudieron cargar las imágenes del servidor."

        if (err.status === 0) {
          errorMessage += " Problema de conexión con el servidor."
        } else if (err.status === 404) {
          errorMessage += " Endpoint no encontrado."
        } else if (err.status === 500) {
          errorMessage += " Error interno del servidor."
        } else if (err.message && err.message.includes("descripcion")) {
          errorMessage +=
            " La tabla de la base de datos necesita ser actualizada. Ejecuta el script SQL para añadir las columnas faltantes."
        }

        this.error = errorMessage

        // Cargar datos de prueba como fallback
        console.log("🔄 Cargando datos de prueba como fallback...")
        this.loadMockData()
      },
    })
  }

  // Método para cargar datos de prueba (basados en las imágenes reales del proyecto)
  loadMockData(): void {
    console.log("🧪 Cargando datos de prueba basados en las imágenes reales...")

    
    const mockImages: AlbumImage[] = [
      {
        id: 1,
        nombre: "Agencia Local",
        url: "/uploads/agencialocal.jpg",
        categoria: "Institucional",
        descripcion: "Logo oficial de la Agencia Local de Desarrollo",
        tags: "agencia,local,logo",
      },
      {
        id: 2,
        nombre: "Impulsa Alicante Logo",
        url: "http://localhost:8080/alicanteFutura/api/v1/uploads/impulsalicante_logo.jpg",
        categoria: "Institucional",
        descripcion: "Logo oficial de Impulsa Alicante",
        tags: "impulsa,alicante,logo",
      },
      {
        id: 3,
        nombre: "Ayuntamiento de Alicante",
        url: "http://localhost:8080/alicanteFutura/api/v1/uploads/ayuntamiento_alicante.jpg",
        categoria: "Institucional",
        descripcion: "Edificio del Ayuntamiento de Alicante",
        tags: "ayuntamiento,alicante,edificio",
      },
      {
        id: 4,
        nombre: "Centro de Empleo Alejandrina Candela",
        url: "http://localhost:8080/alicanteFutura/api/v1/uploads/centro_empleo_alejandrina_candela.jpg",
        categoria: "Empleo y Formación",
        descripcion: "Centro de Empleo Alejandrina Candela",
        tags: "centro,empleo,alejandrina,candela",
      },
      {
        id: 5,
        nombre: "LABORA",
        url: "http://localhost:8080/alicanteFutura/api/v1/uploads/labora.jpg",
        categoria: "Empleo y Formación",
        descripcion: "Servicio Valenciano de Empleo y Formación",
        tags: "labora,empleo,formacion",
      },
      {
        id: 6,
        nombre: "Porta Ferrisa",
        url: "http://localhost:8080/alicanteFutura/api/v1/uploads/porta_ferrisa.jpg",
        categoria: "Promoción Económica",
        descripcion: "Instalaciones Porta Ferrisa",
        tags: "porta,ferrisa,instalaciones",
      },
      {
        id: 7,
        nombre: "Alicante Futura",
        url: "http://localhost:8080/alicanteFutura/api/v1/uploads/alicante_futura.jpg",
        categoria: "Desarrollo Local",
        descripcion: "Proyecto Alicante Futura",
        tags: "alicante,futura,desarrollo",
      },
      {
        id: 8,
        nombre: "Observatorio del Pacto",
        url: "http://localhost:8080/alicanteFutura/api/v1/uploads/observatorio_pacto.jpg",
        categoria: "Desarrollo Local",
        descripcion: "Observatorio del Pacto por el Empleo",
        tags: "observatorio,pacto,empleo",
      },
    ]

    // Simular un pequeño delay como si fuera una petición real
    setTimeout(() => {
      this.images = mockImages
      this.filteredImages = [...mockImages]
      this.modalFilteredImages = [...mockImages]
      this.extractCategories()
      this.isLoading = false
      this.error = null
      console.log("✅ Datos de prueba cargados:", this.images.length)
      console.log("📋 Categorías:", this.categories)
    }, 1000)
  }

  extractCategories(): void {
    console.log("🏷️ Extrayendo categorías...")
    const uniqueCategories = new Set<string>()

    this.images.forEach((img) => {
      if (img.categoria) {
        uniqueCategories.add(img.categoria)
      }
    })

    this.categories = Array.from(uniqueCategories)
    console.log("✅ Categorías extraídas:", this.categories)
  }

  // Método para probar la conexión manualmente
  testConnection(): void {
    console.log("🧪 Probando conexión manual...")
    this.loadAlbumImages()
  }

  // Método para verificar el servicio
  checkService(): void {
    console.log("🔍 Verificando servicio ImagenService:")
    console.log("- Servicio existe:", !!this.imagenService)
    console.log("- Método obtenerTodas existe:", !!this.imagenService?.obtenerTodas)
    console.log("- Tipo del servicio:", typeof this.imagenService)

    if (this.imagenService) {
      console.log("- Métodos disponibles:", Object.getOwnPropertyNames(Object.getPrototypeOf(this.imagenService)))
    }
  }

  // Método para forzar el uso de datos de prueba
  useMockData(): void {
    console.log("🔄 Forzando uso de datos de prueba...")
    this.loadMockData()
  }

  // Método para reinicializar las imágenes del backend
  reinitializeBackendImages(): void {
    console.log("🔄 Solicitando reinicialización de imágenes del backend...")
    // Aquí podrías llamar a un endpoint específico para reinicializar las imágenes
    // Por ahora, simplemente recargamos
    this.loadAlbumImages()
  }

  // Métodos de gestión de imágenes subidas
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            url: e.target?.result as string,
            file: file,
          }
          this.uploadedImages.push(newImage)
        }
        reader.readAsDataURL(file)
      }
    })
  }

  selectImages(): void {
    this.fileInput.nativeElement.click()
  }

  // Métodos de gestión de placeholders
  assignImageToPlaceholder(placeholderId: string, imageUrl: string): void {
    this.placeholders = this.placeholders.map((p) => (p.id === placeholderId ? { ...p, uploadedImage: imageUrl } : p))
  }

  removeImageFromPlaceholder(placeholderId: string): void {
    this.placeholders = this.placeholders.map((p) => (p.id === placeholderId ? { ...p, uploadedImage: undefined } : p))
  }

  removeUploadedImage(imageId: string): void {
    const imageToRemove = this.uploadedImages.find((img) => img.id === imageId)
    this.uploadedImages = this.uploadedImages.filter((img) => img.id !== imageId)

    if (imageToRemove) {
      this.placeholders = this.placeholders.map((p) =>
        p.uploadedImage === imageToRemove.url ? { ...p, uploadedImage: undefined } : p,
      )
    }
  }

  // Métodos del álbum
  selectAlbumImage(image: AlbumImage): void {
    if (this.selectedPlaceholderId) {
      this.assignImageToPlaceholder(this.selectedPlaceholderId, image.url)
      this.selectedPlaceholderId = null
    }
  }

  selectModalImage(image: AlbumImage): void {
    if (this.selectedPlaceholderId) {
      this.assignImageToPlaceholder(this.selectedPlaceholderId, image.url)
      this.closeAlbumModal()
    }
  }

  selectPlaceholderForAlbum(placeholderId: string): void {
    this.selectedPlaceholderId = placeholderId
    this.setActiveTab("album")
  }

  // Métodos de filtrado
  filterByCategory(category: string): void {
    this.selectedCategory = category
    this.applyFilters()
  }

  filterModalByCategory(category: string): void {
    this.modalSelectedCategory = category
    this.applyModalFilters()
  }

  onSearch(): void {
    this.applyFilters()
  }

  onModalSearch(): void {
    this.applyModalFilters()
  }

  applyFilters(): void {
    let result = [...this.images]

    if (this.selectedCategory !== "todas") {
      result = result.filter((img) => img.categoria === this.selectedCategory)
    }

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
  }

  applyModalFilters(): void {
    let result = [...this.images]

    if (this.modalSelectedCategory !== "todas") {
      result = result.filter((img) => img.categoria === this.modalSelectedCategory)
    }

    if (this.modalSearchTerm.trim()) {
      const term = this.modalSearchTerm.toLowerCase()
      result = result.filter(
        (img) =>
          img.nombre?.toLowerCase().includes(term) ||
          img.descripcion?.toLowerCase().includes(term) ||
          img.tags?.toLowerCase().includes(term),
      )
    }

    this.modalFilteredImages = result
  }

  // Generación de PDF
  previewPDF(): void {
    this.isGenerating = true

    const imageMapping: { [key: string]: string } = {}

    this.placeholders.forEach((placeholder) => {
      if (placeholder.uploadedImage) {
        imageMapping[placeholder.id] = placeholder.uploadedImage
      }
    })

    const request = {
      year: this.currentYear,
      imageMapping: imageMapping,
      preview: true,
    }

    this.pdfService.generatePdf(request).subscribe({
      next: (blob) => {
        this.pdfUrl = URL.createObjectURL(blob)
        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl)
        this.isGenerating = false
      },
      error: (error) => {
        console.error("Error generating PDF preview:", error)
        this.isGenerating = false
      },
    })
  }

  generatePDF(): void {
    this.isGenerating = true

    const imageMapping: { [key: string]: string } = {}

    this.placeholders.forEach((placeholder) => {
      if (placeholder.uploadedImage) {
        imageMapping[placeholder.id] = placeholder.uploadedImage
      }
    })

    const request = {
      year: this.currentYear,
      imageMapping: imageMapping,
      preview: false,
    }

    this.pdfService.generatePdf(request).subscribe({
      next: (blob) => {
        this.pdfUrl = URL.createObjectURL(blob)
        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl)
        this.isGenerating = false
      },
      error: (error) => {
        console.error("Error generating PDF:", error)
        this.isGenerating = false
      },
    })
  }

  downloadPDF(): void {
    if (this.pdfUrl) {
      const link = document.createElement("a")
      link.href = this.pdfUrl
      link.download = `memoria-${this.currentYear}.pdf`
      link.click()
    }
  }

  // Métodos de interfaz
  get assignedPlaceholders(): number {
    return this.placeholders.filter((p) => p.uploadedImage).length
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  toggleEditView(): void {
    this.showEditView = !this.showEditView
  }

  getSelectedPlaceholderName(): string {
    if (!this.selectedPlaceholderId) return ""
    const placeholder = this.placeholders.find((p) => p.id === this.selectedPlaceholderId)
    return placeholder?.name || ""
  }

  // Métodos para el álbum de imágenes
  openAlbumModal(placeholderId: string): void {
    this.selectedPlaceholderId = placeholderId
    this.showAlbumModal = true
    this.modalSearchTerm = ""
    this.modalSelectedCategory = "todas"
    this.modalFilteredImages = [...this.images]
  }

  closeAlbumModal(): void {
    this.showAlbumModal = false
    this.selectedPlaceholderId = null
  }
}
