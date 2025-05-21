package es.impulsalicante.ApiFuturaAlicante.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ConvenioDTO {

    private String entidad;
    private String programaNombre;
    private BigDecimal importe;

    private Integer numeroActividades;
    private Integer numeroParticipantes;
    private Integer numeroHoras;

    private String lineasActuacion;
    private String anexo;

    private LocalDate fechaFirma;
    private LocalDate fechaFinVigencia;
}
