import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  respuesta = '';

  constructor(private chatService: ChatService) {}

  askServicios() {
    this.enviar('¿Qué servicios ofrece DataBridge?');
  }

  askRegistro() {
    this.enviar('¿Cómo puedo registrarme?');
  }

  askDepartamentos() {
    this.enviar('¿Cuáles son los departamentos?');
  }

  askMemoria() {
    this.enviar('¿Cómo puedo descargar la memoria anual?');
  }

  askFiltrar() {
    this.enviar('¿Puedo filtrar por departamento?');
  }

  askOtra() {
    this.enviar('No está aquí mi duda');
  }

  private enviar(pregunta: string) {
    // llamamos al servicio para obtener la respuesta
    this.chatService.chat(pregunta).subscribe({
      next: resp => this.respuesta = resp.respuesta,
      error: ()   => this.respuesta = 'Error al conectar con el servicio.'
    });
  }
}
