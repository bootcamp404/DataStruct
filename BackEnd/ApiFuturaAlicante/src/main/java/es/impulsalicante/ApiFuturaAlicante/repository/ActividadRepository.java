package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, String> {

    // Ya existente:
    List<Actividad> findByDepartamentoId(String IdDepartamento);

    @Query("""
       SELECT a
         FROM Actividad a
        WHERE a.departamento.id   = :depId
          AND FUNCTION('YEAR', a.fecha_inicio) = :anio
        ORDER BY a.fecha_inicio ASC
    """)
    List<Actividad> findByDepartamentoAndAnioOrderByFechaInicioAsc(
            @Param("depId") String depId,
            @Param("anio") int anio
    );

    @Query("SELECT a FROM Actividad a WHERE a.departamento.id = :depId AND LOWER(a.descripcion) LIKE %:keyword%")
    List<Actividad> findByDepartamentoAndKeyword(
            @Param("depId") String depId,
            @Param("keyword") String keyword
    );

    @Query("""
    SELECT a 
      FROM Actividad a 
     WHERE a.departamento.id = :depId
       AND FUNCTION('YEAR', a.fecha_inicio) = :anio
  """)
    List<Actividad> findByDepartamentoAndYear(
            @Param("depId") String depId,
            @Param("anio") int anio
    );
    @Query("""
      SELECT COALESCE(SUM(a.num_participantes), 0)
      FROM Actividad a
      WHERE a.departamento.id = 'D2'
        AND FUNCTION('YEAR', a.fecha_fin) = :anio
    """)
    Integer countPersonasContratadasObservatorio(@Param("anio") int anio);

    @Query("""
               SELECT a 
                 FROM Actividad a 
                WHERE a.departamento.id = :depId 
                  AND (LOWER(a.nombre) LIKE %:keyword% 
                       OR LOWER(a.descripcion) LIKE %:keyword%)
            """)
    List<Actividad> findActividadesDesarrolloLocal(
            @Param("depId") String depId,
            @Param("keyword") String keyword
    );
}
