package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Proyecto")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id_proyecto")
public class Proyecto {

    @Id
    @Column(name = "id_proyecto")
    private String id_proyecto;
    @Column(nullable = false)
    private String nombre;
    @Column
    private String objetivo;
    @Column
    private Date fecha_ini;
    @Column
    private Date fecha_fin;


    @ManyToOne
    @JoinColumn(name="id_departamento")
    @JsonIgnoreProperties({"contratos", "centros", "proyectos", "actividades", "campanyasMarketing", "empresas", "convenios"})
    private Departamento departamento;

    @OneToMany(mappedBy="proyecto")
    @JsonIgnoreProperties("proyecto")
    private List<Centros> centros;

    @OneToMany(mappedBy="proyecto")
    @JsonIgnoreProperties("proyecto")
    private List<Subvencion> subvenciones;

    @OneToMany(mappedBy="proyecto")
    @JsonIgnoreProperties("proyecto")
    private List<Actividad> actividades;


    //GETTERS SETTERS

    public void setCentros(List<Centros> centros) {
        this.centros = centros;
    }

    public List<Actividad> getActividades() {
        return actividades;
    }

    public void setActividades(List<Actividad> actividades) {
        this.actividades = actividades;
    }

    public void setSubvenciones(List<Subvencion> subvenciones) {
        this.subvenciones = subvenciones;
    }

    public List<Subvencion> getSubvenciones() {
        return subvenciones;
    }

    public List<Centros> getCentros() {
        return centros;
    }

    public String getId_proyecto() {
        return id_proyecto;
    }

    public void setId_proyecto(String id_proyecto) {
        this.id_proyecto = id_proyecto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public Date getFecha_ini() {
        return fecha_ini;
    }

    public void setFecha_ini(Date fecha_ini) {
        this.fecha_ini = fecha_ini;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
    public Departamento getDepartamento() {
        return departamento;
    }

    //CONSTRUCTORES
    public Proyecto(String id_proyecto, String nombre, Date fecha_ini, Date fecha_fin, String objetivo, Departamento departamento, List<Centros> centros, List<Subvencion> subvenciones, List<Actividad> actividades) {
        this.id_proyecto = id_proyecto;
        this.nombre = nombre;
        this.fecha_ini = fecha_ini;
        this.fecha_fin = fecha_fin;
        this.objetivo = objetivo;
        this.departamento = departamento;
        this.centros = centros;
        this.subvenciones = subvenciones;
        this.actividades = actividades;
    }

    public Proyecto ( ) { }
}
