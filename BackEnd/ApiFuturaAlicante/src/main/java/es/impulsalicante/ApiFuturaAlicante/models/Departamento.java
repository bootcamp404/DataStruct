package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private List<Empleados> empleados;


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setEmpleados(List<Empleados> empleados) {
        this.empleados = empleados;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getId() {
        return id;
    }

    public List<Empleados> getEmpleados() {
        return empleados;
    }

    public Departamento (String id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }

    public Departamento( ) {
    }
}
