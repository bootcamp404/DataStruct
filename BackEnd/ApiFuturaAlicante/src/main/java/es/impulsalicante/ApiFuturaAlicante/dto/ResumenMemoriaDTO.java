package es.impulsalicante.ApiFuturaAlicante.dto;

import java.math.BigDecimal;
import java.util.List;

public class ResumenMemoriaDTO {

    private Integer anio;

    // Agencia Local en Cifras
    private BigDecimal presupuestoTotal;
    private BigDecimal presupuestoEjecutado;
    private Double porcentajeEjecucion;
    private Integer altasDemandantes;
    private Integer accionesOrientacion;
    private Integer cursos;
    private Integer pildorasFormativas;

    private Integer personasOrientadas;
    private Integer actividadesFormacion;
    private Integer participantesFormacion;
    private Integer contrataciones;
    private Integer asesoramientos;
    private Integer ayudasEmpresas;
    private BigDecimal importeAyudas;
    private List<ServicioDTO> servicios;

    private Integer demandantesRegistrados;
    private Integer inscripcionesOfertas;
    private Integer perceptoresPrestacion;
    private Integer colectivosVulnerables;
    private BigDecimal ayudasLaboratorio;
    private int personasLaboratorio;
    private String descripcionLaboratorio;
    private List<String> objetivosLaboratorio;

    // Datos perfil demandantes
    private Integer totalNuevosDemandantes;
    private Integer mujeresMayores45;
    private Integer mujeresEntre30y45;
    private Integer mujeresMenores30;
    private Integer hombresMayores45;
    private Integer hombresEntre30y45;
    private Integer hombresMenores30;
    private BigDecimal horasOrientacion;
    private BigDecimal horasFormacion;
    private Integer ofertasEmpleo;
    private Integer puestosTrabajo;
    private BigDecimal importeAyudasEmpresas;
    private int areasIndustrialesExistentes;
    private int areasIndustrialesNuevas;
    private long superficieIndustrialTotal;
    private int empleosEnIndustrial;
    private BigDecimal facturacionIndustrial;
    private BigDecimal ayudasObservatorio;
    private Integer personasObservatorio;
    private String descripcionObservatorio;
    private List<String> objetivosObservatorio;

    private int empresasCreadas;


    // Sub-resúmenes
    private List<ResumenDepartamentoDTO> resumenDepartamentos;

    // Getters y Setters

    public BigDecimal getAyudasLaboratorio() {
        return ayudasLaboratorio;
    }

    public void setAyudasLaboratorio(BigDecimal ayudasLaboratorio) {
        this.ayudasLaboratorio = ayudasLaboratorio;
    }

    public int getPersonasLaboratorio() {
        return personasLaboratorio;
    }

    public void setPersonasLaboratorio(int personasLaboratorio) {
        this.personasLaboratorio = personasLaboratorio;
    }

    public String getDescripcionLaboratorio() {
        return descripcionLaboratorio;
    }

    public void setDescripcionLaboratorio(String descripcionLaboratorio) {
        this.descripcionLaboratorio = descripcionLaboratorio;
    }

    public List<String> getObjetivosLaboratorio() {
        return objetivosLaboratorio;
    }

    public void setObjetivosLaboratorio(List<String> objetivosLaboratorio) {
        this.objetivosLaboratorio = objetivosLaboratorio;
    }

    public BigDecimal getAyudasObservatorio() { return ayudasObservatorio; }
    public void setAyudasObservatorio(BigDecimal v) { this.ayudasObservatorio = v; }
    public Integer getPersonasObservatorio() { return personasObservatorio; }
    public void setPersonasObservatorio(Integer v) { this.personasObservatorio = v; }
    public String getDescripcionObservatorio() { return descripcionObservatorio; }
    public void setDescripcionObservatorio(String v) { this.descripcionObservatorio = v; }
    public List<String> getObjetivosObservatorio() { return objetivosObservatorio; }
    public void setObjetivosObservatorio(List<String> v) { this.objetivosObservatorio = v; }
    public BigDecimal getFacturacionIndustrial() {
        return facturacionIndustrial;
    }

    public int getAreasIndustrialesExistentes() {
        return areasIndustrialesExistentes;
    }

    public int getAreasIndustrialesNuevas() {
        return areasIndustrialesNuevas;
    }

    public int getEmpleosEnIndustrial() {
        return empleosEnIndustrial;
    }

    public long getSuperficieIndustrialTotal() {
        return superficieIndustrialTotal;
    }

    public void setAreasIndustrialesExistentes(int areasIndustrialesExistentes) {
        this.areasIndustrialesExistentes = areasIndustrialesExistentes;
    }

    public void setEmpleosEnIndustrial(int empleosEnIndustrial) {
        this.empleosEnIndustrial = empleosEnIndustrial;
    }

    public void setFacturacionIndustrial(BigDecimal facturacionIndustrial) {
        this.facturacionIndustrial = facturacionIndustrial;
    }

