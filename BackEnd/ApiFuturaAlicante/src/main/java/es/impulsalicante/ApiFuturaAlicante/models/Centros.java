package es.impulsalicante.ApiFuturaAlicante.models;


import lombok.Getter;

@Getter
public class Centros {
    private int id_centro;
    private String nombre;
    private String direccion;

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
