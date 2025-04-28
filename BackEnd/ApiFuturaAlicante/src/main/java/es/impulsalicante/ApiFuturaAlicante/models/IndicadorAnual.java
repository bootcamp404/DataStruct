package es.impulsalicante.ApiFuturaAlicante.models;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "indicadores_anuales")
public class IndicadorAnual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int anio;
    private String departamento;

    private int personasAtendidas;
    private int contrataciones;
    private int empresasCreadas;

    private int actividadesFormacion;
    private int participantesFormacion;
    private int horasFormacion;

    private int asesoramientos;
    private double ayudasEmpresas;
    private double ayudasEntidades;

    private LocalDateTime createdAt = LocalDateTime.now();

    public int getAnio() {
        return anio;
    }

    public int getActividadesFormacion() {
        return actividadesFormacion;
    }

    public int getContrataciones() {
        return contrataciones;
    }

    public double getAyudasEmpresas() {
        return ayudasEmpresas;
    }

    public double getAyudasEntidades() {
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

    public Long getId() {
        return id;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public void setId(Long id) {
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

    public void setAyudasEmpresas(double ayudasEmpresas) {
        this.ayudasEmpresas = ayudasEmpresas;
    }

    public void setEmpresasCreadas(int empresasCreadas) {
        this.empresasCreadas = empresasCreadas;
    }

    public void setAyudasEntidades(double ayudasEntidades) {
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
