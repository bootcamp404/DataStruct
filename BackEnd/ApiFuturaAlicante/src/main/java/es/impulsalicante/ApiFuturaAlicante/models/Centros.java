package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Centro")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public class Centros {
    @Id
    private String id_centro;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String direccion;

    public void setId_centro(String id_centro) {
        this.id_centro = id_centro;
    }

}

