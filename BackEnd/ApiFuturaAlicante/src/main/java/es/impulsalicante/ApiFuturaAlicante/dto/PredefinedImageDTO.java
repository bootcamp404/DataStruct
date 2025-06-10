package es.impulsalicante.ApiFuturaAlicante.dto;

import java.util.List;

public class PredefinedImageDTO {
    private String id;
    private String nombre;
    private String categoria;
    private String url;
    private String descripcion;
    private List<String> keywords;

    public PredefinedImageDTO() {}

    public PredefinedImageDTO(String id, String nombre, String categoria, String url, String descripcion, List<String> keywords) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.url = url;
        this.descripcion = descripcion;
        this.keywords = keywords;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getUrl() {
        return url;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    // Setters
    public void setId(String id) {
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

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    @Override
    public String toString() {
        return "PredefinedImageDTO{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", categoria='" + categoria + '\'' +
                ", url='" + url + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", keywords=" + keywords +
                '}';
    }
}