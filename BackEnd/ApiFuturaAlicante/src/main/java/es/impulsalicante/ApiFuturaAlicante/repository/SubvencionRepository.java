package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.dto.AyudaEmpresaDTO;
import es.impulsalicante.ApiFuturaAlicante.models.Subvencion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SubvencionRepository extends JpaRepository<Subvencion, String> {

    @Query("SELECT SUM(s.importe) FROM Subvencion s WHERE s.entidad IS NOT NULL")
    BigDecimal sumImporteByEntidadIsNotNull();

    @Query("""
    SELECT COALESCE(SUM(s.importe), 0)
      FROM Subvencion s
     WHERE s.proyecto.id = 'P100'
       AND FUNCTION('YEAR', s.fecha_creacion) = :anio
  """)
    BigDecimal sumAyudasObservatorioByAnio(@Param("anio") int anio);

    @Query("SELECT COUNT(s) FROM Subvencion s WHERE s.entidad IS NOT NULL")
    int countByEntidadIsNotNull();


    @Query("SELECT s FROM Subvencion s WHERE s.proyecto.id IN :proyectosIds")
    List<Subvencion> obtenerAyudasPorProyectos(@Param("proyectosIds") List<String> proyectosIds);



}
