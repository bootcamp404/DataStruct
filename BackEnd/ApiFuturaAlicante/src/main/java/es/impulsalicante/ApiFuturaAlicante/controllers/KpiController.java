package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Kpi;
import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.services.KpiService;
import es.impulsalicante.ApiFuturaAlicante.services.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("kpis")
public class KpiController {

    @Autowired
    private KpiService kpiService;

    @GetMapping
    public ResponseEntity<?> getAllKpi() {
        try{
            return ResponseEntity.ok(kpiService.getAllKpi());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getProyectoById(@PathVariable String id) {
        Optional<Kpi> kpi = kpiService.getKpiById(id);
        if (kpi.isPresent()) {
            return ResponseEntity.ok(kpi.get());
        } else {
            return ResponseEntity.status(404).body("Proyecto con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createProyecto(@RequestBody Kpi kpi) {
        try{
            Kpi nuevoKpi = kpiService.createKpi(kpi);
            return ResponseEntity.ok(nuevoKpi);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateKpi(@PathVariable String id, @RequestBody Kpi kpi) {
        Optional<Kpi> existingKpi = kpiService.getKpiById(id);
        if (existingKpi.isPresent()) {
            kpiService.updateKpi(id, kpi);
            return ResponseEntity.ok("KPI con ID " + id + " actualizado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. KPI con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteKpi(@PathVariable String id) {
        Optional<Kpi> existingKpi = kpiService.getKpiById(id);
        if (existingKpi.isPresent()) {
            kpiService.deleteKpi(id);
            return ResponseEntity.ok("KPI con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. KPI con ID " + id + " no encontrado.");
        }
    }
}