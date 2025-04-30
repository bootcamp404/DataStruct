package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.services.ParticipanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("participantes")
public class ParticipanteController {

    @Autowired
    private ParticipanteService participanteService;

    @GetMapping
    public ResponseEntity<?> getAllParticipantes() {
        try{
            return ResponseEntity.ok(participanteService.getParticipantes());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getParticipanteById(@PathVariable String id) {
        Optional<Participante> participante = participanteService.getParticipanteByID(id);
        if (participante.isPresent()) {
            return ResponseEntity.ok(participante.get());
        } else {
            return ResponseEntity.status(404).body("Participante con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createParticipante(@RequestBody Participante participante) {
        try{
            Participante nuevoParticipante = participanteService.createParticipante(participante);
            return ResponseEntity.ok(nuevoParticipante);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateParticipante(@PathVariable String id, @RequestBody Participante participante) {
        Optional<Participante> existingParticipante = participanteService.getParticipanteByID(id);
        if (existingParticipante.isPresent()) {
            participanteService.updateParticipante(id, participante);
            return ResponseEntity.ok("Participante con ID " + id + " actualizada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Participante con ID " + id + " no encontrada.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteParticipante(@PathVariable String id) {
        Optional<Participante> existingParticipante = participanteService.getParticipanteByID(id);
        if (existingParticipante.isPresent()) {
            participanteService.deleteParticipante(id);
            return ResponseEntity.ok("Participante con ID " + id + " eliminada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Participante con ID " + id + " no encontrada.");
        }
    }
}
