package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, String> {

    List<Proyecto> findByDepartamentoId(String idDepartamento);

    @Query("SELECT COUNT(p) FROM Proyecto p WHERE YEAR(p.fecha_ini) = :anio")
    int countProyectosByAnio(int anio);
}
