package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import es.impulsalicante.ApiFuturaAlicante.services.DepartamentosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("departamentos")
public class DepartamentosController {

    //Inyección dependencia
    @Autowired
    private DepartamentosService servicio;

    //GET
    @GetMapping
    public ResponseEntity<?> getDepartamentos(){
        try{
            //OK
            return ResponseEntity.ok(servicio.getDepartamentos());
        }
        //Error no contemplado
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    //GET by id
    @GetMapping("{id}")
    public ResponseEntity<?> getDepartamentoById(@PathVariable int id){
        if(id >= 1){
            try{
                Departamento dep = servicio.getDepartamentoById(id);
                //OK
                return ResponseEntity.ok(dep);
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
        //Id incorrecto
        else{
            return ResponseEntity.badRequest().body("El id del departamento es incorrecto.");
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<?> postDepartamento(@RequestBody Departamento dep){
        if(dep.getId() >= 1){
            try{
                servicio.postDepartamento(dep);
                //Creado
                return ResponseEntity.status(HttpStatus.CREATED).body(dep);
            }
            //Error no contemplado
            catch (Exception e) {
                return ResponseEntity.badRequest().body("Error al conectar con la BD.");
            }
        }
        //Id incorrecto
        else{
            return ResponseEntity.badRequest().body("El id del departamento es incorrecto.");
        }
    }

    //PUT
    @PutMapping
    public ResponseEntity<?> putDepartamento(@RequestBody Departamento dep){
        if(dep.getId() > 0){
            try{
                Departamento dep_mod = servicio.putDepartamento(dep);
                //OK
                return ResponseEntity.ok(dep_mod);
            }
            catch(Exception e){
                //404
                if(e instanceof NoSuchElementException){
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("No se ha encontrado el departamento con id: " + dep.getId());
                }
                //Error no contemplado
                else{
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Error no contemplado: " + e.toString());
                }
            }
        }
        //Id no correcta
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id del departamento es incorrecto.");
        }
    }

    //DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDepartamento(@PathVariable int id){
        if(id > 0){
            try{
                servicio.deleteDepartamento(id);
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
        //Id incorrecto
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id del departamento es incorrecto.");
        }
    }
}