package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter @RequiredArgsConstructor @AllArgsConstructor @ToString
public class Departamento {
    @Id
    private final Integer id;
    @Setter
    private String nombre;
}
