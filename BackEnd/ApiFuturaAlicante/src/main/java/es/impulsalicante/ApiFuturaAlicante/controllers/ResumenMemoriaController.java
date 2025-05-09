package es.impulsalicante.ApiFuturaAlicante.controllers;

import es.impulsalicante.ApiFuturaAlicante.dto.ResumenMemoriaDTO;
import es.impulsalicante.ApiFuturaAlicante.services.ResumenMemoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("memoria")
@CrossOrigin(origins = "*")
public class ResumenMemoriaController {

    @Autowired
    private ResumenMemoriaService resumenMemoriaService;

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


}
