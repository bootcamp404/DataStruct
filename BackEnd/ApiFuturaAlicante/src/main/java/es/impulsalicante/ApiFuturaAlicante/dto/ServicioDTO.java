package es.impulsalicante.ApiFuturaAlicante.dto;

import java.util.List;

public class ServicioDTO {
    private String titulo;
    private String descripcion;

    private List<ServicioDTO> servicios;

    public List<ServicioDTO> getServicios() {
        return servicios;
    }

    public void setServicios(List<ServicioDTO> servicios) {
        this.servicios = servicios;
    }
    public ServicioDTO(String titulo, String descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public String getTitulo() { return titulo; }
    public String getDescripcion() { return descripcion; }
}
