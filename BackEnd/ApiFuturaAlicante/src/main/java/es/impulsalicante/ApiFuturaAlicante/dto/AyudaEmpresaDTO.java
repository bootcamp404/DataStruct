package es.impulsalicante.ApiFuturaAlicante.dto;

import java.math.BigDecimal;

public class AyudaEmpresaDTO {
    private String nombreAyuda;
    private String procedenciaFondos;
    private int ayudasSolicitadas;
    private int ayudasAprobadas;
    private BigDecimal importeConcedido;
    private int ayudasDenegadas;
    private int renuncias;

    public BigDecimal getImporteConcedido() {
        return importeConcedido;
    }

    public int getAyudasAprobadas() {
        return ayudasAprobadas;
    }

    public int getAyudasDenegadas() {
        return ayudasDenegadas;
    }

    public int getAyudasSolicitadas() {
        return ayudasSolicitadas;
    }

    public int getRenuncias() {
        return renuncias;
    }

    public String getNombreAyuda() {
        return nombreAyuda;
    }

    public String getProcedenciaFondos() {
        return procedenciaFondos;
    }

    public void setAyudasAprobadas(int ayudasAprobadas) {
        this.ayudasAprobadas = ayudasAprobadas;
    }

    public void setAyudasDenegadas(int ayudasDenegadas) {
        this.ayudasDenegadas = ayudasDenegadas;
    }

    public void setAyudasSolicitadas(int ayudasSolicitadas) {
        this.ayudasSolicitadas = ayudasSolicitadas;
    }

    public void setImporteConcedido(BigDecimal importeConcedido) {
        this.importeConcedido = importeConcedido;
    }

    public void setNombreAyuda(String nombreAyuda) {
        this.nombreAyuda = nombreAyuda;
    }

    public void setProcedenciaFondos(String procedenciaFondos) {
        this.procedenciaFondos = procedenciaFondos;
    }

    public void setRenuncias(int renuncias) {
        this.renuncias = renuncias;
    }
}
