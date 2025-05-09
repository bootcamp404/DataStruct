package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.IndicadorAnual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface IndicadorAnualRepository extends JpaRepository<IndicadorAnual, Long> {

    List<IndicadorAnual> findByAnio(int anio);

    List<IndicadorAnual> findByAnioAndDepartamento(int anio, String departamento);

    @Query("SELECT SUM(i.horasOrientacion) FROM IndicadorAnual i WHERE i.anio = :anio")
    BigDecimal sumHorasOrientacionByAnio(@Param("anio") int anio);

    boolean existsByAnioAndDepartamento(int anio, String departamento);

    @Query("SELECT SUM(i.horasFormacion) FROM IndicadorAnual i WHERE i.anio = :anio")
    BigDecimal sumHorasFormacionByAnio(@Param("anio") int anio);

    @Query("SELECT SUM(i.ofertasEmpleo) FROM IndicadorAnual i WHERE i.anio = :anio")
    Integer sumOfertasEmpleoByAnio(@Param("anio") int anio);

    @Query("SELECT SUM(i.puestosTrabajo) FROM IndicadorAnual i WHERE i.anio = :anio")
    Integer sumPuestosTrabajoByAnio(@Param("anio") int anio);

    @Query("SELECT SUM(i.ayudasEmpresas) FROM IndicadorAnual i WHERE i.anio = :anio")
    BigDecimal sumAyudasEmpresasByAnio(@Param("anio") int anio);
}

