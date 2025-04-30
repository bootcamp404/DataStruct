package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.SectorEmpresa;
import es.impulsalicante.ApiFuturaAlicante.services.SectorEmpresaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("sectores")
@CrossOrigin(origins = "*")
public class SectorEmpresaController {

    private final SectorEmpresaService service;

    public SectorEmpresaController(SectorEmpresaService service) {
        this.service = service;
    }

    @GetMapping
    public List<SectorEmpresa> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<SectorEmpresa> getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public SectorEmpresa create(@RequestBody SectorEmpresa sector) {
        return service.save(sector);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
