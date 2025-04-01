package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Centros;
import es.impulsalicante.ApiFuturaAlicante.repository.CentrosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CentrosService {

    @Autowired
    private CentrosRepository centroRepository;

    public List<Centros> getAllCentros() {
        return centroRepository.findAll();
    }

    public Optional<Centros> getCentroById(String id) {
        return centroRepository.findById(id);
    }

    public Centros createCentro(Centros centro) {
        return centroRepository.save(centro);
    }

    public Centros updateCentro(String id, Centros centro) {
        centro.setId(id);
        return centroRepository.save(centro);
    }

    public void deleteCentro(String id) {
        centroRepository.deleteById(id);
    }
}
