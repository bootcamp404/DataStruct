package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.OneToMany;

public class Sede {
    @OneToMany
    private int id_centro;
    private int id_departamento;

    public Sede(int id_centro, int id_departamento){
        this.id_centro = id_centro;
        this.id_departamento = id_departamento;
    }
}
