package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Centros;
import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.services.CentrosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("centros")
public class CentrosController {

    @Autowired
    private CentrosService centrosService;

    @GetMapping
    public ResponseEntity<?> getAllCentros() {
        try{
            return ResponseEntity.ok(centrosService.getAllCentros());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCentrobyID(@PathVariable String id) {
        Optional<Centros> centros = centrosService.getCentroById(id);
        if (centros.isPresent()) {
            return ResponseEntity.ok(centros.get());
        } else {
            return ResponseEntity.status(404).body("Proyecto con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createCentro(@RequestBody Centros centros) {
        try{
            Centros nuevoCentro = centrosService.createCentro(centros);
            return ResponseEntity.ok(nuevoCentro);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCentro(@PathVariable String id, @RequestBody Centros centros) {
        Optional<Centros> existingCentro = centrosService.getCentroById(id);
        if (existingCentro.isPresent()) {
            centrosService.updateCentro(id, centros);
            return ResponseEntity.ok("Proyecto con ID " + id + " actualizado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Centro con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCentros(@PathVariable String id) {
        Optional<Centros> existingCentro = centrosService.getCentroById(id);
        if (existingCentro.isPresent()) {
            centrosService.deleteCentro(id);
            return ResponseEntity.ok("Centro con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Centro con ID " + id + " no encontrado.");
        }
    }
}
