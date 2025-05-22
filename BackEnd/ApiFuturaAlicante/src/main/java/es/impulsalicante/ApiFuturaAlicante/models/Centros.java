package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Centro")
@Inheritance(strategy = InheritanceType.JOINED)
public class Centros {
    @Id
    @Column(name = "id_centro")
    private String id;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String direccion;
    @Column
    private Date fecha_creacion;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    @JsonIgnoreProperties({"contratos", "centros", "proyectos", "actividades", "campanyasMarketing", "empresas", "convenios"})
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name="id_proyecto")
    @JsonIgnoreProperties({"actividades", "subvenciones", "centros", "departamento"})
    private Proyecto proyecto;

    //GETTERS Y SETTERS
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    //CONSTRUCTORES

    public Centros(String id, Proyecto proyecto, Departamento departamento, Date fecha_creacion, String direccion, String nombre) {
        this.id = id;
        this.proyecto = proyecto;
        this.departamento = departamento;
        this.fecha_creacion = fecha_creacion;
        this.direccion = direccion;
        this.nombre = nombre;
    }

    public Centros(){}
}

