import { ResumenMemoriaDTO } from './resumen-memoria.dto';

interface Imagen {
  id: number;
  nombre: string;
  url: string;
  categoria?: string;
  seleccionada?: boolean;
}

export interface ImagePlaceholder {
  id: string
  name: string
  section: string
  description: string
  width: number
  height: number
  uploadedImage?: string
}

export interface UploadedImage {
  id: string
  name: string
  url: string
  file: File
}

export interface PdfGenerationRequest {
  year: number
  imageMapping: { [key: string]: string }
}


export interface PrevisualizacionDTO {
  resumen: ResumenMemoriaDTO;
  imagenes: Imagen[];
}
