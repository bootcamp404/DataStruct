package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Valoracion;
import es.impulsalicante.ApiFuturaAlicante.services.ValoracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("valoraciones")
public class ValoracionController {

    @Autowired
    private ValoracionService valoracionService;

    @GetMapping
    public ResponseEntity<?> getAllValoraciones() {
        try{
            return ResponseEntity.ok(valoracionService.getAllValoraciones());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getValoracionByID(@PathVariable String id) {
        Optional<Valoracion> valoracion = valoracionService.getValoracionById(id);
        if (valoracion.isPresent()) {
            return ResponseEntity.ok(valoracion.get());
        } else {
            return ResponseEntity.status(404).body("Sede con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createValoracion(@RequestBody Valoracion valoracion) {
        try{
            Valoracion nuevaValoracion = valoracionService.createValoracion(valoracion);
            return ResponseEntity.ok(nuevaValoracion);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateValoracion(@PathVariable String id, @RequestBody Valoracion valoracion) {
        Optional<Valoracion> existingsede = valoracionService.getValoracionById(id);
        if (existingsede.isPresent()) {
            valoracionService.updateValoracion(id, valoracion);
            return ResponseEntity.ok("Valoración con ID " + id + " actualizada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Valoración con ID " + id + " no encontrada.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteValoracion(@PathVariable String id) {
        Optional<Valoracion> existingValoracion = valoracionService.getValoracionById(id);
        if (existingValoracion.isPresent()) {
            valoracionService.deleteValoracion(id);
            return ResponseEntity.ok("Valoración con ID " + id + " eliminada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Valoración con ID " + id + " no encontrada.");
        }
    }
}
