package es.impulsalicante.ApiFuturaAlicante.models;

public class Territorio {

    private int id_centro;
    private int id_proyecto;
    private boolean es_vivero_empresarial;

    public Territorio (int id_centro, int id_proyecto, boolean es_vivero_empresarial){
        this.id_centro = id_centro;
        this.id_proyecto = id_proyecto;
        this.es_vivero_empresarial = false;
    }

}
