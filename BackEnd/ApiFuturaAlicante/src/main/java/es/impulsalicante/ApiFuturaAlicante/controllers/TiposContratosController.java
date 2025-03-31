package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.TipoContrato;
import es.impulsalicante.ApiFuturaAlicante.services.TiposContratosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("tipos contratos")
public class TiposContratosController {
    @Autowired
    private TiposContratosService servicio;

    //GET
    @GetMapping
    public ResponseEntity<?> getTiposContratos(){
        try{
            //OK
            return ResponseEntity.ok(servicio.obtenerTiposContratos());
        }
        //Error no contemplado
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
        }
    }

    //GET by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getTipoContratoById(@PathVariable String id){
        try{
            //OK
            return ResponseEntity.ok(servicio.obtenerTipoContratoPorId(id));
        }
        catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el tipo de contrato con el id: " + id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
            }
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<?> postTipoContrato(@RequestBody TipoContrato tipo_contrato){
        try{
            //OK
            return ResponseEntity.ok(servicio.CrearTipoContrato(tipo_contrato));
        }
        //Error no contemplado
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
        }
    }

    //PUT
    @PutMapping
    public ResponseEntity<?> putTipoContrato(@RequestBody TipoContrato tipo_contrato){
        try{
            //OK
            return ResponseEntity.ok(servicio.EditarTipoContrato(tipo_contrato));
        }
        catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el tipo de contrato con el id: " + tipo_contrato.getId());
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
            }
        }
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTipoContrato(@PathVariable String id){
        try{
            servicio.eliminarTipoContrato(id);
            //OK
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el tipo de contrato con el id: " + id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
            }
        }
    }
}
