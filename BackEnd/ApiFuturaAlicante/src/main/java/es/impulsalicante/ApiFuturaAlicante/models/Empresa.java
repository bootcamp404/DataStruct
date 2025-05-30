package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Empresa")
public class Empresa {

    @Id
    private String idEmpresa;
    @Column
    private String nombre;
    @Column //@Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    @JsonIgnoreProperties({"contratos", "centros", "proyectos", "actividades", "campanyasMarketing", "empresas", "convenios"})
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "id_sector")
    @JsonIgnoreProperties({"empresas"})
    private SectorEmpresa sector;

    @OneToMany(mappedBy = "empresa")
    @JsonIgnoreProperties({"empresa"})
    private List<Kpi> kpis;

    //CONSTRUCTORES
    public Empresa() {}

    public Empresa(String idEmpresa, List<Kpi> kpis, SectorEmpresa sector, Departamento departamento, Date fechaCreacion, String nombre) {
        this.idEmpresa = idEmpresa;
        this.kpis = kpis;
        this.sector = sector;
        this.departamento = departamento;
        this.fechaCreacion = fechaCreacion;
        this.nombre = nombre;
    }

    //GETTERS SETTERS
    public List<Kpi> getKpis() {
        return kpis;
    }

    public void setKpis(List<Kpi> kpis) {
        this.kpis = kpis;
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

