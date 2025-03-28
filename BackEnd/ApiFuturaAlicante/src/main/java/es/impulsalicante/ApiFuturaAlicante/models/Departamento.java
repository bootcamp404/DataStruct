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
    private String id;
    @Column @Setter
    private String nombre;

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public String getId() {
        return id;
    }

    public Departamento (String id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }


    public Departamento( ) {
    }
}
