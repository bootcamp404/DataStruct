package es.impulsalicante.ApiFuturaAlicante.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "Estado_Subvencion")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class EstadoSubvencion {

    @Id
    @Column(name = "id_estado_sub")
    private String id;

    @OneToMany(mappedBy = "estadoSubvencion")
    @JsonIgnoreProperties({"estadoSubvencion"})
    private List<Subvencion> subvenciones;

    public void setId(String id) {
        this.id = id;
    }
    public String getId() {
        return id;
    }


    //Constructor
    public EstadoSubvencion (String id){
        this.id = id;
    }

    public EstadoSubvencion () {}
}