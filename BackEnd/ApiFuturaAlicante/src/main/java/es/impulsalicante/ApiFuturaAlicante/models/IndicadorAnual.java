package es.impulsalicante.ApiFuturaAlicante.models;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="indicadores_anuales")
public class IndicadorAnual {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(nullable = false)
    private int anio;

    @Column(nullable = false)
    private String departamento;

    private int personasAtendidas;
    private int contrataciones;
    private int empresasCreadas;
    private int actividadesFormacion;
    private int participantesFormacion;
    private int horasFormacion;
    private int asesoramientos;
    @Column(name="ayudas_observatorio")
    private Integer ayudasObservatorio;


    private Integer puestosTrabajo;
    private BigDecimal ayudasEntidades;
    private Integer ofertasEmpleo;
    @Column
    private int horasOrientacion;

    private Integer altasDemandantes;
    private Integer accionesOrientacion;
    private Integer pildorasFormativas;


    @Column(precision = 12, scale = 2)
    private BigDecimal ayudasEmpresas;

    @Column(precision = 12, scale = 2)



    private LocalDateTime createdAt = LocalDateTime.now();

    public Integer getAyudasObservatorio() { return ayudasObservatorio; }
    public void setAyudasObservatorio(Integer ayudasObservatorio) {
        this.ayudasObservatorio = ayudasObservatorio;
    }
    public Integer getOfertasEmpleo() {
        return ofertasEmpleo;
    }

    public int getHorasOrientacion() {
        return horasOrientacion;
    }

    public void setHorasOrientacion(int horasOrientacion) {
        this.horasOrientacion = horasOrientacion;
    }
    public void setOfertasEmpleo(Integer ofertasEmpleo) {
        this.ofertasEmpleo = ofertasEmpleo;
    }
    public Integer getPuestosTrabajo() {
        return puestosTrabajo;
    }

    public void setPuestosTrabajo(Integer puestosTrabajo) {
        this.puestosTrabajo = puestosTrabajo;
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

    public Integer getPildorasFormativas() {
        return pildorasFormativas;
    }

    public void setPildorasFormativas(Integer pildorasFormativas) {
        this.pildorasFormativas = pildorasFormativas;
    }

    public int getAnio() {
        return anio;
    }

    public int getActividadesFormacion() {
        return actividadesFormacion;
    }

    public int getContrataciones() {
        return contrataciones;
    }

    public BigDecimal getAyudasEmpresas() {
        return ayudasEmpresas;
    }

    public BigDecimal getAyudasEntidades() {
        return ayudasEntidades;
    }

    public int getAsesoramientos() {
        return asesoramientos;
    }

    public int getEmpresasCreadas() {
        return empresasCreadas;
    }

    public int getHorasFormacion() {
        return horasFormacion;
    }

    public int getParticipantesFormacion() {
        return participantesFormacion;
    }

    public int getPersonasAtendidas() {
        return personasAtendidas;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getId() {
        return id;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setActividadesFormacion(int actividadesFormacion) {
        this.actividadesFormacion = actividadesFormacion;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public void setAsesoramientos(int asesoramientos) {
        this.asesoramientos = asesoramientos;
    }

    public void setContrataciones(int contrataciones) {
        this.contrataciones = contrataciones;
    }

    public void setAyudasEmpresas(BigDecimal ayudasEmpresas) {
        this.ayudasEmpresas = ayudasEmpresas;
    }

    public void setEmpresasCreadas(int empresasCreadas) {
        this.empresasCreadas = empresasCreadas;
    }

    public void setAyudasEntidades(BigDecimal ayudasEntidades) {
        this.ayudasEntidades = ayudasEntidades;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setHorasFormacion(int horasFormacion) {
        this.horasFormacion = horasFormacion;
    }

    public void setParticipantesFormacion(int participantesFormacion) {
        this.participantesFormacion = participantesFormacion;
    }

    public void setPersonasAtendidas(int personasAtendidas) {
        this.personasAtendidas = personasAtendidas;
    }
}
