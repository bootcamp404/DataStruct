package com.agencia_local.api.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//este codigo es solo para practicar

@RestController
public class saludoController {
    
    @GetMapping("/hola")
    public String holaMundo(){
        return "hola mundo";
    }

    @GetMapping("/holanombre/{nombre}/{edad}")
    public String holaNombre( @PathVariable String nombre, 
                              @PathVariable int edad) {
        return "hola " +  nombre + " con edad " + edad;
    }
    
}
