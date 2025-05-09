package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("proyectos")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping
    public ResponseEntity<?> getAllProyectos() {
        try{
            return ResponseEntity.ok(proyectoService.getAllProyectos());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }


    public ResponseEntity<?> getProyectoById(@PathVariable String id) {
        Optional<Proyecto> proyecto = proyectoService.getProyectoById(id);
        if (proyecto.isPresent()) {
            return ResponseEntity.ok(proyecto.get());
        } else {
            return ResponseEntity.status(404).body("Proyecto con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createProyecto(@RequestBody Proyecto proyecto) {
        try{
            Proyecto nuevoProyecto = proyectoService.createProyecto(proyecto);
            return ResponseEntity.ok(nuevoProyecto);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
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
