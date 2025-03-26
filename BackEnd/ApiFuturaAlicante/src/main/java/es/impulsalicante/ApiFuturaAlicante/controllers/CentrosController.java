package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Centros;
import es.impulsalicante.ApiFuturaAlicante.services.CentrosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/centros")
public class CentroController {

    @Autowired
    private CentrosService centrosService;

    @GetMapping
    public List<Centros> getAllCentros() {
        return centrosService.getAllCentros();
    }

    @GetMapping("/{id}")
    public Optional<Centros> getCentroById(@PathVariable String id) {
        return centrosService.getCentroById(id);
    }

    @PostMapping
    public Centros createCentro(@RequestBody Centros centro) {
        return centrosService.createCentro(centro);
    }

    @PutMapping("/{id}")
    public Centros updateCentro(@PathVariable String id, @RequestBody Centros centro) {
        return centrosService.updateCentro(id, centro);
    }

    @DeleteMapping("/{id}")
    public void deleteCentro(@PathVariable String id) {
        centrosService.deleteCentro(id);
    }
}
