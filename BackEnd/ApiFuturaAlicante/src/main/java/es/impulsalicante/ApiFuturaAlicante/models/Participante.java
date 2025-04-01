package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import es.impulsalicante.ApiFuturaAlicante.models.ActividadValoracionParticipante;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "participante")
public class Participante {
    @Id
    @Column(name = "id_participante")
    private String id;
    @Column
    private String nombre;

    @Column
    private String apellidos;

    @Column
    private String email;

    @Column
    private int telefono;

    @OneToMany(mappedBy = "participante", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ActividadValoracionParticipante> actividadesValoraciones;


    public void setId(String id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setActividadesValoraciones(List<ActividadValoracionParticipante> actividadesValoraciones) {
        this.actividadesValoraciones = actividadesValoraciones;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getNombre() {
        return nombre;
    }

    public int getTelefono() {
        return telefono;
    }

    public String getApellidos() {
        return apellidos;
    }

    public List<ActividadValoracionParticipante> getActividadesValoraciones() {
        return actividadesValoraciones;
    }
}
