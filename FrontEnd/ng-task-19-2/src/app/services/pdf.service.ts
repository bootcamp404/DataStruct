import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class PdfService {
  private baseUrl = "http://localhost:8080/alicanteFutura/api/v1"

  constructor(private http: HttpClient) {}

  uploadImages(files: File[]): Observable<any> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("images", file)
    })

    return this.http.post(`${this.baseUrl}/memoria/uploads`, formData)
  }

  generatePdf(request: any): Observable<Blob> {
    console.log("Sending PDF generation request:", request)

    return this.http.post(`${this.baseUrl}/memoria/pdf/${request.year}`, request, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  getPreview(year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/memoria/previsualizacion/${year}`)
  }

  // Método para subir imágenes como base64 (alternativo)
  uploadImagesAsBase64(imageMapping: { [key: string]: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/memoria/images/base64`, { imageMapping })
  }
}
