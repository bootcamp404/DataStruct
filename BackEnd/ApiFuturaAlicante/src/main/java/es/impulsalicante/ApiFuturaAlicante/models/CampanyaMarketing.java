package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "campanya_marketing")
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
    private Departamento departamento;


    public void setId(String id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
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

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public CampanyaMarketing (String id, String nombre, Date fecha_creacion, Departamento departamento){
        this.id = id;
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha_creacion = fecha_creacion;
    }

    public CampanyaMarketing () {}
}
