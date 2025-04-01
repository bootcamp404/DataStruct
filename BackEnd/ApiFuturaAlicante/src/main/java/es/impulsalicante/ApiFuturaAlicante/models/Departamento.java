package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "departamento")
@Getter @ToString @EqualsAndHashCode
public class Departamento {
    @Id
    @Column(name = "id_departamento")
    private String id;
    @Column @Setter
    private String nombre;

    @OneToMany(mappedBy = "departamento")
    private List<Empleados> empleados;


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
