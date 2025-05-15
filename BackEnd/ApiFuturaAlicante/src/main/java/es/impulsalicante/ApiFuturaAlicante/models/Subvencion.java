package es.impulsalicante.ApiFuturaAlicante.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Subvencion")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id_subvencion")
public class Subvencion {

    @Id
    @Column
    private String id_subvencion;

    @Column
    private String entidad;

    @Column
    private int importe;

    @Column
    private Date fecha_creacion;

    @Column(length = 1)
    private String modalidad; // Valores esperados: "A", "B", "C"

    @ManyToOne
    @JoinColumn(name="id_proyecto")
    @JsonBackReference("proy-subv")
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name = "id_estado_sub", nullable = false)
    @JsonManagedReference
    private EstadoSubvencion estadoSubvencion;


    public void setId(String id_subvencion) {
        this.id_subvencion = id_subvencion;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public void setModalidad(String modalidad) {
        this.modalidad = modalidad;
    }

    public void setId_subvencion(String id_subvencion) {
        this.id_subvencion = id_subvencion;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setImporte(int importe) {
        this.importe = importe;
    }

    public String getEntidad() {
        return entidad;
    }

    public String getId_subvencion() {
        return id_subvencion;
    }

    public int getImporte() {
        return importe;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public void setEstadoSubvencion(EstadoSubvencion estadoSubvencion) {
        this.estadoSubvencion = estadoSubvencion;
    }

    public EstadoSubvencion getEstadoSubvencion() {
        return estadoSubvencion;
    }

    public Subvencion (String id_subvencion, String entidad, int importe, Date fecha_creacion, EstadoSubvencion estadoSubvencion){
        this.id_subvencion = id_subvencion;
        this.entidad = entidad;
        this.importe = importe;
        this.estadoSubvencion = estadoSubvencion;
        this.fecha_creacion = fecha_creacion;
    }
     public Subvencion ( ) { }
}
