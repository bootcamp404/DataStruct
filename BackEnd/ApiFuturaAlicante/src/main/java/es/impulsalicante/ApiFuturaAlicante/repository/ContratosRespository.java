package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ContratosRespository extends JpaRepository<Contrato, String> {
    @Query("""
       SELECT COUNT(c)
         FROM Contrato c
        WHERE c.departamento.id = :departamentoId
          AND FUNCTION('YEAR', c.fecha_creacion) = :anio
    """)
    long countByDepartamentoAndYear(@Param("departamentoId") String departamentoId,
                                    @Param("anio") int anio);


    @Query("SELECT COUNT(c) FROM Contrato c WHERE FUNCTION('YEAR', c.fecha_creacion) = :anio")
    long countByYear(@Param("anio") int anio);


    // 2) Suma de importes de un departamento en un año
    @Query("""
       SELECT COALESCE(SUM(c.importe), 0)
         FROM Contrato c
        WHERE c.departamento.id      = :departamentoId
          AND FUNCTION('YEAR', c.fecha_creacion) = :anio
    """)
    BigDecimal sumImporteByDepartamentoAndYear(@Param("departamentoId") String departamentoId,
                                               @Param("anio") int anio);

    // 3) Conteo por tipo ("mayor"/"menor") de un departamento en un año
    @Query("""
       SELECT COUNT(c)
         FROM Contrato c
        WHERE c.departamento.id              = :departamentoId
          AND c.tipo_contrato.id            = :tipo
          AND FUNCTION('YEAR', c.fecha_creacion) = :anio
    """)
    long countByDepartamentoAndTipoAndYear(
            @Param("departamentoId") String departamentoId,
            @Param("tipo") String tipoContratoId,
            @Param("anio") int anio
    );

    @Query("""
       SELECT COALESCE(SUM(c.importe), 0)
         FROM Contrato c
        WHERE c.departamento.id              = :departamentoId
          AND c.tipo_contrato.id            = :tipo
          AND FUNCTION('YEAR', c.fecha_creacion) = :anio
    """)
    BigDecimal sumImporteByDepartamentoAndTipoAndYear(
            @Param("departamentoId") String departamentoId,
            @Param("tipo") String tipoContratoId,
            @Param("anio") int anio
    );
}
