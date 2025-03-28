package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "departamento")
@Getter @ToString @EqualsAndHashCode @NoArgsConstructor @AllArgsConstructor
public class Departamento {
    @Id
    @Column(name = "id_departamento")
    private String id;
    @Column @Setter
    private String nombre;
}
