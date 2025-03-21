package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Centros;
import es.impulsalicante.ApiFuturaAlicante.service.CentrosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/centros")
public class CentrosController {

    @Autowired
    private CentrosService centrosService;

    @GetMapping
    public List<Centros> getAllCentros() {
        return centrosService.getAllCentros();
    }

    @GetMapping("/{id_centro}")
    public Centros getCentroByID(@PathVariable int id_centro) {
        return centrosService.getCentrosByID(id_centro);
    }

    @PostMapping
    public Centros createCentros(@RequestBody Centros centro) {
        return centrosService.createCentros(centro);
    }

    @PutMapping("/{id_centro}")
    public Centros updateCentros(@PathVariable int id_centro, @RequestBody Centros centro) {
        return centrosService.updateCentros(id_centro, centro);
    }

    @DeleteMapping("/{id_centro}")
    public void deleteCentros(@PathVariable int id_centro) {
        centrosService.deleteCentros(id_centro);
    }
}