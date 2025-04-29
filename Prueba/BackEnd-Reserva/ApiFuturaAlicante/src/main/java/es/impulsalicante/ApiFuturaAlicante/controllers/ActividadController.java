package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Actividad;
import es.impulsalicante.ApiFuturaAlicante.services.ActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("actividades")
public class ActividadController {

    @Autowired
    private ActividadService actividadService;

    @GetMapping
    public ResponseEntity<?> getAllActividad() {
        try{
            return ResponseEntity.ok(actividadService.getActividad());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getActividadById(@PathVariable String id) {
        Optional<Actividad> actividad = actividadService.getActividadByID(id);
        if (actividad.isPresent()) {
            return ResponseEntity.ok(actividad.get());
        } else {
            return ResponseEntity.status(404).body("Proyecto con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createActividad(@RequestBody Actividad actividad) {
        try{
            Actividad nuevaActividad = actividadService.createActividad(actividad);
            return ResponseEntity.ok(nuevaActividad);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateActividad(@PathVariable String id, @RequestBody Actividad actividad) {
        Optional<Actividad> existingActividad = actividadService.getActividadByID(id);
        if (existingActividad.isPresent()) {
            actividadService.updateActividad(id, actividad);
            return ResponseEntity.ok("Actividad con ID " + id + " actualizada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Actividad con ID " + id + " no encontrada.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteActividad(@PathVariable String id) {
        Optional<Actividad> existingActividad = actividadService.getActividadByID(id);
        if (existingActividad.isPresent()) {
            actividadService.deleteActividad(id);
            return ResponseEntity.ok("Actividad con ID " + id + " eliminada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Actividad con ID " + id + " no encontrada.");
        }
    }
}
