import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './Service/character.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor( public characterService: CharacterService ){}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.characterService.getCharacters().subscribe({
      next: (res) =>{
        this.characterService.characters = res;
      },
      error(err) {
        console.log(err);
      }
    })
  }

  generatePDF() {
    const doc = new jsPDF();
    const promises: Promise<void>[] = [];
    
    // Función para cargar y procesar la imagen
    const loadImage = (imageUrl: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';  // Para permitir el CORS
  
        img.onload = () => resolve(img);
        img.onerror = () => reject('Error loading image');
        
        img.src = imageUrl;
      });
    };
  
    // Pre-cargar todas las imágenes antes de agregar a cada página
    this.characterService.characters.forEach((character, index) => {
      promises.push(
        loadImage(character.image).then((img) => {
          // Si no es la primera página, añadir una nueva
          if (index > 0) {
            doc.addPage();
          }
  
          // Configurar estilos
          doc.setFontSize(20);
          doc.setTextColor(0, 0, 0);
  
          // Título con el nombre del personaje
          doc.text(character.name, 105, 20, { align: 'center' });
  
          // Centrar la imagen en la página
          const pageWidth = doc.internal.pageSize.getWidth();
          const imgWidth = 120;
          const imgHeight = 120;
          const imgX = (pageWidth - imgWidth) / 2;
  
          // Añadir imagen
          doc.addImage(img, 'JPEG', imgX, 30, imgWidth, imgHeight);
  
          // Información del personaje debajo de la imagen
          doc.setFontSize(12);
          const textY = 170;
          doc.text(`Status: ${character.status}`, 105, textY, { align: 'center' });
          doc.text(`Gender: ${character.gender}`, 105, textY + 20, { align: 'center' });
  
          // Número de página
          doc.setFontSize(12);  // Slightly larger font size for better readability
          doc.text(`Character ${index + 1} of ${this.characterService.characters.length}`, 105, 285, { align: 'center' });
        }).catch((error) => {
          console.error(error);
          // Si la imagen falla, mostrar un mensaje de error en el PDF
          if (index > 0) doc.addPage();
          doc.setFontSize(12);
          doc.text("Image not available", 105, 80, { align: 'center' });
        })
      );
    });
  
    // Cuando todas las imágenes se hayan cargado, generar y guardar el PDF
    Promise.all(promises).then(() => {
      doc.save("rick_and_morty_characters.pdf");
    });
  } 
}
