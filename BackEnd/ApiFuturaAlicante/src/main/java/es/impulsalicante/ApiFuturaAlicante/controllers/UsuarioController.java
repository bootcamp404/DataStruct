package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Usuario;
import es.impulsalicante.ApiFuturaAlicante.services.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {
    @Autowired
    private UsuariosService servicio;

    //GET
    @GetMapping
    public ResponseEntity<?> getUsuarios(){
        try{
            //OK
            return ResponseEntity.ok(servicio.obtenerUsuarios());
        }
        //Error no contemplado
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    //GET by id
    @GetMapping("{dni}")
    public ResponseEntity<?> getUsuarioById(@PathVariable String dni){
        try{
            Usuario user = servicio.obtenerUsuarioPorId(dni);
            //OK
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado un departamento con DNI: " + dni);
            }
            //Error no contemplado
            else{
                return ResponseEntity.badRequest().body("Error no contemplado: " + e.toString());
            }
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<?> postUsuario(@RequestBody Usuario user){
        try{
            servicio.crearUsuario(user);
            //Creado
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }
        //Error no contemplado
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Error no contemplado: " + e.toString());
        }
    }

    //PUT
    @PutMapping
    public ResponseEntity<?> putUsuario(@RequestBody Usuario user){
        try{
            Usuario user_mod = servicio.editarUsuario(user);
            //OK
            return ResponseEntity.ok(user_mod);
        }
        catch(Exception e){
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se ha encontrado el departamento con DNI: " + user.getDni());
            }
            //Error no contemplado
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error no contemplado: " + e.toString());
            }
        }
    }

    //DELETE
    @DeleteMapping("{dni}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String dni){
        try{
            servicio.eliminarUsuario(dni);
            //OK
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            //404
            if(e instanceof NoSuchElementException){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se encontró el departamento con DNI: " + dni);
            }
            //Error no contemplado
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error no contemplado: " + e.getMessage());
            }
        }
    }
}
