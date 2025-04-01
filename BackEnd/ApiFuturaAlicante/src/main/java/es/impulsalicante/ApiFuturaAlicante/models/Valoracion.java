package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;


@Entity
@Table(name = "valoracion")
public class Valoracion {
    @Id
    @Column(name = "id_valoracion")
    private String id;
    @Column
    private int estrellas;
    @Column
    private String observaciones;

    public void setId(String id) {
        this.id = id;
    }

    public void setEstrellas(int estrellas) {
        this.estrellas = estrellas;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getId() {
        return id;
    }

    public int getEstrellas() {
        return estrellas;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Valoracion (String id, int estrellas, String observaciones){
        this.id = id;
        this.estrellas = estrellas;
        this.observaciones = observaciones;
    }

    public Valoracion (){}
}