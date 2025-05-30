package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Subvencion;
import es.impulsalicante.ApiFuturaAlicante.repository.SubvencionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SubvencionService {

    @Autowired
    private SubvencionRepository subvencionRepository;

    public List<Subvencion> getAllSubvenciones() {
        return subvencionRepository.findAll();
    }

    public Optional<Subvencion> getSubvencionById(String id) {
        return subvencionRepository.findById(id);
    }

    private String generarId(){
        Long count = subvencionRepository.count();
        return "S" + (count + 1);
    }
    public Subvencion createSubvencion(Subvencion subvencion) {
        String nuevoId = generarId();
        subvencion.setId(nuevoId);
        return subvencionRepository.save(subvencion);
    }

    public Subvencion updateSubvencion(String id, Subvencion subvencion) {
        subvencion.setId(id);
        return subvencionRepository.save(subvencion);
    }

    public void deleteSubvencion(String id) {
        subvencionRepository.deleteById(id);
    }
}
