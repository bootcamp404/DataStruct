package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Territorio;
import es.impulsalicante.ApiFuturaAlicante.services.TerritorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/territorios")
public class TerritorioController {

    @Autowired
    private TerritorioService territorioService;

    @GetMapping
    public List<Territorio> getAllTerritorios() {
        return territorioService.getAllTerritorios();
    }

    @GetMapping("/{id}")
    public Optional<Territorio> getTerritorioById(@PathVariable String id) {
        return territorioService.getTerritorioById(id);
    }

    @PostMapping
    public Territorio createTerritorio(@RequestBody Territorio territorio) {
        return territorioService.createTerritorio(territorio);
    }

    @PutMapping("/{id}")
    public Territorio updateTerritorio(@PathVariable String id, @RequestBody Territorio territorio) {
        return territorioService.updateTerritorio(id, territorio);
    }

    @DeleteMapping("/{id}")
    public void deleteTerritorio(@PathVariable String id) {
        territorioService.deleteTerritorio(id);
    }
}
