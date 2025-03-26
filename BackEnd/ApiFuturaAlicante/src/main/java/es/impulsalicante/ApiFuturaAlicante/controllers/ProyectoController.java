package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proyecto")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping
    public ResponseEntity<List<Proyecto>> getAllProyectos() {
        List<Proyecto> proyectos = proyectoService.getAllProyectos();
        if (proyectos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(proyectos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProyectoById(@PathVariable String id) {
        Optional<Proyecto> proyecto = proyectoService.getProyectoById(id);
        if (proyecto.isPresent()) {
            return ResponseEntity.ok(proyecto.get());
        } else {
            return ResponseEntity.status(404).body("Proyecto con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<String> createProyecto(@RequestBody Proyecto proyecto) {
        Proyecto nuevoProyecto = proyectoService.createProyecto(proyecto);
        return ResponseEntity.ok("Proyecto creado con éxito. ID: " + nuevoProyecto.getId_proyecto());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProyecto(@PathVariable String id, @RequestBody Proyecto proyecto) {
        Optional<Proyecto> existingProyecto = proyectoService.getProyectoById(id);
        if (existingProyecto.isPresent()) {
            proyectoService.updateProyecto(id, proyecto);
            return ResponseEntity.ok("Proyecto con ID " + id + " actualizado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Proyecto con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProyecto(@PathVariable String id) {
        Optional<Proyecto> existingProyecto = proyectoService.getProyectoById(id);
        if (existingProyecto.isPresent()) {
            proyectoService.deleteProyecto(id);
            return ResponseEntity.ok("Proyecto con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Proyecto con ID " + id + " no encontrado.");
        }
    }
}
