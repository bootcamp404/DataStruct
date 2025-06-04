package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Imagen;
import es.impulsalicante.ApiFuturaAlicante.services.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("imagenes")
@CrossOrigin(origins = "*")
public class ImagenController {

    @Autowired
    private ImagenService imagenService;

    @GetMapping
    public ResponseEntity<List<Imagen>> obtenerTodas() {
        List<Imagen> imagenes = imagenService.obtenerTodas();
        return ResponseEntity.ok(imagenes);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Imagen>> obtenerPorCategoria(@PathVariable String categoria) {
        List<Imagen> imagenes = imagenService.obtenerPorCategoria(categoria);
        return ResponseEntity.ok(imagenes);
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<String>> obtenerCategorias() {
        List<String> categorias = imagenService.obtenerTodas()
                .stream()
                .map(Imagen::getCategoria)
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/agrupadas")
    public ResponseEntity<Map<String, List<Imagen>>> obtenerImagenesAgrupadas() {
        Map<String, List<Imagen>> imagenesAgrupadas = imagenService.obtenerTodas()
                .stream()
                .collect(Collectors.groupingBy(Imagen::getCategoria));
        return ResponseEntity.ok(imagenesAgrupadas);
    }

    @PostMapping
    public ResponseEntity<Imagen> crearImagen(@RequestBody Imagen imagen) {
        Imagen nuevaImagen = imagenService.guardar(imagen);
        return ResponseEntity.ok(nuevaImagen);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarImagen(@PathVariable Long id) {
        imagenService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
