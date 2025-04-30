package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.repository.TerritorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TerritorioService {

    @Autowired
    private TerritorioRepository territorioRepository;

    public List<Territorio> getAllTerritorios() {
        return territorioRepository.findAll();
    }

    public Optional<Territorio> getTerritorioById(String id) {
        return territorioRepository.findById(id);
    }

    public Territorio createTerritorio(Territorio territorio) {
        return territorioRepository.save(territorio);
    }

    public Territorio updateTerritorio(String id, Territorio territorio) {
        territorio.setId(id);
        return territorioRepository.save(territorio);
    }

    public void deleteTerritorio(String id) {
        territorioRepository.deleteById(id);
    }
}
