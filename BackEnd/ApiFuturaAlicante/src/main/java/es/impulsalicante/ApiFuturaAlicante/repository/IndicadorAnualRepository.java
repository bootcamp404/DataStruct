package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.IndicadorAnual;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IndicadorAnualRepository extends JpaRepository<IndicadorAnual, Long> {
    List<IndicadorAnual> findByAnioAndDepartamento(int anio, String departamento);
}
