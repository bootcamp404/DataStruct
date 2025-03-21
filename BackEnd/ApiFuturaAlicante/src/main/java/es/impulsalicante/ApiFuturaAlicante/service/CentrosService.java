package es.impulsalicante.ApiFuturaAlicante.service;


import es.impulsalicante.ApiFuturaAlicante.models.Centros;
import es.impulsalicante.ApiFuturaAlicante.repository.CentrosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CentrosService {

    @Autowired
    private CentrosRepository centroRepository;

    public List<Centros> getAllCentros() {
        return centroRepository.findAll();
    }

    public Centros getCentrosByID(int id_centro) {
        return centroRepository.findById(String.valueOf(id_centro)).orElse(null);
    }

    public Centros createCentros(Centros centro) {
        return centroRepository.save(centro);
    }

    public Centros updateCentros(int id_centro, Centros centro) {
        centro.setId_centro(id_centro);
        return centroRepository.save(centro);
    }

    public void deleteCentros(int id_centro) {
        centroRepository.deleteById(String.valueOf(id_centro));
    }
}