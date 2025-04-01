package es.impulsalicante.ApiFuturaAlicante.models;


import jakarta.persistence.*;


@Entity
@Table(name = "Estado_Subvencion")
public class EstadoSubvencion {

    @Id
    @Column(name = "id_estado_sub")
    private String id;

    @Column
    private String nombre;

    public void setId(String id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public String getId() {
        return id;
    }

    public EstadoSubvencion (String id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }

    public EstadoSubvencion () {}
}