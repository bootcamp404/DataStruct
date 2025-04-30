package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "contrato")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Contrato {
    //PROPIEDADES
    @Id
    @Column (name = "id_contrato")
    private String id;
    @Column(name = "importe_adjudicacion")
    private Double importe;
    @Column
    private Date fecha_creacion;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "id_tipo_contrato")
    private TipoContrato tipo_contrato;

    //CONSTRUCTORES
    public Contrato(String id, Double importe, Departamento departamento, Date fecha_creacion, TipoContrato tipo_contrato) {
        this.id = id;
        this.importe = importe;
        this.departamento = departamento;
        this.tipo_contrato = tipo_contrato;
        this.fecha_creacion = fecha_creacion;
    }

    public Contrato(){

    }

    //GETTERS
    public String getId() {
        return id;
    }

    public TipoContrato getTipo_contrato() {
        return tipo_contrato;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public Double getImporte() {
        return importe;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    //SETTERS
    public void setImporte(Double importe) {
        this.importe = importe;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public void setTipo_contrato(TipoContrato tipo_contrato) {
        this.tipo_contrato = tipo_contrato;
    }

    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }
}
