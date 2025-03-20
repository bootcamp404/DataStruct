package es.impulsalicante.ApiFuturaAlicante.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

public class Departamento {
    private int id;
    private String nombre;

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    //Constructor
    public Departamento(int id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }
}
