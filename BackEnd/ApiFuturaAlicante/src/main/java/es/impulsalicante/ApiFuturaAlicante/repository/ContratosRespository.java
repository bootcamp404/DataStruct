package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}
