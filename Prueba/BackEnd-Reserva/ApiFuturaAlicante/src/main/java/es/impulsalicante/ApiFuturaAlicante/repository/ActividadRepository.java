package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, String> {
}
