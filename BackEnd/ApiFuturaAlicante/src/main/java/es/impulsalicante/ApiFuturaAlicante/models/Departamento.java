package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
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
    private List<Contrato> contratos;


    //CONSTRUCTORES
    public Departamento(String id, List<Contrato> contratos, String nombre) {
        this.id = id;
        this.contratos = contratos;
        this.nombre = nombre;
    }

    public Departamento() {
    }

    //Getters Setters

    public String getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Contrato> getContratos() {
        return contratos;
    }

    public void setContratos(List<Contrato> contratos) {
        this.contratos = contratos;
    }
}
