package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Actividad;
import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, String> {

    List<Proyecto> findByDepartamentoId(String idDepartamento);

    @Query("SELECT COUNT(p) FROM Proyecto p WHERE YEAR(p.fecha_ini) = :anio")
    int countProyectosByAnio(int anio);

    @Query("SELECT p FROM Proyecto p WHERE p.departamento.id = :depId AND LOWER(p.objetivo) LIKE %:keyword%")
    List<Proyecto> findByDepartamentoAndKeyword(@Param("depId") String depId, @Param("keyword") String keyword);

    @Query("""
               SELECT p 
                 FROM Proyecto p 
                WHERE p.departamento.id = :depId 
                  AND (LOWER(p.nombre) LIKE %:keyword% 
                       OR LOWER(p.objetivo) LIKE %:keyword%)
            """)
    List<Proyecto> findProgramasDesarrolloLocal(
            @Param("depId") String depId,
            @Param("keyword") String keyword
    );

}