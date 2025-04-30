package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Empresa;
import es.impulsalicante.ApiFuturaAlicante.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public ResponseEntity<?> getAllEmpresas() {
        try{
            return ResponseEntity.ok(empresaService.getAllEmpresas());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmpresaById(@PathVariable String id) {
        Optional<Empresa> empresa = empresaService.getEmpresaById(id);
        if (empresa.isPresent()) {
            return ResponseEntity.ok(empresa.get());
        } else {
            return ResponseEntity.status(404).body("Empresa con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createEmpresa(@RequestBody Empresa empresa) {
        try{
            Empresa nuevaEmpresa = empresaService.createEmpresa(empresa);
            return ResponseEntity.ok(nuevaEmpresa);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateEmpresa(@PathVariable String id, @RequestBody Empresa empresa) {
        Optional<Empresa> existingEmpresa = empresaService.getEmpresaById(id);
        if (existingEmpresa.isPresent()) {
            empresaService.updateEmpresa(id, empresa);
            return ResponseEntity.ok("Empresa con ID " + id + " actualizada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Empresa con ID " + id + " no encontrada.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmpresa(@PathVariable String id) {
        Optional<Empresa> existingEmpresa = empresaService.getEmpresaById(id);
        if (existingEmpresa.isPresent()) {
            empresaService.deleteEmpresa(id);
            return ResponseEntity.ok("Empresa con ID " + id + " eliminada correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Empresa con ID " + id + " no encontrada.");
        }
    }
}
