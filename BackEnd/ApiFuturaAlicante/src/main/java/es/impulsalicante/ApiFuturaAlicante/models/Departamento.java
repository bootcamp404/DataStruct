package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "departamento")
@Getter @RequiredArgsConstructor @AllArgsConstructor @ToString @EqualsAndHashCode
public class Departamento {
    @Id
    private final Integer id;
    @Column
    @Setter
    private String nombre;

}
