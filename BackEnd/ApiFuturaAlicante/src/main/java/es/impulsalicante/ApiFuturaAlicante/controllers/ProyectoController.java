package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proyecto")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping
    public List<Proyecto> getAllProyectos() {
        return proyectoService.getAllProyectos();
    }

    @GetMapping("/{id}")
    public Optional<Proyecto> getProyectoById(@PathVariable String id) {
        return proyectoService.getProyectoById(id);
    }

    @PostMapping
    public Proyecto createProyecto(@RequestBody Proyecto proyecto) {
        return proyectoService.createProyecto(proyecto);
    }

    @PutMapping("/{id}")
    public Proyecto updateProyecto(@PathVariable String id, @RequestBody Proyecto proyecto) {
        return proyectoService.updateProyecto(id, proyecto);
    }

    @DeleteMapping("/{id}")
    public void deleteProyecto(@PathVariable String id) {
        proyectoService.deleteProyecto(id);
    }
}
