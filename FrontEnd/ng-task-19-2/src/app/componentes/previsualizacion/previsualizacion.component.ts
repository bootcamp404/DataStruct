import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import  { ActivatedRoute } from "@angular/router"
import  { PdfService } from "../../services/pdf.service"
import  { ImagePlaceholder, UploadedImage } from "../../modelos/interfaces"
import  { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"
import { HeaderComponent } from "../../mainview/header/header.component";
import { FooterComponent } from "../../mainview/footer/footer.component";

@Component({
  selector: "app-previsualizacion",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent, FooterComponent],
  // ✅ Removido providers ya que el servicio tiene providedIn: 'root'
  templateUrl: "./previsualizacion.component.html",
  styleUrls: ["./previsualizacion.component.css"],
})
export class PrevisualizacionComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>

  uploadedImages: UploadedImage[] = []
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
      id: "portada_dpto_local",
      name: "Portada Apartado 1",
      section: "Sección 1  - DEPARTAMENTO DE AGENCIA LOCAL DE DESARROLLO ECONÓMICO Y SOCIAL",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
     {
      id: "portada_dpto_empleo",
      name: "Portada Apartado 2",
      section: "Sección 2  - DEPARTAMENTO DE EMPLEO Y FORMACIÓN",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
     {
      id: "portada_dpto_promocion",
      name: "Portada Apartado 3",
      section: "Sección 3  - DEPARTAMENTO DE PROMOCIÓN ECONÓMICA",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
     {
      id: "portada_dpto_desarrollo",
      name: "Portada Apartado 4",
      section: "Sección 4 - PROGRAMAS DE DESARROLLO LOCAL ESTRATÉGICO",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
     {
      id: "portada_dpto_gestion",
      name: "Portada Apartado 5",
      section: "Sección 5  - ÁREAS DE GESTIÓN",
      description: "Imagen principal para la portada del departamento",
      width: 800,
      height: 400,
    },
    {
      id: "portada_dpto_marketing",
      name: "Portada Apartado 6",
      section: "Sección 6  - DEPARTAMENTO DE MARKETING Y COMUNICACIÓN",
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

  constructor(
    private pdfService: PdfService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Obtener el año de la ruta
    this.route.params.subscribe((params) => {
      this.currentYear = Number.parseInt(params["year"]) || 2025
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

    if (imageToRemove) {
      this.placeholders = this.placeholders.map((p) =>
        p.uploadedImage === imageToRemove.url ? { ...p, uploadedImage: undefined } : p,
      )
    }
  }

  generatePDF(): void {
    this.isGenerating = true

    // Crear el mapeo de placeholders con las URLs
    const imageMapping: { [key: string]: string } = {}

    this.placeholders.forEach((placeholder) => {
      if (placeholder.uploadedImage) {
        // Usar directamente la URL de la imagen subida (base64)
        imageMapping[placeholder.id] = placeholder.uploadedImage
        console.log(`Mapping ${placeholder.id} to image:`, placeholder.uploadedImage.substring(0, 50) + "...")
      }
    })

    console.log("Image mapping being sent:", imageMapping)

    // Llamar al endpoint de generación de PDF
    const request = {
      year: this.currentYear,
      imageMapping: imageMapping,
    }

    console.log("PDF generation request:", request)

    this.pdfService.generatePdf(request).subscribe({
      next: (blob) => {
        this.pdfUrl = URL.createObjectURL(blob)
        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl)
        this.isGenerating = false
        console.log("PDF generated successfully")
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
    if (this.showEditView) {
      this.activePreviewTab = "edit"
    } else {
      this.activePreviewTab = "pdf"
    }
  }

  getPlaceholdersBySection(): { [key: string]: ImagePlaceholder[] } {
    const grouped: { [key: string]: ImagePlaceholder[] } = {}

    this.placeholders.forEach((placeholder) => {
      if (!grouped[placeholder.section]) {
        grouped[placeholder.section] = []
      }
      grouped[placeholder.section].push(placeholder)
    })

    return grouped
  }

  getSectionKeys(): string[] {
    return Object.keys(this.getPlaceholdersBySection())
  }
}
