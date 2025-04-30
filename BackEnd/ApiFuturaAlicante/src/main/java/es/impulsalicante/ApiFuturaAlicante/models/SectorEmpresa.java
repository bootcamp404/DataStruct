package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;

@Entity
@Table(name = "sector_empresa")
public class SectorEmpresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sector")
    private Integer idSector;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    public Integer getIdSector() {
        return idSector;
    }

    public void setIdSector(Integer idSector) {
        this.idSector = idSector;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