    public void setAreasIndustrialesNuevas(int areasIndustrialesNuevas) {
        this.areasIndustrialesNuevas = areasIndustrialesNuevas;
    }

    public void setSuperficieIndustrialTotal(long superficieIndustrialTotal) {
        this.superficieIndustrialTotal = superficieIndustrialTotal;
    }

    public int getEmpresasCreadas() {
        return empresasCreadas;
    }

    public void setEmpresasCreadas(int empresasCreadas) {
        this.empresasCreadas = empresasCreadas;
    }

    public Integer getColectivosVulnerables() {
        return colectivosVulnerables;
    }

    public Integer getDemandantesRegistrados() {
        return demandantesRegistrados;
    }

    public Integer getHombresEntre30y45() {
        return hombresEntre30y45;
    }

    public Integer getHombresMayores45() {
        return hombresMayores45;
    }

    public Integer getHombresMenores30() {
        return hombresMenores30;
    }

    public Integer getInscripcionesOfertas() {
        return inscripcionesOfertas;
    }

    public Integer getMujeresEntre30y45() {
        return mujeresEntre30y45;
    }

    public Integer getMujeresMayores45() {
        return mujeresMayores45;
    }

    public Integer getMujeresMenores30() {
        return mujeresMenores30;
    }

    public Integer getPerceptoresPrestacion() {
        return perceptoresPrestacion;
    }

    public Integer getTotalNuevosDemandantes() {
        return totalNuevosDemandantes;
    }

    public void setColectivosVulnerables(Integer colectivosVulnerables) {
        this.colectivosVulnerables = colectivosVulnerables;
    }

    public void setDemandantesRegistrados(Integer demandantesRegistrados) {
        this.demandantesRegistrados = demandantesRegistrados;
    }

    public void setHombresEntre30y45(Integer hombresEntre30y45) {
        this.hombresEntre30y45 = hombresEntre30y45;
    }

    public void setInscripcionesOfertas(Integer inscripcionesOfertas) {
        this.inscripcionesOfertas = inscripcionesOfertas;
    }

    public void setHombresMayores45(Integer hombresMayores45) {
        this.hombresMayores45 = hombresMayores45;
    }

    public void setHombresMenores30(Integer hombresMenores30) {
        this.hombresMenores30 = hombresMenores30;
    }

    public void setMujeresMayores45(Integer mujeresMayores45) {
        this.mujeresMayores45 = mujeresMayores45;
    }

    public void setMujeresEntre30y45(Integer mujeresEntre30y45) {
        this.mujeresEntre30y45 = mujeresEntre30y45;
    }

    public void setMujeresMenores30(Integer mujeresMenores30) {
        this.mujeresMenores30 = mujeresMenores30;
    }

    public void setPerceptoresPrestacion(Integer perceptoresPrestacion) {
        this.perceptoresPrestacion = perceptoresPrestacion;
    }

    public void setTotalNuevosDemandantes(Integer totalNuevosDemandantes) {
        this.totalNuevosDemandantes = totalNuevosDemandantes;
    }

    public BigDecimal getImporteAyudasEmpresas() {
        return importeAyudasEmpresas;
    }

    public List<ServicioDTO> getServicios() {
        return servicios;
    }

    public void setServicios(List<ServicioDTO> servicios) {
        this.servicios = servicios;
    }

    public void setImporteAyudasEmpresas(BigDecimal importeAyudasEmpresas) {
        this.importeAyudasEmpresas = importeAyudasEmpresas;
    }




    public Integer getPuestosTrabajo() {
        return puestosTrabajo;
    }

    public BigDecimal getHorasFormacion() {
        return horasFormacion;
    }

    public BigDecimal getHorasOrientacion() {
        return horasOrientacion;
    }

    public Integer getOfertasEmpleo() {
        return ofertasEmpleo;
    }
    public Integer getAltasDemandantes() {
        return altasDemandantes;
    }

    public void setAltasDemandantes(Integer altasDemandantes) {
        this.altasDemandantes = altasDemandantes;
    }

    public Integer getAccionesOrientacion() {
        return accionesOrientacion;
    }

    public void setAccionesOrientacion(Integer accionesOrientacion) {
        this.accionesOrientacion = accionesOrientacion;
    }

    public Integer getCursos() {
        return cursos;
    }

    public void setCursos(Integer cursos) {
        this.cursos = cursos;
    }

    public Integer getPildorasFormativas() {
        return pildorasFormativas;
    }

    public void setPildorasFormativas(Integer pildorasFormativas) {
        this.pildorasFormativas = pildorasFormativas;
    }

    public void setPuestosTrabajo(Integer puestosTrabajo) {
        this.puestosTrabajo = puestosTrabajo;
    }

    public void setHorasOrientacion(BigDecimal horasOrientacion) {
        this.horasOrientacion = horasOrientacion;
    }

    public void setHorasFormacion(BigDecimal horasFormacion) {
        this.horasFormacion = horasFormacion;
    }

    public void setOfertasEmpleo(Integer ofertasEmpleo) {
        this.ofertasEmpleo = ofertasEmpleo;
    }

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
