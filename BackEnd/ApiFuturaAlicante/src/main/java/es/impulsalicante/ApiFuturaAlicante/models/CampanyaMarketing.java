package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "campanya_marketing")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class CampanyaMarketing {
    @Id
    @Column(name = "id_campanya")
    private String id;
    @Column
    private String nombre;
    @Column
    private Date fecha_creacion;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    @JsonIgnoreProperties({"contratos", "centros", "proyectos", "actividades", "campanyasMarketing", "empresas", "convenios"})
    private Departamento departamento;

    //GETTERS Y SETTERS
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    //CONSTRUCTORES
    public CampanyaMarketing(String id, Date fecha_creacion, Departamento departamento, String nombre) {
        this.id = id;
        this.fecha_creacion = fecha_creacion;
        this.departamento = departamento;
        this.nombre = nombre;
    }

    public CampanyaMarketing(){}
}
