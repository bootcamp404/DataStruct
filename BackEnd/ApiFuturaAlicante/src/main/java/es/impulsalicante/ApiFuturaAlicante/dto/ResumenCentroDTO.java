package es.impulsalicante.ApiFuturaAlicante.dto;

public class ResumenCentroDTO {
    private String id;
    private String nombre;
    private String tipo; // sede / centro / vivero

    private Integer citasOrientacion;
    private Integer actividades;
    private Integer participantes;

    // Getters y setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getCitasOrientacion() {
        return citasOrientacion;
    }

    public void setCitasOrientacion(Integer citasOrientacion) {
        this.citasOrientacion = citasOrientacion;
    }

    public Integer getActividades() {
        return actividades;
    }

    public void setActividades(Integer actividades) {
        this.actividades = actividades;
    }

    public Integer getParticipantes() {
        return participantes;
    }

    public void setParticipantes(Integer participantes) {
        this.participantes = participantes;
    }
}

