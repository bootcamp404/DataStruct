import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

export interface Imagen {
  id: number
  nombre: string
  url: string
  categoria: string
  descripcion?: string
  tags?: string
}

@Injectable({
  providedIn: "root",
})
export class ImagenService {
  private baseUrl = "http://localhost:8080/alicanteFutura/api/v1/imagenes"
  private baseImageUrl = "http://localhost:8080/alicanteFutura/api/v1/" 

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.baseUrl).pipe(
      map(images => images.map(img => ({
        ...img,
        // Corregir URLs relativas a absolutas
        url: img.url.startsWith('http') ? img.url : `${this.baseImageUrl}uploads/${img.url}`
      })))
    )
  }

  obtenerPorCategoria(categoria: string): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(`${this.baseUrl}/categoria/${categoria}`).pipe(
      map(images => images.map(img => ({
        ...img,
        url: img.url.startsWith('http') ? img.url : `${this.baseImageUrl}${img.url}`
      })))
    )
  }

  obtenerCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categorias`)
  }

  obtenerImagenesAgrupadas(): Observable<{ [key: string]: Imagen[] }> {
    return this.http.get<{ [key: string]: Imagen[] }>(`${this.baseUrl}/agrupadas`).pipe(
      map(groups => {
        const correctedGroups: { [key: string]: Imagen[] } = {}
        Object.keys(groups).forEach(key => {
          correctedGroups[key] = groups[key].map(img => ({
            ...img,
            url: img.url.startsWith('http') ? img.url : `${this.baseImageUrl}${img.url}`
          }))
        })
        return correctedGroups
      })
    )
  }

  crearImagen(imagen: Imagen): Observable<Imagen> {
    return this.http.post<Imagen>(this.baseUrl, imagen)
  }

  eliminarImagen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
}