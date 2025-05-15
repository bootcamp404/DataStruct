package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, String> {
    List<Actividad> findByDepartamentoId(String IdDepartamento);

    @Query("SELECT a FROM Actividad a WHERE a.departamento.id = :depId AND LOWER(a.descripcion) LIKE %:keyword%")
    List<Actividad> findByDepartamentoAndKeyword(@Param("depId") String depId, @Param("keyword") String keyword);

}
