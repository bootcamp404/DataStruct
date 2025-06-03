package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.dto.PdfPersonalizadoRequest;
import es.impulsalicante.ApiFuturaAlicante.dto.PrevisualizacionDTO;
import es.impulsalicante.ApiFuturaAlicante.dto.ResumenMemoriaDTO;
import es.impulsalicante.ApiFuturaAlicante.models.Imagen;
import es.impulsalicante.ApiFuturaAlicante.services.ImagenService;
import es.impulsalicante.ApiFuturaAlicante.services.ResumenMemoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("memoria")
@CrossOrigin(origins = "*")
public class ResumenMemoriaController {

    @Autowired
    private ResumenMemoriaService resumenMemoriaService;

    @Autowired
    private ImagenService imagenService;

    // ✅ Devolver datos en formato JSON
    @GetMapping("/resumen/{anio}")
    public ResponseEntity<ResumenMemoriaDTO> getResumen(@PathVariable Integer anio) {
        ResumenMemoriaDTO resumen = resumenMemoriaService.getResumenPorAnio(anio);
        return ResponseEntity.ok(resumen);
    }

    @GetMapping("/pdf/{anio}")
    public ResponseEntity<byte[]> getResumenPdf(@PathVariable Integer anio) throws IOException {
        byte[] pdfBytes = resumenMemoriaService.generarPdf(anio);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition
                .inline()
                .filename("Memoria_Anual_" + anio + ".pdf")
                .build());

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/previsualizacion/{anio}")
    public ResponseEntity<PrevisualizacionDTO> getPrevisualizacion(@PathVariable Integer anio) {
        ResumenMemoriaDTO resumen = resumenMemoriaService.getResumenPorAnio(anio);
        List<Imagen> imagenes = imagenService.obtenerTodas();

        PrevisualizacionDTO dto = new PrevisualizacionDTO();
        dto.setResumen(resumen);
        dto.setImagenes(imagenes);

        return ResponseEntity.ok(dto);
    }

    @PostMapping("/uploads")
    public ResponseEntity<?> uploadImages(@RequestParam("images") MultipartFile[] files) {
        List<String> imageUrls = new ArrayList<>();
        List<Imagen> imagenesGuardadas = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                String fileName = file.getOriginalFilename();
                String uploadDir = "uploads";
                Path uploadPath = Paths.get(uploadDir);

                // Crear directorio si no existe
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String filePath = uploadDir + "/" + fileName;
                Path path = Paths.get(filePath);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                String imageUrl = "http://localhost:8080/alicanteFutura/api/v1/uploads/" + fileName;
                imageUrls.add(imageUrl);

                // Guardar en tu tabla IMAGEN existente
                Imagen imagen = new Imagen();
                imagen.setNombre(fileName);
                imagen.setUrl(imageUrl);
                imagen.setCategoria("memoria");

                // Usar tu ImagenService existente
                imagenService.guardar(imagen); // Necesitas añadir este método
                imagenesGuardadas.add(imagen);

            } catch (IOException e) {
                return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
            }
        }

        return ResponseEntity.ok(Map.of(
                "imageUrls", imageUrls,
                "imagenes", imagenesGuardadas
        ));
    }


    @PostMapping("/pdf/{anio}")
    public ResponseEntity<byte[]> generarPdfPersonalizado(
            @PathVariable Integer anio,
            @RequestBody PdfPersonalizadoRequest request) throws IOException {

        byte[] pdfBytes = resumenMemoriaService.generarPdfPersonalizado(anio, request.getImageMapping());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition
                .inline()
                .filename("Memoria_Anual_Personalizada_" + anio + ".pdf")
                .build());

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }



}
