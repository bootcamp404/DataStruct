package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.ActividadValoracionParticipante;
import es.impulsalicante.ApiFuturaAlicante.services.ActividadValoracionParticipanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("actividad-valoracion-participante")
public class ActividadValoracionParticipanteController {

    @Autowired
    private ActividadValoracionParticipanteService actividadValoracionParticipanteService;

    // GET para obtener todos
    @GetMapping
    public ResponseEntity<List<ActividadValoracionParticipante>> getAllActividadValoracionParticipante() {
        return ResponseEntity.ok(actividadValoracionParticipanteService.getActividadValoracionParticipante());
    }

    // GET para obtener por ID compuesto
    @GetMapping("/{idActividad}/{idParticipante}")
    public ResponseEntity<ActividadValoracionParticipante> getActividadValoracionParticipanteByID(
            @PathVariable("idActividad") String idActividad,
            @PathVariable("idParticipante") String idParticipante) {

        Optional<ActividadValoracionParticipante> existingActividadValoracionParticipante =
                actividadValoracionParticipanteService.getActividadValoracionParticipanteByID(idActividad, idParticipante);

        if (existingActividadValoracionParticipante.isPresent()) {
            return ResponseEntity.ok(existingActividadValoracionParticipante.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    // POST para crear
    @PostMapping
    public ResponseEntity<ActividadValoracionParticipante> createActividadValoracionParticipante(
            @RequestBody ActividadValoracionParticipante actividadValoracionParticipante) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(actividadValoracionParticipanteService.createActividadValoracionParticipante(actividadValoracionParticipante));
    }

    // PUT para actualizar
    @PutMapping ("/{idActividad}/{idParticipante}")
    public ResponseEntity<ActividadValoracionParticipante> updateActividadValoracionParticipante(
            @RequestBody ActividadValoracionParticipante actividadValoracionParticipante) {

        return ResponseEntity.ok(actividadValoracionParticipanteService.updateActividadValoracionParticipante(actividadValoracionParticipante));
    }

    // DELETE para eliminar
    @DeleteMapping("/{idActividad}/{idParticipante}")
    public ResponseEntity<String> deleteActividadValoracionParticipante(
            @PathVariable("idActividad") String idActividad,
            @PathVariable("idParticipante") String idParticipante) {

        try {
            actividadValoracionParticipanteService.deleteActividadValoracionParticipante(idActividad, idParticipante);
            return ResponseEntity.ok("Actividad con ID " + idActividad + " y Participante " + idParticipante + " eliminada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("No se pudo eliminar. Actividad con ID " + idActividad + " y Participante " + idParticipante + " no encontrados.");
        }
    }
}