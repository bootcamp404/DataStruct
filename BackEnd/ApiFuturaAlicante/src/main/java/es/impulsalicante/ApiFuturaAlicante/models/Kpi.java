package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "kpis")
public class Kpi {
    @Id
    private String id_kpi;
    @Column(nullable = false)
    private String nombre;
    @Column
    private String descripcion;
    @Column
    private Float valor_esperado;
    @Column
    private Float valor_actual;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_empresa", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Empresa empresa;

    //Getters y setters
    public String getId() {
        return id_kpi;
    }

    public void setId(String id) {
        this.id_kpi = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Float getValor_esperado() {
        return valor_esperado;
    }

    public void setValor_esperado(Float valor_esperado) {
        this.valor_esperado = valor_esperado;
    }

    public Float getValor_actual() {
        return valor_actual;
    }

    public void setValor_actual(Float valor_actual) {
        this.valor_actual = valor_actual;
    }

    //Constructores
    public Kpi(String id_kpi, String nombre, String descripcion, Float valor_esperado, Float valor_actual) {
        this.id_kpi = id_kpi;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.valor_esperado = valor_esperado;
        this.valor_actual = valor_actual;
    }

    public Kpi() {
    }
}
