package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "departamento")
@Getter @RequiredArgsConstructor @ToString @EqualsAndHashCode
public class Departamento {
    @Id
    private final Integer id;
    @Column
    @Setter
    private String nombre;

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Departamento (Integer id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }
}
