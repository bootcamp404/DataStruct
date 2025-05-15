package es.impulsalicante.ApiFuturaAlicante.dto;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;
import java.time.LocalDate;
public class ConvenioDTO {
    private String entidad;
    private String programaNombre;
    private BigDecimal importe;

    private Integer numeroActividades;
    private Integer numeroParticipantes;
    private Integer numeroHoras;

    @Column(columnDefinition = "TEXT")
    private String lineasActuacion;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    private String anexo;

    private LocalDate fechaFirma;
    private LocalDate fechaFinVigencia;

    private String cursos;
    private String indicadores;
    private String ambitosIntervencion;
    private Integer participantesHombres;
    private Integer participantesMujeres;
    private String observacionesAdicionales;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;


    public String getEntidad() {
        return entidad;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public String getProgramaNombre() {
        return programaNombre;
    }

    public void setProgramaNombre(String programaNombre) {
        this.programaNombre = programaNombre;
    }

    public BigDecimal getImporte() {
        return importe;
    }

    public void setImporte(BigDecimal importe) {
        this.importe = importe;
    }

    public Integer getNumeroActividades() {
        return numeroActividades;
    }

    public void setNumeroActividades(Integer numeroActividades) {
        this.numeroActividades = numeroActividades;
    }

    public Integer getNumeroParticipantes() {
        return numeroParticipantes;
    }

    public void setNumeroParticipantes(Integer numeroParticipantes) {
        this.numeroParticipantes = numeroParticipantes;
    }

    public Integer getNumeroHoras() {
        return numeroHoras;
    }

    public void setNumeroHoras(Integer numeroHoras) {
        this.numeroHoras = numeroHoras;
    }

    public String getLineasActuacion() {
        return lineasActuacion;
    }

    public void setLineasActuacion(String lineasActuacion) {
        this.lineasActuacion = lineasActuacion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getAnexo() {
        return anexo;
    }

    public void setAnexo(String anexo) {
        this.anexo = anexo;
    }

    public LocalDate getFechaFirma() {
        return fechaFirma;
    }

    public void setFechaFirma(LocalDate fechaFirma) {
        this.fechaFirma = fechaFirma;
    }

    public LocalDate getFechaFinVigencia() {
        return fechaFinVigencia;
    }

    public void setFechaFinVigencia(LocalDate fechaFinVigencia) {
        this.fechaFinVigencia = fechaFinVigencia;
    }

    public String getCursos() {
        return cursos;
    }

    public void setCursos(String cursos) {
        this.cursos = cursos;
    }

    public String getIndicadores() {
        return indicadores;
    }

    public void setIndicadores(String indicadores) {
        this.indicadores = indicadores;
    }

    public String getAmbitosIntervencion() {
        return ambitosIntervencion;
    }

    public void setAmbitosIntervencion(String ambitosIntervencion) {
        this.ambitosIntervencion = ambitosIntervencion;
    }

    public Integer getParticipantesHombres() {
        return participantesHombres;
    }

    public void setParticipantesHombres(Integer participantesHombres) {
        this.participantesHombres = participantesHombres;
    }

    public Integer getParticipantesMujeres() {
        return participantesMujeres;
    }

    public void setParticipantesMujeres(Integer participantesMujeres) {
        this.participantesMujeres = participantesMujeres;
    }

    public String getObservacionesAdicionales() {
        return observacionesAdicionales;
    }

    public void setObservacionesAdicionales(String observacionesAdicionales) {
        this.observacionesAdicionales = observacionesAdicionales;
    }
}
