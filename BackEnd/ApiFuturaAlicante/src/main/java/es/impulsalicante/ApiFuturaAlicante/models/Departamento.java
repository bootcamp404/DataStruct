package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "departamento")
@Getter @ToString @EqualsAndHashCode @NoArgsConstructor @AllArgsConstructor
public class Departamento {
    @Id
    @Column(name = "id_departamento")
    private String id;
    @Column @Setter
    private String nombre;

    @OneToMany(mappedBy = "departamento")
    private List<Contrato> contratos;
}
