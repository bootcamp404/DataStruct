package es.impulsalicante.ApiFuturaAlicante.dto;

import es.impulsalicante.ApiFuturaAlicante.models.Imagen;

import java.util.List;

public class PrevisualizacionDTO {
    private ResumenMemoriaDTO resumen;
    private List<Imagen> imagenes;

    public List<Imagen> getImagenes() {
        return imagenes;
    }

    public ResumenMemoriaDTO getResumen() {
        return resumen;
    }

    public void setImagenes(List<Imagen> imagenes) {
        this.imagenes = imagenes;
    }

    public void setResumen(ResumenMemoriaDTO resumen) {
        this.resumen = resumen;
    }
}
