package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.ActividadValoracionParticipante;
import es.impulsalicante.ApiFuturaAlicante.models.ActividadValoracionParticipante.*;
import es.impulsalicante.ApiFuturaAlicante.models.ActividadValoracionParticipanteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActividadValoracionParticipanteRepository extends JpaRepository<ActividadValoracionParticipante, ActividadValoracionParticipanteId> {
}