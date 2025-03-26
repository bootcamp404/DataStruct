package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Territorio")
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "id_centro")
public class Territorio extends Centros {

    @ManyToOne
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @Column(nullable = false)
    private boolean es_vivero_empresarial;
}
