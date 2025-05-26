package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Rol;
import es.impulsalicante.ApiFuturaAlicante.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("roles")
public class RolController {
    @Autowired
    private RolService servicio;

    //GET
    @GetMapping
    public ResponseEntity<?> getRoles(){
        try{
            //OK
            return ResponseEntity.ok(servicio.obtenerRoles());
        }
        //Error no contemplado
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    //GET by id
    @GetMapping("{id}")
    public ResponseEntity<?> getRolById(@PathVariable Integer id){
        try{
            Rol rol = servicio.obtenerRol(id);
            //OK
            return ResponseEntity.ok(rol);
        } catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el rol con id: " + id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.toString());
            }
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<?> postRol(@RequestBody Rol rol){
        try{
            servicio.crearRol(rol);
            //Creado
            return ResponseEntity.status(HttpStatus.CREATED).body(rol);
        }
        //Error no contemplado
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Error no contemplado: " + e.toString());
        }
    }

    //PUT
    @PutMapping("{id}")
    public ResponseEntity<?> putRol(@PathVariable Integer id, @RequestBody Rol rol){
        try{
            Rol rol_mod = servicio.modificarRol(id, rol);
            //OK
            return ResponseEntity.ok(rol_mod);
        }
        catch(Exception e){
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el rol con id: " + rol.getId());
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
    public ResponseEntity<?> deleteRol(@PathVariable Integer id){
        try{
            servicio.eliminarRol(id);
            //OK
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se encontró el rol con id: " + id);
            }
            //Error no contemplado
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error no contemplado: " + e.getMessage());
            }
        }
    }
}
