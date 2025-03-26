package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Sede;
import es.impulsalicante.ApiFuturaAlicante.services.SedeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sedes")
public class SedeController {

    @Autowired
    private SedeService sedeService;

    @GetMapping
    public List<Sede> getAllSedes() {
        return sedeService.getAllSedes();
    }

    @GetMapping("/{id}")
    public Optional<Sede> getSedeById(@PathVariable String id) {
        return sedeService.getSedeById(id);
    }

    @PostMapping
    public Sede createSede(@RequestBody Sede sede) {
        return sedeService.createSede(sede);
    }

    @PutMapping("/{id}")
    public Sede updateSede(@PathVariable String id, @RequestBody Sede sede) {
        return sedeService.updateSede(id, sede);
    }

    @DeleteMapping("/{id}")
    public void deleteSede(@PathVariable String id) {
        sedeService.deleteSede(id);
    }
}
