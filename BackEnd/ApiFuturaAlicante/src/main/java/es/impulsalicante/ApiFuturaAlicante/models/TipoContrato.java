package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table (name = "tipo_contrato")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class TipoContrato {
    //PROPIEDADES
    @Id
    @Column(name = "id_tipo_contrato")
    private String id;
    @Column
    private String nombre;

    @OneToMany(mappedBy = "tipo_contrato")
    @JsonIgnoreProperties("tipo_contrato")
    private List<Contrato> contratos;

    //CONSTRUCTORES
    public TipoContrato(String id, String nombre, List<Contrato> contratos) {
        this.id = id;
        this.nombre = nombre;
        this.contratos = contratos;
    }

    public TipoContrato() {
    }

    //GETTER
    public String getNombre() {
        return nombre;
    }

    public List<Contrato> getContratos() {
        return contratos;
    }

    public String getId() {
        return id;
    }

    //SETTER

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setContratos(List<Contrato> contratos) {
        this.contratos = contratos;
    }
}
