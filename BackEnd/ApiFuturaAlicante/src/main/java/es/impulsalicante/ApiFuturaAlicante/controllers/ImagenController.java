package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.models.Imagen;
import es.impulsalicante.ApiFuturaAlicante.services.ImagenService;
import es.impulsalicante.ApiFuturaAlicante.dto.PredefinedImageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("imagenes")
@CrossOrigin(origins = "*")
public class ImagenController {

    @Autowired
    private ImagenService imagenService;

    @GetMapping
    public ResponseEntity<List<Imagen>> obtenerTodas() {
        return ResponseEntity.ok(imagenService.obtenerTodas());
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Imagen>> obtenerPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(imagenService.obtenerPorCategoria(categoria));
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<String>> obtenerCategorias() {
        return ResponseEntity.ok(imagenService.getCategorias());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Imagen>> buscarImagenes(
            @RequestParam(required = false) String termino,
            @RequestParam(required = false) String categoria) {
        return ResponseEntity.ok(imagenService.buscarImagenes(termino, categoria));
    }

    @GetMapping("/predefinidas")
    public ResponseEntity<List<PredefinedImageDTO>> obtenerImagenesPredefinidas() {
        return ResponseEntity.ok(imagenService.getPredefinedImages());
    }

    @PostMapping
    public ResponseEntity<Imagen> guardarImagen(@RequestBody Imagen imagen) {
        return ResponseEntity.ok(imagenService.guardar(imagen));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarImagen(@PathVariable Long id) {
        imagenService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}