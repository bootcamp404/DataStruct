package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Kpi;
import es.impulsalicante.ApiFuturaAlicante.services.KpiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("kpis")
public class KpiController {
    @Autowired
    private KpiService servicio;

    //GET
    @GetMapping
    public ResponseEntity<?> getKpis(){
        try{
            //OK
            return ResponseEntity.ok(servicio.getKpis());
        }
        //Error no contemplado
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    //GET by id
    @GetMapping("{id}")
    public ResponseEntity<?> getKpiById(@PathVariable String id){
        try{
            Kpi kpi = servicio.getKpiById(id);
            //OK
            return ResponseEntity.ok(kpi);
        } catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado un departamento con id: " + id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.toString());
            }
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<?> postKpi(@RequestBody Kpi kpi){
        try{
            servicio.postKpi(kpi);
            //Creado
            return ResponseEntity.status(HttpStatus.CREATED).body(kpi);
        }
        //Error no contemplado
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Error no contemplado: " + e.toString());
        }
    }

    //PUT
    @PutMapping("{id}")
    public ResponseEntity<?> putKpi(@PathVariable String id, @RequestBody Kpi kpi){
        try{
            Kpi kpi_mod = servicio.putKpi(id, kpi);
            //OK
            return ResponseEntity.ok(kpi_mod);
        }
        catch(Exception e){
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el departamento con id: " + kpi.getId());
            }
            //Error no contemplado
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error no contemplado: " + e.toString());
            }
        }
    }

    //DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteKpi(@PathVariable String id){
        try{
            servicio.deleteKpi(id);
            //OK
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se encontró el departamento con id: " + id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error no contemplado: " + e.getMessage());
            }
        }
    }
}
