package es.impulsalicante.ApiFuturaAlicante.models;


import jakarta.persistence.OneToOne;
import lombok.Getter;

@Getter
public class Centros {
    private int id_centro;
    private String nombre;
    private String direccion;


    // Relación uno a uno con Territorio
    @OneToOne(mappedBy = "centro")
    private Territorio territorio;

    // Relación uno a uno con Sede
    @OneToOne(mappedBy = "centro")
    private Sede sede;


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setId_centro(int id_centro) {
        this.id_centro = id_centro;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Centros (int id_centro, String nombre, String direccion){
        this.id_centro = id_centro;
        this.nombre = nombre;
        this.direccion = direccion;
    }

}
