package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Valoracion;
import es.impulsalicante.ApiFuturaAlicante.repository.ValoracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ValoracionService {

    @Autowired
    private ValoracionRepository valoracionRepository;

    public List<Valoracion> getAllValoraciones() {
        return valoracionRepository.findAll();
    }

    public Optional<Valoracion> getValoracionById(String id) {
        return valoracionRepository.findById(id);
    }

    public Valoracion createValoracion(Valoracion valoracion) {
        return valoracionRepository.save(valoracion);
    }

    public Valoracion updateValoracion(String id, Valoracion valoracion) {
        valoracion.setId(id);
        return valoracionRepository.save(valoracion);
    }

    public void deleteValoracion(String id) {
        valoracionRepository.deleteById(id);
    }
}
