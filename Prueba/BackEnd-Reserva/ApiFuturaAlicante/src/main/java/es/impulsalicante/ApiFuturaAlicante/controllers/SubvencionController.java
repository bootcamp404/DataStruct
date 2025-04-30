package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Subvencion;
import es.impulsalicante.ApiFuturaAlicante.services.SubvencionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("subvenciones")
public class SubvencionController {

    @Autowired
    private SubvencionService subvencionService;

    @GetMapping
    public ResponseEntity<?> getAllSubvenciones() {
        try{
            return ResponseEntity.ok(subvencionService.getAllSubvenciones());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSubvencionById(@PathVariable String id) {
        Optional<Subvencion> subvencion = subvencionService.getSubvencionById(id);
        if (subvencion.isPresent()) {
            return ResponseEntity.ok(subvencion.get());
        } else {
            return ResponseEntity.status(404).body("Subvención con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createSubvencion(@RequestBody Subvencion subvencion) {
        try{
            Subvencion nuevaSubvencion = subvencionService.createSubvencion(subvencion);
            return ResponseEntity.ok(nuevaSubvencion);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSubvencion(@PathVariable String id, @RequestBody Subvencion subvencion) {
        Optional<Subvencion> existingSubvencion = subvencionService.getSubvencionById(id);
        if (existingSubvencion.isPresent()) {
            subvencionService.updateSubvencion(id, subvencion);
            return ResponseEntity.ok("Subvencion con ID " + id + " actualizada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Subvencion con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubvencion(@PathVariable String id) {
        Optional<Subvencion> existingSubvencion = subvencionService.getSubvencionById(id);
        if (existingSubvencion.isPresent()) {
            subvencionService.deleteSubvencion(id);
            return ResponseEntity.ok("Subvencion con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Subvencion con ID " + id + " no encontrado.");
        }
    }
}
