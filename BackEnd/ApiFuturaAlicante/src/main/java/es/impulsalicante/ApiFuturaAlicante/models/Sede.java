package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Sede")
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "id_centro")
public class Sede extends Centros {

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;
}
