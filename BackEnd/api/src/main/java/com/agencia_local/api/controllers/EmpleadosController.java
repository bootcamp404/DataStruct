package com.agencia_local.api.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.agencia_local.api.models.Empleado;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
public class EmpleadosController {

    @RequestMapping("empleado/{dni}")
    public Empleado getEmpleado(@PathVariable String dni) {
        return null;
    }
    
}
