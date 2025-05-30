package es.impulsalicante.ApiFuturaAlicante.services;

import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.HashMap;
import java.util.Map;

@Service
public class ChatService {

    private final Map<String, String> chatMap = new HashMap<>();

    public ChatService() {
        // Al crear el mapa, normalizamos cada clave
        chatMap.put(normalize("¿Qué servicios ofrece DataBridge?"),
                "En DataBridge ofrecemos una organización departamental donde poder registrar la información para al final del año poder generar una memoria anual con un solo click.");
        chatMap.put(normalize("¿Cómo puedo registrarme?"),
                "Para registrarte ve a a la esquina superior derecha, rellena el formulario y confirma tu email.");
        chatMap.put(normalize("¿Cuáles son los departamentos?"),
                "Los departamentos predeterminados son el de empleo y formación, promoción económica, desarrollo local estrátegico, jurídico y administrativo, y recursos humanos. Pero se pueden crear tantos como sean necesarios.");
        chatMap.put(normalize("¿Cómo puedo descargar la memoria anual?"),
                "Después de completar todos los formularios necesarios, se podrá generar la memoria anual con solo pulsar al botón del banner");
        chatMap.put(normalize("¿Puedo filtrar por departamento?"),
                "Sí, en la sección dashboards y documentos hay un filtro de departamentos para mostrar solo la información de estos.");
        chatMap.put(normalize("No está aquí mi duda"),
                "No te preocupes, manda un correo a impulsa@gmail.com y se te responderá lo antes posible");
    }

    public String preguntar(String input) {
        String key = normalize(input);

        // Búsqueda exacta sobre la clave normalizada
        if (chatMap.containsKey(key)) {
            return chatMap.get(key);
        }

        // Búsqueda por substring (ambas partes ya normalizadas)
        for (var entry : chatMap.entrySet()) {
            if (key.contains(entry.getKey())) {
                return entry.getValue();
            }
        }

        return "Lo siento, no comprendo tu pregunta. ¿Puedes reformularla?";
    }

    private String normalize(String s) {
        if (s == null) return "";
        // 1) minúsculas y trim
        String n = s.toLowerCase().trim();
        // 2) descomponer acentos y eliminar marcas diacríticas
        n = Normalizer.normalize(n, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        // 3) quitar signos de interrogación, admiración y puntos
        return n.replaceAll("[¿?¡!\\.]", "");
    }
}
