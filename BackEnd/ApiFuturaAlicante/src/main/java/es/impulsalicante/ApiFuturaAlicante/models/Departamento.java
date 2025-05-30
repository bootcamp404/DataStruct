package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "departamento")
public class Departamento {
    //PROPIEDADES
    @Id
    @Column(name = "id_departamento")
    private String id;
    @Column
    private String nombre;

    //RELACIONES
    @OneToMany(mappedBy = "departamento")
    @JsonIgnoreProperties("departamento")
    private List<Contrato> contratos;

    @OneToMany(mappedBy = "departamento")
    @JsonIgnoreProperties("departamento")
    private List<Centros> centros;

    @OneToMany(mappedBy="departamento")
    @JsonIgnoreProperties("departamento")
    private List<Proyecto> proyectos;

    @OneToMany(mappedBy = "departamento")
    @JsonIgnoreProperties("departamento")
    private List<Actividad> actividades;

    @OneToMany(mappedBy = "departamento")
    @JsonIgnoreProperties("departamento")
    private List<CampanyaMarketing> campanyasMarketing;

    @OneToMany(mappedBy = "departamento")
    @JsonIgnoreProperties("departamento")
    private List<Empresa> empresas;

    @OneToMany(mappedBy = "departamento")
    @JsonIgnoreProperties("departamento")
    private List<Convenio> convenios;


    //CONSTRUCTORES

    public Departamento(String id, String nombre, List<Contrato> contratos, List<Centros> centros, List<Proyecto> proyectos, List<Actividad> actividades, List<CampanyaMarketing> campanyasMarketing, List<Empresa> empresas, List<Convenio> convenios) {
        this.id = id;
        this.nombre = nombre;
        this.contratos = contratos;
        this.centros = centros;
        this.proyectos = proyectos;
        this.actividades = actividades;
        this.campanyasMarketing = campanyasMarketing;
        this.empresas = empresas;
        this.convenios = convenios;
    }

    public Departamento( ) {
    }

    //GETTERS SETTERS
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public List<Empresa> getEmpresas() {
        return empresas;
    }

    public void setEmpresas(List<Empresa> empresas) {
        this.empresas = empresas;
    }

    public List<CampanyaMarketing> getCampanyasMarketing() {
        return campanyasMarketing;
    }

    public void setCampanyasMarketing(List<CampanyaMarketing> campanyasMarketing) {
        this.campanyasMarketing = campanyasMarketing;
    }

    public List<Actividad> getActividades() {
        return actividades;
    }

    public void setActividades(List<Actividad> actividades) {
        this.actividades = actividades;
    }

    public List<Proyecto> getProyectos() {
        return proyectos;
    }

    public void setProyectos(List<Proyecto> proyectos) {
        this.proyectos = proyectos;
    }

    public List<Centros> getCentros() {
        return centros;
    }

    public void setCentros(List<Centros> centros) {
        this.centros = centros;
    }

    public List<Contrato> getContratos() {
        return contratos;
    }

    public void setContratos(List<Contrato> contratos) {
        this.contratos = contratos;
    }

    public List<Convenio> getConvenios() {
        return convenios;
    }

    public void setConvenios(List<Convenio> convenios) {
        this.convenios = convenios;
    }
}