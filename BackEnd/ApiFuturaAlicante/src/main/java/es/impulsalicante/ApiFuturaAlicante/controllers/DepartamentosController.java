package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("departamentos")
public class DepartamentosController {
    //lista provisional de departamentos (se cambiará en un futuro por el acceso a BD)
    private List<Departamento> departamentos = new ArrayList<>(Arrays.asList(
            new Departamento(1, "formación"),
            new Departamento(2, "administración"),
            new Departamento(3, "marketing"),
            new Departamento(4, "empleo")
    ));

    //motodos provisionales para practicar
    @GetMapping
    public ResponseEntity<List<Departamento>> getDepartamentos(){
        return ResponseEntity.ok(departamentos);
    }
    @GetMapping("{id}")
    public ResponseEntity<?> getDepartamentoById(@PathVariable int id){
        for(Departamento d : departamentos){
            if(d.getId() == id){
                return ResponseEntity.ok(d);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el departamento con id: " + id);
    }

    @PostMapping
    public ResponseEntity<String> postDepartamento(@RequestBody Departamento dep){
        if(dep.getId() > 0 || dep.getNombre().isEmpty()){
            departamentos.add(dep);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(dep.getId())
                    .toUri();

            return ResponseEntity.created(location).build();
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El formato del departamento no es correcto.");
        }
    }

    @PutMapping
    public ResponseEntity<String> putDepartamento(@RequestBody Departamento nuevo_dep){
        if(nuevo_dep.getId() > 0 || nuevo_dep.getNombre().isEmpty()){
            for(Departamento dep : departamentos){

                //Departamento encontrado
                if (dep.getId() == nuevo_dep.getId()){
                    dep.setNombre(nuevo_dep.getNombre());
                    return ResponseEntity.noContent().build();
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado el departamento con id: " + nuevo_dep.getId());
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El formato del departamento no es correcto.");
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDepartamento(@PathVariable int id){
        for(Departamento d : departamentos){
            if(d.getId() == id){
                departamentos.remove(d);
                return ResponseEntity.noContent().build();
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el departamento con id: " + id);
    }

    @PatchMapping
    public ResponseEntity<String> patchDepartamento(@RequestBody Departamento dep_mod){
        if(dep_mod.getId() > 0){
            for(Departamento dep : departamentos){

                //departamento encontrado
                if(dep.getId() == dep_mod.getId()){

                    if(dep_mod.getNombre() != null){
                        dep.setNombre(dep_mod.getNombre());
                    }

                    return ResponseEntity.noContent().build();
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró el departamento con id: "+ dep_mod.getId());
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El formato del departamento no es correcto.");
        }
    }
}
