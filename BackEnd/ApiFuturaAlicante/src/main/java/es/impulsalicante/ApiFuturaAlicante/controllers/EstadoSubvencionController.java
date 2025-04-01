package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.EstadoSubvencion;
import es.impulsalicante.ApiFuturaAlicante.models.Subvencion;
import es.impulsalicante.ApiFuturaAlicante.services.EstadoSubvencionService;
import es.impulsalicante.ApiFuturaAlicante.services.SubvencionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("estados-subvencion")
public class EstadoSubvencionController {

    @Autowired
    private EstadoSubvencionService estadoSubvencionService;

    @GetMapping
    public ResponseEntity<?> getAllSubvenciones() {
        try{
            return ResponseEntity.ok(estadoSubvencionService.getAllEstadoSubvenciones());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEstadoSubvencionById(@PathVariable String id) {
        Optional<EstadoSubvencion> estadoSubvencion = estadoSubvencionService.getEstadoSubvencionById(id);
        if (estadoSubvencion.isPresent()) {
            return ResponseEntity.ok(estadoSubvencion.get());
        } else {
            return ResponseEntity.status(404).body("Estado subvención con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createEstadoSubvencion(@RequestBody EstadoSubvencion estadoSubvencion) {
        try{
            EstadoSubvencion nuevoEstadoSubvencion = estadoSubvencionService.createEstadoSubvencion(estadoSubvencion);
            return ResponseEntity.ok(nuevoEstadoSubvencion);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateEstadoSubvencion(@PathVariable String id, @RequestBody EstadoSubvencion estadoSubvencion) {
        Optional<EstadoSubvencion> existingEstadoSubvencion = estadoSubvencionService.getEstadoSubvencionById(id);
        if (existingEstadoSubvencion.isPresent()) {
            estadoSubvencionService.updateEstadoSubvencion(id, estadoSubvencion);
            return ResponseEntity.ok("Estado subvencion con ID " + id + " actualizada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Estado subvencion con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEstadoSubvencion(@PathVariable String id) {
        Optional<EstadoSubvencion> existingEstadoSubvencion = estadoSubvencionService.getEstadoSubvencionById(id);
        if (existingEstadoSubvencion.isPresent()) {
            estadoSubvencionService.deleteEstadoSubvencion(id);
            return ResponseEntity.ok("Estado subvencion con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Estado subvencion con ID " + id + " no encontrado.");
        }
    }
}
