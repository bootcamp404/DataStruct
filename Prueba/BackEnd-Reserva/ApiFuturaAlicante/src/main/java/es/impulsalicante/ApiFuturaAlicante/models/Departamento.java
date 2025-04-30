package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "departamento")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Departamento {
    //PROPIEDADES
    @Id
    @Column(name = "id_departamento")
    private String id;
    @Column
    private String nombre;

    @OneToMany(mappedBy = "departamento")
    private List<Empleados> empleados;

    //CONSTRUCTORES
    public Departamento (String id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }

    public Departamento( ) {
    }

    //GETTERS SETTERS

    public List<Empleados> getEmpleados() {
        return empleados;
    }

    public void setEmpleados(List<Empleados> empleados) {
        this.empleados = empleados;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getId() {
        return id;
    }
}
