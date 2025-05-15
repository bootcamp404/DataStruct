package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Proyecto")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id_proyecto")
public class Proyecto {

    @Id
    @Column(name = "id_proyecto")
    private String id_proyecto;

    @Column(nullable = false)
    private String nombre;

    @Column
    private String objetivo;

    @Column
    private Date fecha_ini;
    @Column
    private Date fecha_fin;



    @ManyToOne
    @JoinColumn(name="id_departamento")
    @JsonManagedReference("dep-proy")
    private Departamento departamento;

    @OneToMany(mappedBy="proyecto")
    @JsonManagedReference("proy-centros")
    private List<Centros> centros;

    @OneToMany(mappedBy="proyecto")
    @JsonManagedReference("proy-subv")
    private List<Subvencion> subvenciones;




    public List<Subvencion> getSubvenciones() {
        return subvenciones;
    }

    public List<Centros> getCentros() {
        return centros;
    }

    public String getId_proyecto() {
        return id_proyecto;
    }

    public void setId_proyecto(String id_proyecto) {
        this.id_proyecto = id_proyecto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public Date getFecha_ini() {
        return fecha_ini;
    }

    public void setFecha_ini(Date fecha_ini) {
        this.fecha_ini = fecha_ini;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
    public Departamento getDepartamento() {
        return departamento;
    }



    public Proyecto (String id_proyecto,String nombre, String objetivo, Date fecha_ini, Date fecha_fin, Departamento departamento) {
        this.id_proyecto = id_proyecto;
        this.nombre = nombre;
        this.objetivo = objetivo;
        this.fecha_ini = fecha_ini;
        this.fecha_fin = fecha_fin;
        this.departamento = departamento;
    }

    public Proyecto ( ) { }
}
