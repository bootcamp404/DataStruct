package es.impulsalicante.ApiFuturaAlicante.dto;

public class ResumenDepartamentoDTO {

    private String id;
    private String nombre;

    private Integer personasAtendidas;
    private Integer altasDemandantes;
    private Integer accionesOrientacion;

    private Integer cursos;
    private Integer participantes;
    private Integer horas;

    private Integer empresasApoyadas;
    private Integer nuevasEmpresas;
    private Integer sesionesAsesoramiento;

    // Getters y Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getPersonasAtendidas() {
        return personasAtendidas;
    }

    public void setPersonasAtendidas(Integer personasAtendidas) {
        this.personasAtendidas = personasAtendidas;
    }

    public Integer getAltasDemandantes() {
        return altasDemandantes;
    }

    public void setAltasDemandantes(Integer altasDemandantes) {
        this.altasDemandantes = altasDemandantes;
    }

    public Integer getAccionesOrientacion() {
        return accionesOrientacion;
    }

    public void setAccionesOrientacion(Integer accionesOrientacion) {
        this.accionesOrientacion = accionesOrientacion;
    }

    public Integer getCursos() {
        return cursos;
    }

    public void setCursos(Integer cursos) {
        this.cursos = cursos;
    }

    public Integer getParticipantes() {
        return participantes;
    }

    public void setParticipantes(Integer participantes) {
        this.participantes = participantes;
    }

    public Integer getHoras() {
        return horas;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
    }

    public Integer getEmpresasApoyadas() {
        return empresasApoyadas;
    }

    public void setEmpresasApoyadas(Integer empresasApoyadas) {
        this.empresasApoyadas = empresasApoyadas;
    }

    public Integer getNuevasEmpresas() {
        return nuevasEmpresas;
    }

    public void setNuevasEmpresas(Integer nuevasEmpresas) {
        this.nuevasEmpresas = nuevasEmpresas;
    }

    public Integer getSesionesAsesoramiento() {
        return sesionesAsesoramiento;
    }

    public void setSesionesAsesoramiento(Integer sesionesAsesoramiento) {
        this.sesionesAsesoramiento = sesionesAsesoramiento;
    }
}
