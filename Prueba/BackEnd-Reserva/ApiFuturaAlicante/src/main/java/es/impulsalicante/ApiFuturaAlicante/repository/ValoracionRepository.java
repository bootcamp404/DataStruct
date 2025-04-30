package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValoracionRepository extends JpaRepository<Valoracion, String> {
}
