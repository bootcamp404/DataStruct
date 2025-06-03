package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Imagen {
    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private String url;
    private String categoria;

    public Imagen() {
    }

    public String getNombre() {
        return nombre;
    }

    public Long getId() {
        return id;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getUrl() {
        return url;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}