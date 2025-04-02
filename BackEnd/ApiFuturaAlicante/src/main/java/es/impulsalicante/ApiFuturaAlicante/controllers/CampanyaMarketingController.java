package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.CampanyaMarketing;
import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.services.CampanyaMarketingService;
import es.impulsalicante.ApiFuturaAlicante.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("campanyas-marketing")
public class CampanyaMarketingController {

    @Autowired
    private CampanyaMarketingService campanyaMarketingService;

    @GetMapping
    public ResponseEntity<?> getAllCampanyas() {
        try{
            return ResponseEntity.ok(campanyaMarketingService.getAllCampanyas());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCampanyaoById(@PathVariable String id) {
        Optional<CampanyaMarketing> campanyaMarketing = campanyaMarketingService.getCampanyaById(id);
        if (campanyaMarketing.isPresent()) {
            return ResponseEntity.ok(campanyaMarketing.get());
        } else {
            return ResponseEntity.status(404).body("Campaña con ID " + id + " no encontrada.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createCampanya(@RequestBody CampanyaMarketing campanyaMarketing) {
        try{
            CampanyaMarketing nuevaCampanya = campanyaMarketingService.createCampanya(campanyaMarketing);
            return ResponseEntity.ok(nuevaCampanya);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCampanya(@PathVariable String id, @RequestBody CampanyaMarketing campanyaMarketing) {
        Optional<CampanyaMarketing> existingCampanya = campanyaMarketingService.getCampanyaById(id);
        if (existingCampanya.isPresent()) {
            campanyaMarketingService.updateCampanya(id, campanyaMarketing);
            return ResponseEntity.ok("Campaña con ID " + id + " actualizada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Campaña con ID " + id + " no encontrada.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProyecto(@PathVariable String id) {
        Optional<CampanyaMarketing> existingCampanya = campanyaMarketingService.getCampanyaById(id);
        if (existingCampanya.isPresent()) {
            campanyaMarketingService.deleteCampanya(id);
            return ResponseEntity.ok("Campaña con ID " + id + " eliminada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Campaña con ID " + id + " no encontrada.");
        }
    }
}
