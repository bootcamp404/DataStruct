package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.EstadoSubvencion;
import es.impulsalicante.ApiFuturaAlicante.repository.EstadoSubvencionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EstadoSubvencionService {

    @Autowired
    private EstadoSubvencionRepository estadoSubvencionRepository;

    public List<EstadoSubvencion> getAllEstadoSubvenciones() {
        return estadoSubvencionRepository.findAll();
    }

    public Optional<EstadoSubvencion> getEstadoSubvencionById(String id) {
        return estadoSubvencionRepository.findById(id);
    }

    private String generarId(){
        Long count = estadoSubvencionRepository.count();
        return "ES" + (count + 1);
    }
    public EstadoSubvencion createEstadoSubvencion(EstadoSubvencion estadoSubvencion) {
        String nuevoId = generarId();
        estadoSubvencion.setId(nuevoId);
        return estadoSubvencionRepository.save(estadoSubvencion);
    }

    public EstadoSubvencion updateEstadoSubvencion(String id, EstadoSubvencion estadoSubvencion) {
        estadoSubvencion.setId(id);
        return estadoSubvencionRepository.save(estadoSubvencion);
    }

    public void deleteEstadoSubvencion(String id) {
        estadoSubvencionRepository.deleteById(id);
    }
}
