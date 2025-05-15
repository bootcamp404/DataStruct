package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "convenio")
public class Convenio {

    @Id
    private String id;

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


    public void setId(String id) {
        this.id = id;
    }

    public void setImporte(BigDecimal importe) {
        this.importe = importe;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public void setNumeroActividades(Integer numeroActividades) {
        this.numeroActividades = numeroActividades;
    }

    public void setNumeroHoras(Integer numeroHoras) {
        this.numeroHoras = numeroHoras;
    }

    public void setNumeroParticipantes(Integer numeroParticipantes) {
        this.numeroParticipantes = numeroParticipantes;
    }

    public void setLineasActuacion(String lineasActuacion) {
        this.lineasActuacion = lineasActuacion;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
    public String getCursos() { return cursos; }
    public void setCursos(String cursos) { this.cursos = cursos; }

    public String getIndicadores() { return indicadores; }
    public void setIndicadores(String indicadores) { this.indicadores = indicadores; }

    public String getAmbitosIntervencion() { return ambitosIntervencion; }
    public void setAmbitosIntervencion(String ambitosIntervencion) { this.ambitosIntervencion = ambitosIntervencion; }

    public Integer getParticipantesHombres() { return participantesHombres; }
    public void setParticipantesHombres(Integer participantesHombres) { this.participantesHombres = participantesHombres; }

    public Integer getParticipantesMujeres() { return participantesMujeres; }
    public void setParticipantesMujeres(Integer participantesMujeres) { this.participantesMujeres = participantesMujeres; }

    public String getObservacionesAdicionales() { return observacionesAdicionales; }
    public void setObservacionesAdicionales(String observacionesAdicionales) { this.observacionesAdicionales = observacionesAdicionales; }
    public void setAnexo(String anexo) {
        this.anexo = anexo;
    }

    public void setProgramaNombre(String programaNombre) {
        this.programaNombre = programaNombre;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public void setFechaFinVigencia(LocalDate fechaFinVigencia) {
        this.fechaFinVigencia = fechaFinVigencia;
    }

    public void setFechaFirma(LocalDate fechaFirma) {
        this.fechaFirma = fechaFirma;
    }

    public String getEntidad() {
        return entidad;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public String getId() {
        return id;
    }

    public BigDecimal getImporte() {
        return importe;
    }

    public Integer getNumeroActividades() {
        return numeroActividades;
    }

    public Integer getNumeroHoras() {
        return numeroHoras;
    }

    public Integer getNumeroParticipantes() {
        return numeroParticipantes;
    }

    public String getAnexo() {
        return anexo;
    }

    public String getLineasActuacion() {
        return lineasActuacion;
    }

    public LocalDate getFechaFirma() {
        return fechaFirma;
    }

    public LocalDate getFechaFinVigencia() {
        return fechaFinVigencia;
    }

    public String getProgramaNombre() {
        return programaNombre;
    }

}
