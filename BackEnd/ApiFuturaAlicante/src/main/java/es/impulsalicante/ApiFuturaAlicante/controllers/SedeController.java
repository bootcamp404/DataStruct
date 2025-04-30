package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.services.SedeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("sede")
public class SedeController {

    @Autowired
    private SedeService sedeService;

    @GetMapping
    public ResponseEntity<?> getAllSedes() {
        try{
            return ResponseEntity.ok(sedeService.getAllSedes());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getSedebyID(@PathVariable String id) {
        Optional<Sede> sede = sedeService.getSedeById(id);
        if (sede.isPresent()) {
            return ResponseEntity.ok(sede.get());
        } else {
            return ResponseEntity.status(404).body("Sede con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createSede(@RequestBody Sede sede) {
        try{
            Sede nuevaSede = sedeService.createSede(sede);
            return ResponseEntity.ok(nuevaSede);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSede(@PathVariable String id, @RequestBody Sede sede) {
        Optional<Sede> existingsede = sedeService.getSedeById(id);
        if (existingsede.isPresent()) {
            sedeService.updateSede(id, sede);
            return ResponseEntity.ok("Sede con ID " + id + " actualizado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Sede con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletesede(@PathVariable String id) {
        Optional<Sede> existingSede = sedeService.getSedeById(id);
        if (existingSede.isPresent()) {
            sedeService.deleteSede(id);
            return ResponseEntity.ok("Sede con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Sede con ID " + id + " no encontrado.");
        }
    }
}
