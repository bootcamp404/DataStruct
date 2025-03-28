package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "departamento")
<<<<<<< HEAD
@Getter @RequiredArgsConstructor @ToString @EqualsAndHashCode
=======
@Getter @RequiredArgsConstructor @AllArgsConstructor @ToString @EqualsAndHashCode
>>>>>>> b912c6e70e819727d5f630e1ef30f1ba8be29bf8
public class Departamento {
    @Id
    @Column(name = "id_departamento")
    private final Integer id;
<<<<<<< HEAD
    @Column
    @Setter
=======
    @Column @Setter
>>>>>>> b912c6e70e819727d5f630e1ef30f1ba8be29bf8
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
