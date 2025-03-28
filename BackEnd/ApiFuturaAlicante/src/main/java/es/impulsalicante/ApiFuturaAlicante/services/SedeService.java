package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Sede;
import es.impulsalicante.ApiFuturaAlicante.repository.SedeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SedeService {

    @Autowired
    private SedeRepository sedeRepository;

    public List<Sede> getAllSedes() {
        return sedeRepository.findAll();
    }

    public Optional<Sede> getSedeById(String id) {
        return sedeRepository.findById(id);
    }

    public Sede createSede(Sede sede) {
        return sedeRepository.save(sede);
    }

    public Sede updateSede(String id, Sede sede) {
        sede.setId_centro(id);
        return sedeRepository.save(sede);
    }

    public void deleteSede(String id) {
        sedeRepository.deleteById(id);
    }
}
