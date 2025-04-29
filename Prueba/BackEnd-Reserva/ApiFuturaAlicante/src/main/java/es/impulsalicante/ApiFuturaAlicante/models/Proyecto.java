package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Proyecto")
public class Proyecto {

    @Id
    @Column(length = 20)
    private String id_proyecto;

    @Column(nullable = false)
    private String nombre;

    @Column
    private String objetivo;

    @Column
    private Date fecha_inicio;
    @Column
    private Date fecha_fin;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

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

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
    public Departamento getDepartamento() {
        return departamento;
    }



    public Proyecto (String id_proyecto,String nombre, String objetivo, Date fecha_inicio, Date fecha_fin, Departamento departamento) {
        this.id_proyecto = id_proyecto;
        this.nombre = nombre;
        this.objetivo = objetivo;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.departamento = departamento;
    }

    public Proyecto ( ) { }
}
