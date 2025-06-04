package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;

@Entity
@Table(name = "imagen")
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String categoria;

    @Column(length = 500)
    private String descripcion;

    @Column
    private String tags; // Separados por comas

    // Constructores
    public Imagen() {}

    public Imagen(String nombre, String url, String categoria) {
        this.nombre = nombre;
        this.url = url;
        this.categoria = categoria;
    }

    public Imagen(String nombre, String url, String categoria, String descripcion, String tags) {
        this.nombre = nombre;
        this.url = url;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.tags = tags;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    @Override
    public String toString() {
        return "Imagen{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", categoria='" + categoria + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
