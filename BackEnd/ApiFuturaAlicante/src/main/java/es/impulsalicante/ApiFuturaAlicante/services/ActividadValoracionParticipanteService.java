package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.repository.ActividadValoracionParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActividadValoracionParticipanteService {
    @Autowired
    ActividadValoracionParticipanteRepository actividadValoracionParticipanteRepository;

    //GET
    public List<ActividadValoracionParticipante> getActividadValoracionParticipante() {
        return actividadValoracionParticipanteRepository.findAll();
    }

    //GET by id
    public Optional<ActividadValoracionParticipante> getActividadValoracionParticipanteByID(String idActividad, String idParticipante) {
        ActividadValoracionParticipanteId id = new ActividadValoracionParticipanteId(idActividad, idParticipante);
        return actividadValoracionParticipanteRepository.findById(id);
    }

    //POST
    public ActividadValoracionParticipante createActividadValoracionParticipante(ActividadValoracionParticipante actividadValoracionParticipante) {
        return actividadValoracionParticipanteRepository.save(actividadValoracionParticipante);
    }

    //PUT
    public ActividadValoracionParticipante updateActividadValoracionParticipante(ActividadValoracionParticipante actividadValoracionParticipante) {
        return actividadValoracionParticipanteRepository.save(actividadValoracionParticipante);
    }

    //DELETE
    public void deleteActividadValoracionParticipante(String idActividad, String idParticipante) {
        ActividadValoracionParticipanteId id = new ActividadValoracionParticipanteId(idActividad, idParticipante);
        Optional<ActividadValoracionParticipante> optionalEntity = actividadValoracionParticipanteRepository.findById(id);

        if (optionalEntity.isPresent()) {
            actividadValoracionParticipanteRepository.delete(optionalEntity.get());
        } else {
            throw new RuntimeException("Registro no encontrado con id: " + idActividad + ", " + idParticipante);
        }
    }
}