package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "departamento")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Departamento {
    //PROPIEDADES
    @Id
    @Column(name = "id_departamento")
    private String id;
    @Column
    private String nombre;

    @OneToMany(mappedBy = "departamento")
    @JsonBackReference
    private List<Contrato> contratos;

    @OneToMany(mappedBy = "departamento")
    @JsonBackReference
    private List<Centros> centros;

    @OneToMany(mappedBy="departamento")
    @JsonBackReference("dep-proy")
    private List<Proyecto> proyectos;
    @OneToMany(mappedBy = "departamento")
    @JsonBackReference
    private List<Actividad> actividades;

    @OneToMany(mappedBy = "departamento")
    @JsonBackReference
    private List<CampanyaMarketing> capanyasMarketing;

    @OneToMany(mappedBy = "departamento")
    @JsonBackReference
    private List<Empresa> empresas;

    //CONSTRUCTORES
    public Departamento (String id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }

    public Departamento( ) {
    }

    //GETTERS SETTERS

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
