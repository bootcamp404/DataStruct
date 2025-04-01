package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Territorio")
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "id_centro")
public class Territorio extends Centros {


    @ManyToOne
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @Column(nullable = false)
    private boolean es_vivero_empresarial;

    @Override
    public void setDireccion(String direccion) {
        super.setDireccion(direccion);
    }

    @Override
    public void setNombre(String nombre) {
        super.setNombre(nombre);
    }

    @Override
    public void setId(String id) {
        super.setId(id);
    }

    public void setEs_vivero_empresarial(boolean es_vivero_empresarial) {
        this.es_vivero_empresarial = es_vivero_empresarial;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public boolean isEs_vivero_empresarial() {
        return es_vivero_empresarial;
    }

    @Override
    public String getNombre() {
        return super.getNombre();
    }

    @Override
    public String getId() {
        return super.getId();
    }

    public Proyecto getProyecto() {
        return proyecto;
    }
    @Override
    public String getDireccion() {
        return super.getDireccion();
    }

    public Territorio (Proyecto proyecto){
        this.proyecto = proyecto;
    }

    public Territorio () { }
}
