package es.impulsalicante.ApiFuturaAlicante.controllers;


import es.impulsalicante.ApiFuturaAlicante.models.IndicadorAnual;
import es.impulsalicante.ApiFuturaAlicante.services.IndicadorAnualService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("indicadores-anuales")
@CrossOrigin(origins = "*")
public class IndicadorAnualController {

    @Autowired
    private IndicadorAnualService servicio;

    @PostMapping
    public ResponseEntity<IndicadorAnual> crear(@RequestBody IndicadorAnual indicador) {
        return ResponseEntity.ok(servicio.guardar(indicador));
    }

    @GetMapping
    public ResponseEntity<List<IndicadorAnual>> obtenerPorAnioYDepto(
            @RequestParam int anio,
            @RequestParam String departamento) {
        return ResponseEntity.ok(servicio.obtenerPorAnioYDepartamento(anio, departamento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicio.eliminarPorId(id);
        return ResponseEntity.noContent().build();
    }
}
