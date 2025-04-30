package es.impulsalicante.ApiFuturaAlicante.models;


import jakarta.persistence.*;


@Entity
@Table(name = "Estado_Subvencion")
public class EstadoSubvencion {

    @Id
    @Column(name = "id_estado_sub")
    private String id;

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