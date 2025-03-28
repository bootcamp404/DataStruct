package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import es.impulsalicante.ApiFuturaAlicante.services.DepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("departamentos")
public class DepartamentosController {

    //Instancia de clase
    @Autowired
    private DepartamentoService servicio;

    //GET
    @GetMapping
    public ResponseEntity<?> getDepartamentos(){
        return ResponseEntity.ok(servicio.getDepartamentos());
    }

    //GET by id
    @GetMapping("{id}")
    public ResponseEntity<?> getDepartamentoById(@PathVariable int id){

        Departamento dep = servicio.getDepartamentoById(id);
        if(id < 1){
            return ResponseEntity.badRequest().body("El id del departamento no es correcto.");
        }
        else if(dep != null){
            return ResponseEntity.ok(dep);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado un departamento con id: "+ id);
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<String> postDepartamento(@RequestBody Departamento dep){
        if(dep.getId() > 0 || dep.getNombre().isEmpty()){
            Departamento dep_creado = servicio.postDepartamento(dep);

            if(dep_creado == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al añadir en la BD.");
            }
            else{
                URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(dep.getId())
                        .toUri();

                return ResponseEntity.created(location).build();
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id del departamento no es correcto.");
        }
    }

    //PUT
    @PutMapping
    public ResponseEntity<?> putDepartamento(@RequestBody Departamento dep_mod){
        if(dep_mod.getId() > 0 || dep_mod.getNombre().isEmpty()){
            Departamento dep = servicio.putDepartamento(dep_mod);

            if(dep != null){
                return ResponseEntity.ok(dep);
            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado el departamento con id: " + dep_mod.getId());
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id del departamento no es correcto.");
        }
    }

    //DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDepartamento(@PathVariable int id){
        if(id > 0){
            Departamento dep_del = servicio.deleteDepartamento(id);

            if(dep_del != null){
                return ResponseEntity.noContent().build();
            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el departamento con id: " + id);
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id del departamento no es correcto.");
        }
    }
}
