package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.services.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<Map<String,String>> chat(@RequestBody Map<String,String> body) {
        String pregunta = body.get("pregunta");
        String respuesta = chatService.preguntar(pregunta);
        return ResponseEntity.ok(Map.of("respuesta", respuesta));
    }
}
