package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Empresa")
public class Empresa {

    @Id
    private String idEmpresa;

    private String nombre;

    @Temporal(TemporalType.DATE)
    private Date fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "id_sector")
    private SectorEmpresa sector;

    public Empresa() {}

    public Empresa(String idEmpresa, String nombre, Date fechaCreacion, Departamento departamento, SectorEmpresa sector) {
        this.idEmpresa = idEmpresa;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
        this.departamento = departamento;
        this.sector = sector;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public String getNombre() {
        return nombre;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public SectorEmpresa getSector() {
        return sector;
    }

    public String getIdEmpresa() {
        return idEmpresa;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setIdEmpresa(String idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public void setSector(SectorEmpresa sector) {
        this.sector = sector;
    }
}

