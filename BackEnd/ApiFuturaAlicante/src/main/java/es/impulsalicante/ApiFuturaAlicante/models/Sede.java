package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Sede")
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "id_centro")
public class Sede extends Centros {

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    @Override
    public void setDireccion(String direccion) {
        super.setDireccion(direccion);
    }

    @Override
    public void setId(String id) {
        super.setId(id);
    }

    @Override
    public void setNombre(String nombre) {
        super.setNombre(nombre);
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    @Override
    public String getDireccion() {
        return super.getDireccion();
    }

    @Override
    public String getId() {
        return super.getId();
    }

    @Override
    public String getNombre() {
        return super.getNombre();
    }

    public Sede (Departamento departamento){
        this.departamento = departamento;
    }

    public Sede () { }
}
