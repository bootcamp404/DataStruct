package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "departamento")
@Getter @ToString @EqualsAndHashCode
public class Departamento {
    @Id
    @Column(name = "id_departamento")
    private final String id;
    @Column @Setter
    private String nombre;

    public Departamento(String id, String nombre) {
        this.nombre = nombre;
        this.id = id;
    }
}
