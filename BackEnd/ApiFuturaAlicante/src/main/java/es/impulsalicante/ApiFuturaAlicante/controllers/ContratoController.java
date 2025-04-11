package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Contrato;
import es.impulsalicante.ApiFuturaAlicante.services.ContratosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("contratos")
public class ContratoController {
    @Autowired
    private ContratosService servicio;

    //GET
    @GetMapping
    public ResponseEntity<?> getContratos(){
        try{
            //OK
            return ResponseEntity.ok(servicio.obtenerContratos());
        }
        //Error no contemplado
        catch(Exception e){
            return ResponseEntity.badRequest().body("Error no contemplado: "+ e.getMessage());
        }
    }

    //GET by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getContrato(@PathVariable String id){
        try{
            //OK
            return ResponseEntity.ok(servicio.obtenerContratoPorId(id));
        }
        catch (Exception e) {
            //404
            if (e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el contrato con id: "+ id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
            }
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<?> postContrato(@RequestBody Contrato contrato){
        try{
            //OK
            return ResponseEntity.status(HttpStatus.CREATED).body(servicio.CrearContrato(contrato));
        }
        catch (Exception e) {
            //Error no contemplado
            return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
        }
    }

    //PUT
    @PutMapping("{id}")
    public ResponseEntity<?> putContrato(String id, @RequestBody Contrato contrato){
        try{
            //OK
            return ResponseEntity.ok(servicio.EditarContrato(id, contrato));
        }
        catch (Exception e) {
            //404
            if (e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el contrato con id: "+ contrato.getId());
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
            }
        }
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContrato(@PathVariable String id){
        try{
            servicio.EliminarContrato(id);
            //OK
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            //404
            if (e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el contrato con id: "+ id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.getMessage());
            }
        }
    }
}
