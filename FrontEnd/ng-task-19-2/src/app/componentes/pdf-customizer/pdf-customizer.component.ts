import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import  { PdfService } from "../../services/pdf.service"
import  { ImagenService } from "../../services/imagen.service"
import  { ImagePlaceholder, UploadedImage } from "../../modelos/interfaces"
import  { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"
import { AlbumImagenesComponent } from "../album-imagenes/album-imagenes.component"

@Component({
  selector: "app-pdf-customizer",
  standalone: true,
  imports: [CommonModule, FormsModule, AlbumImagenesComponent],
  templateUrl: "./pdf-customizer.component.html",
  styleUrls: ["./pdf-customizer.component.css"],
})
export class PdfCustomizerComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>

  uploadedImages: UploadedImage[] = []
  placeholders: ImagePlaceholder[] = [
    {
      id: "portada_dpto_promocion",
      name: "Portada Departamento Promoción",
      section: "Sección 3 - Promoción Económica",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "anexo20",
      name: "IV Feria de empleo Zona Norte",
      section: "Sección 2.7 - Otros",
      description: "Imagen del evento de la feria de empleo",
      width: 600,
      height: 300,
    },
    {
      id: "anexo21",
      name: "IV Encuentro Diversidad Funcional",
      section: "Sección 2.7 - Otros",
      description: "Imagen del encuentro de empleo",
      width: 600,
      height: 300,
    },
    {
      id: "anexo45",
      name: "Gráfico ALIA",
      section: "Sección 4.4 - ALIA",
      description: "Gráfico de resultados ALIA",
      width: 700,
      height: 350,
    },
  ]

  isGenerating = false
  pdfUrl: string | null = null
  safePdfUrl: SafeResourceUrl | null = null
  activeTab = "upload"
  activePreviewTab = "pdf"
  showEditView = false
  currentYear = 2025

  // Nuevo: para el álbum de imágenes
  showAlbumModal = false
  selectedPlaceholderId: string | null = null
  predefinedImages: any[] = []

  constructor(
    private pdfService: PdfService,
    private imagenService: ImagenService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    // Cargar imágenes predefinidas al iniciar
    this.loadPredefinedImages()
  }

  loadPredefinedImages(): void {
    this.imagenService.obtenerTodas().subscribe({
      next: (images) => {
        this.predefinedImages = images
      },
      error: (err) => {
        console.error("Error al cargar imágenes predefinidas:", err)
      },
    })
  }

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

  assignImageToPlaceholder(placeholderId: string, imageUrl: string): void {
    this.placeholders = this.placeholders.map((p) => (p.id === placeholderId ? { ...p, uploadedImage: imageUrl } : p))
  }

  removeImageFromPlaceholder(placeholderId: string): void {
    this.placeholders = this.placeholders.map((p) => (p.id === placeholderId ? { ...p, uploadedImage: undefined } : p))
  }

  removeUploadedImage(imageId: string): void {
    const imageToRemove = this.uploadedImages.find((img) => img.id === imageId)
    this.uploadedImages = this.uploadedImages.filter((img) => img.id !== imageId)

    // También remover de placeholders si está asignada
    if (imageToRemove) {
      this.placeholders = this.placeholders.map((p) =>
        p.uploadedImage === imageToRemove.url ? { ...p, uploadedImage: undefined } : p,
      )
    }
  }

  async uploadImagesToServer(): Promise<string[]> {
    if (this.uploadedImages.length === 0) return []

    try {
      const files = this.uploadedImages.map((img) => img.file)
      const response = await this.pdfService.uploadImages(files).toPromise()
      return response.imageUrls || []
    } catch (error) {
      console.error("Error uploading images:", error)
      return []
    }
  }

  async generatePDF(): Promise<void> {
    this.isGenerating = true
    try {
      // Primero subir las imágenes al servidor
      const serverImageUrls = await this.uploadImagesToServer()

      // Crear el mapeo de placeholders con las URLs del servidor
      const imageMapping: { [key: string]: string } = {}

      this.placeholders.forEach((placeholder) => {
        if (placeholder.uploadedImage) {
          const uploadedImg = this.uploadedImages.find((img) => img.url === placeholder.uploadedImage)
          if (uploadedImg) {
            const serverUrl = serverImageUrls.find((url) => url.includes(uploadedImg.name))
            imageMapping[placeholder.id] = serverUrl || placeholder.uploadedImage
          } else {
            // Si no es una imagen subida, podría ser una del álbum predefinido
            imageMapping[placeholder.id] = placeholder.uploadedImage
          }
        }
      })

      // Llamar al endpoint de generación de PDF
      const request = {
        year: this.currentYear,
        imageMapping: imageMapping,
      }

      const blob = await this.pdfService.generatePdf(request).toPromise()
      if (blob) {
        this.pdfUrl = URL.createObjectURL(blob)
        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      this.isGenerating = false
    }
  }

  downloadPDF(): void {
    if (this.pdfUrl) {
      const link = document.createElement("a")
      link.href = this.pdfUrl
      link.download = `memoria-${this.currentYear}.pdf`
      link.click()
    }
  }

  get assignedPlaceholders(): number {
    return this.placeholders.filter((p) => p.uploadedImage).length
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  setActivePreviewTab(tab: string): void {
    this.activePreviewTab = tab
  }

  toggleEditView(): void {
    this.showEditView = !this.showEditView
  }

  // Nuevos métodos para el álbum de imágenes
  openAlbumModal(placeholderId: string): void {
    this.selectedPlaceholderId = placeholderId
    this.showAlbumModal = true
  }

  closeAlbumModal(): void {
    this.showAlbumModal = false
    this.selectedPlaceholderId = null
  }

  onAlbumImageSelected(imageData: { url: string; name: string }): void {
    if (this.selectedPlaceholderId) {
      this.assignImageToPlaceholder(this.selectedPlaceholderId, imageData.url)
      this.closeAlbumModal()
    }
  }
}
