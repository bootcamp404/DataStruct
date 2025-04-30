package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;


@Entity
@Table(name = "actividad")
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
    private int horas;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public void setFecha_inicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public void setNum_participantes(int num_participantes) {
        this.num_participantes = num_participantes;
    }

    public void setHoras(int horas) {
        this.horas = horas;
    }

    public String getNombre() {
        return nombre;
    }

    public String getId() {
        return id;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public Date getFecha_inicio() {
        return fecha_inicio;
    }

    public int getNum_participantes() {
        return num_participantes;
    }

    public int getHoras() {
        return horas;
    }

    public Actividad (String id, String nombre, String descripcion, Date fecha_inicio, Date fecha_fin, int num_participantes, int horas, Departamento departamento){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.num_participantes = num_participantes;
        this.departamento = departamento;
        this.horas = horas;
    }

    public Actividad () {}
}