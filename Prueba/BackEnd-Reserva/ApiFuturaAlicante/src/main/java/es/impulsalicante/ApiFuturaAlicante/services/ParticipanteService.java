package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Participante;
import es.impulsalicante.ApiFuturaAlicante.repository.ParticipanteRepository;
import jakarta.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ParticipanteService {


    @Autowired
    private ParticipanteRepository participanteRepository;

    //GET
    public List<Participante> getParticipantes() {
        return participanteRepository.findAll();
    }

    //GET by id
    public Optional<Participante> getParticipanteByID(String id) {
        return participanteRepository.findById(id);
    }

    //POST
    public Participante createParticipante(Participante participante) {
        return participanteRepository.save(participante);
    }

    //PUT
    public Participante updateParticipante(String id, Participante participante) {
        participante.setId(id);
        return participanteRepository.save(participante);
    }

    //DELETE
    public void deleteParticipante(String id) {
        Participante participante = participanteRepository.findById(id).get();
        participanteRepository.delete(participante);
    }
}