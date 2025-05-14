package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Centro")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id_centro")
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
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "id_proyecto")
    private Proyecto proyecto;


    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public Centros (String id, String nombre, String direccion, Date fecha_creacion){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.fecha_creacion = fecha_creacion;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public Centros( ){ }

}

