package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.TipoContrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoContratosRepository extends JpaRepository<TipoContrato, String> {
}
