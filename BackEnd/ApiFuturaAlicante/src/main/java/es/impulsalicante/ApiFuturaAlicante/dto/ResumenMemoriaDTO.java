package es.impulsalicante.ApiFuturaAlicante.dto;

import java.math.BigDecimal;
import java.util.List;

public class ResumenMemoriaDTO {

    private Integer anio;

    // Agencia Local en Cifras
    private BigDecimal presupuestoTotal;
    private BigDecimal presupuestoEjecutado;
    private Double porcentajeEjecucion;

    private Integer personasOrientadas;
    private Integer actividadesFormacion;
    private Integer participantesFormacion;
    private Integer contrataciones;
    private Integer empresasCreadas;
    private Integer asesoramientos;
    private Integer ayudasEmpresas;
    private BigDecimal importeAyudas;

    // Sub-resúmenes
    private List<ResumenDepartamentoDTO> resumenDepartamentos;

    // Getters y Setters

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public BigDecimal getPresupuestoTotal() {
        return presupuestoTotal;
    }

    public void setPresupuestoTotal(BigDecimal presupuestoTotal) {
        this.presupuestoTotal = presupuestoTotal;
    }

    public BigDecimal getPresupuestoEjecutado() {
        return presupuestoEjecutado;
    }

    public void setPresupuestoEjecutado(BigDecimal presupuestoEjecutado) {
        this.presupuestoEjecutado = presupuestoEjecutado;
    }

    public Double getPorcentajeEjecucion() {
        return porcentajeEjecucion;
    }

    public void setPorcentajeEjecucion(Double porcentajeEjecucion) {
        this.porcentajeEjecucion = porcentajeEjecucion;
    }

    public Integer getPersonasOrientadas() {
        return personasOrientadas;
    }

    public void setPersonasOrientadas(Integer personasOrientadas) {
        this.personasOrientadas = personasOrientadas;
    }

    public Integer getActividadesFormacion() {
        return actividadesFormacion;
    }

    public void setActividadesFormacion(Integer actividadesFormacion) {
        this.actividadesFormacion = actividadesFormacion;
    }

    public Integer getParticipantesFormacion() {
        return participantesFormacion;
    }

    public void setParticipantesFormacion(Integer participantesFormacion) {
        this.participantesFormacion = participantesFormacion;
    }

    public Integer getContrataciones() {
        return contrataciones;
    }

    public void setContrataciones(Integer contrataciones) {
        this.contrataciones = contrataciones;
    }

    public Integer getEmpresasCreadas() {
        return empresasCreadas;
    }

    public void setEmpresasCreadas(Integer empresasCreadas) {
        this.empresasCreadas = empresasCreadas;
    }

    public Integer getAsesoramientos() {
        return asesoramientos;
    }

    public void setAsesoramientos(Integer asesoramientos) {
        this.asesoramientos = asesoramientos;
    }

    public Integer getAyudasEmpresas() {
        return ayudasEmpresas;
    }

    public void setAyudasEmpresas(Integer ayudasEmpresas) {
        this.ayudasEmpresas = ayudasEmpresas;
    }

    public BigDecimal getImporteAyudas() {
        return importeAyudas;
    }

    public void setImporteAyudas(BigDecimal importeAyudas) {
        this.importeAyudas = importeAyudas;
    }

    public List<ResumenDepartamentoDTO> getResumenDepartamentos() {
        return resumenDepartamentos;
    }

    public void setResumenDepartamentos(List<ResumenDepartamentoDTO> resumenDepartamentos) {
        this.resumenDepartamentos = resumenDepartamentos;
    }
}
