package es.impulsalicante.ApiFuturaAlicante.dto;

public class CentroDTO {
    private String nombre;
    private String direccion;

    public CentroDTO(String nombre, String direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
    }

    public String getNombre() { return nombre; }
    public String getDireccion() { return direccion; }
}
