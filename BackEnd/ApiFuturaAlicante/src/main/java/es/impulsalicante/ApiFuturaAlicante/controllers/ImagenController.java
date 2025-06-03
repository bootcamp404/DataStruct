package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Imagen;
import es.impulsalicante.ApiFuturaAlicante.services.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("imagenes")
public class ImagenController {
    @Autowired
    private ImagenService imagenService;

    @GetMapping
    public List<Imagen> obtenerTodas() {
        return imagenService.obtenerTodas();
    }

    @GetMapping("/categoria/{categoria}")
    public List<Imagen> obtenerPorCategoria(@PathVariable String categoria) {
        return imagenService.obtenerPorCategoria(categoria);
    }
}
