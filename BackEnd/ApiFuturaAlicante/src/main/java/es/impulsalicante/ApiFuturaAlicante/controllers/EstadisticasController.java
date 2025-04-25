package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.dto.EstadisticasDTO;
import es.impulsalicante.ApiFuturaAlicante.services.EstadisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("estadisticas")
public class EstadisticasController {

    @Autowired
    private EstadisticasService estadisticasService;

    @GetMapping
    public EstadisticasDTO getEstadisticas(@RequestParam int year) {
        return estadisticasService.getEstadisticas(year);
    }
}
