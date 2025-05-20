package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;


@Entity
@Table(name = "actividad")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Actividad {
    @Id
    @Column(name = "id_actividad")
    private String id;
    @Column
    private String nombre;
    @Column
    private String descripcion;
    @Column(name = "fecha_ini")
    private Date fecha_inicio;
    @Column(name = "fecha_fin")
    private Date fecha_fin;
    @Column
    private int num_participantes;
    @Column
    private Integer horas;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    @JsonBackReference("acti-depa")
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "id_proyecto")
    @JsonBackReference("acti-proy")
    private Proyecto proyecto;


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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public int getNum_participantes() {
        return num_participantes;
    }

    public void setNum_participantes(int num_participantes) {
        this.num_participantes = num_participantes;
    }

    public Integer getHoras() {
        return horas;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    //CONSTRUCTORES


    public Actividad(String id, Proyecto proyecto, Departamento departamento, Integer horas, int num_participantes, Date fecha_fin, Date fecha_inicio, String descripcion, String nombre) {
        this.id = id;
        this.proyecto = proyecto;
        this.departamento = departamento;
        this.horas = horas;
        this.num_participantes = num_participantes;
        this.fecha_fin = fecha_fin;
        this.fecha_inicio = fecha_inicio;
        this.descripcion = descripcion;
        this.nombre = nombre;
    }

    public Actividad(){}
}