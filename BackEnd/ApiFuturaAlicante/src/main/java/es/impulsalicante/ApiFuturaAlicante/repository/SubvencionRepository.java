package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Subvencion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface SubvencionRepository extends JpaRepository<Subvencion, String> {

    @Query("SELECT SUM(s.importe) FROM Subvencion s WHERE s.entidad IS NOT NULL")
    BigDecimal sumImporteByEntidadIsNotNull();

    @Query("SELECT COUNT(s) FROM Subvencion s WHERE s.entidad IS NOT NULL")
    int countByEntidadIsNotNull();
}
