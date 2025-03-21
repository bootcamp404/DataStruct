package es.impulsalicante.ApiFuturaAlicante.controllers;


import es.impulsalicante.ApiFuturaAlicante.models.Empleados;
import es.impulsalicante.ApiFuturaAlicante.service.*;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadosController {

    @Autowired
    private EmpleadosService empleadoService;

    @GetMapping
    public List<Empleados> getAllEmpleados() {
        return empleadoService.getAllEmpleados();
    }

    @GetMapping("/{dni}")
    public Empleados getEmpleadoByDni(@PathVariable String dni) {
        return empleadoService.getEmpleadoByDni(dni);
    }

    @PostMapping
    public Empleados createEmpleado(@RequestBody Empleados empleado) {
        return empleadoService.createEmpleado(empleado);
    }

    @PutMapping("/{dni}")
    public Empleados updateEmpleado(@PathVariable String dni, @RequestBody Empleados empleado) {
        return empleadoService.updateEmpleado(dni, empleado);
    }

    @DeleteMapping("/{dni}")
    public void deleteEmpleado(@PathVariable String dni) {
        empleadoService.deleteEmpleado(dni);
    }
}