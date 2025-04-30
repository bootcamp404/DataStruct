package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Usuario;
import es.impulsalicante.ApiFuturaAlicante.services.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    private UsuariosService usuariosService;

    @GetMapping
    public ResponseEntity<?> getAllUsuarios() {
        try{
            return ResponseEntity.ok(usuariosService.getAllUsuarios());
        }
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable String id) {
        Optional<Usuario> usuario = usuariosService.getUsuarioById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(404).body("Usuario con ID " + id + " no encontrado.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        try{
            Usuario nuevoUsuario = usuariosService.createUsuario(usuario);
            return ResponseEntity.ok(nuevoUsuario);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        Optional<Usuario> existingUsuario = usuariosService.getUsuarioById(id);
        if (existingUsuario.isPresent()) {
            usuariosService.updateUsuario(id, usuario);
            return ResponseEntity.ok("Usuario con ID " + id + " actualizado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo actualizar. Usuario con ID " + id + " no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUsuario(@PathVariable String id) {
        Optional<Usuario> existingUsuario = usuariosService.getUsuarioById(id);
        if (existingUsuario.isPresent()) {
            usuariosService.deleteUsuario(id);
            return ResponseEntity.ok("Usuario con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar. Usuario con ID " + id + " no encontrado.");
        }
    }
}
