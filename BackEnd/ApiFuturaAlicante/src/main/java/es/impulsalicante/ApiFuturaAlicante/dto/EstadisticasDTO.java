package es.impulsalicante.ApiFuturaAlicante.dto;

public class EstadisticasDTO {
    private int totalFormularios;
    private int totalRespuestas;

    private int[] respuestasPorMes;
    private int[] respuestasPorFormulario;
    private String[] nombresFormularios;
    private int[] respuestasPorDepartamento;
    private String[] nombresDepartamentos;

    // Getters y Setters
    public int getTotalFormularios() {
        return totalFormularios;
    }

    public void setTotalFormularios(int totalFormularios) {
        this.totalFormularios = totalFormularios;
    }

    public int getTotalRespuestas() {
        return totalRespuestas;
    }

    public void setTotalRespuestas(int totalRespuestas) {
        this.totalRespuestas = totalRespuestas;
    }

    public int[] getRespuestasPorMes() {
        return respuestasPorMes;
    }

    public void setRespuestasPorMes(int[] respuestasPorMes) {
        this.respuestasPorMes = respuestasPorMes;
    }

    public int[] getRespuestasPorFormulario() {
        return respuestasPorFormulario;
    }

    public void setRespuestasPorFormulario(int[] respuestasPorFormulario) {
        this.respuestasPorFormulario = respuestasPorFormulario;
    }

    public String[] getNombresFormularios() {
        return nombresFormularios;
    }

    public void setNombresFormularios(String[] nombresFormularios) {
        this.nombresFormularios = nombresFormularios;
    }

    public int[] getRespuestasPorDepartamento() {
        return respuestasPorDepartamento;
    }

    public void setRespuestasPorDepartamento(int[] respuestasPorDepartamento) {
        this.respuestasPorDepartamento = respuestasPorDepartamento;
    }

    public String[] getNombresDepartamentos() {
        return nombresDepartamentos;
    }

    public void setNombresDepartamentos(String[] nombresDepartamentos) {
        this.nombresDepartamentos = nombresDepartamentos;
    }
}
