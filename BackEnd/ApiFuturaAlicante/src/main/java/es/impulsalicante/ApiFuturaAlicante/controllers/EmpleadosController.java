package es.impulsalicante.ApiFuturaAlicante.controllers;


import es.impulsalicante.ApiFuturaAlicante.models.Empleados;
import es.impulsalicante.ApiFuturaAlicante.services.EmpleadosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("empleados")
public class EmpleadosController {

    @Autowired
    private EmpleadosService empleadoService;


    @GetMapping
    public ResponseEntity<?> getAllEmpleados(){
        try{
            //OK
            return ResponseEntity.ok(empleadoService.getAllEmpleados());
        }
        //Error no contemplado
        catch (Exception e){
            return ResponseEntity.badRequest()
                    .body("Error no contemplado: " + e.getMessage());
        }
    }

    @GetMapping("/{dni}")
    public ResponseEntity<?> getEmpleadoByDni(@PathVariable String dni) {
        return ResponseEntity.ok(empleadoService.getEmpleadoByDni(dni));
    }

    @PostMapping
    public ResponseEntity<?> createEmpleado(@RequestBody Empleados empleado) {
        try{
            Empleados nuevoEmpleado = empleadoService.createEmpleado(empleado);
            return ResponseEntity.ok(nuevoEmpleado);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.toString());

        }
    }

    @PutMapping("/{dni}")
    public ResponseEntity<?> updateEmpleado(@PathVariable String dni, @RequestBody Empleados empleado) {
        return ResponseEntity.ok(empleadoService.updateEmpleado(dni, empleado));
    }

    @DeleteMapping("/{dni}")
    public ResponseEntity<?> deleteEmpleado(@PathVariable String dni) {
        empleadoService.deleteEmpleado(dni);
        return ResponseEntity.noContent().build();

    }
}