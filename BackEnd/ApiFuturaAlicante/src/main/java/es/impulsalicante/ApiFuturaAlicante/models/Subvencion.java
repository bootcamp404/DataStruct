package es.impulsalicante.ApiFuturaAlicante.models;


import jakarta.persistence.*;

@Entity
@Table(name = "Subvencion")
public class Subvencion {

    @Id
    @Column
    private String id_subvencion;

    @Column
    private String entidad;

    @Column
    private int importe;


    @ManyToOne
    @JoinColumn(name = "id_estado_sub", nullable = false)
    private EstadoSubvencion estadoSubvencion;


    public void setId(String id_subvencion) {
        this.id_subvencion = id_subvencion;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
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


    public void setEstadoSubvencion(EstadoSubvencion estadoSubvencion) {
        this.estadoSubvencion = estadoSubvencion;
    }

    public EstadoSubvencion getEstadoSubvencion() {
        return estadoSubvencion;
    }

    public Subvencion (String id_subvencion, String entidad, int importe, EstadoSubvencion estadoSubvencion){
        this.id_subvencion = id_subvencion;
        this.entidad = entidad;
        this.importe = importe;
        this.estadoSubvencion = estadoSubvencion;
    }
     public Subvencion ( ) { }
}
