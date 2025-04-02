package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;

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

    public Centros (String id, String nombre, String direccion){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
    }

    public Centros( ){ }

}

