package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Sede;
import es.impulsalicante.ApiFuturaAlicante.models.Territorio;
import es.impulsalicante.ApiFuturaAlicante.services.TerritorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("territorio")
public class TerritorioController {

    @Autowired
    private TerritorioService territorioService;

    @GetMapping
    public ResponseEntity<?> getAllTerritorios() {
        try{
            return ResponseEntity.ok(territorioService.getAllTerritorios());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getTerritoriobyID(@PathVariable String id) {
        Optional<Territorio> territorio = territorioService.getTerritorioById(id);
        if (territorio.isPresent()) {
            return ResponseEntity.ok(territorio.get());
        } else {
            return ResponseEntity.status(404).body("Territorio con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createTerritorio(@RequestBody Territorio territorio) {
        try{
            Territorio nuevoTerritorio = territorioService.createTerritorio(territorio);
            return ResponseEntity.ok(nuevoTerritorio);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTerritorio(@PathVariable String id, @RequestBody Territorio territorio) {
        Optional<Territorio> existingTerritorio = territorioService.getTerritorioById(id);
        if (existingTerritorio.isPresent()) {
            territorioService.updateTerritorio(id, territorio);
            return ResponseEntity.ok("Territorio con ID " + id + " actualizado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Territorio con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTerritorio(@PathVariable String id) {
        Optional<Territorio> existingTerritorio = territorioService.getTerritorioById(id);
        if (existingTerritorio.isPresent()) {
            territorioService.deleteTerritorio(id);
            return ResponseEntity.ok("Territorio con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Territorio con ID " + id + " no encontrado.");
        }
    }
}
