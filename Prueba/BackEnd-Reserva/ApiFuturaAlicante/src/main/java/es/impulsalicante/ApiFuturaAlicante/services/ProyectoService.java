package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.repository.DepartamentosRepository;
import es.impulsalicante.ApiFuturaAlicante.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProyectoService {

    @Autowired
    private DepartamentosRepository departamentoRepository;
    @Autowired
    private ProyectoRepository proyectoRepository;

    public List<Proyecto> getAllProyectos() {
        return proyectoRepository.findAll();
    }

    public Optional<Proyecto> getProyectoById(String id) {
        return proyectoRepository.findById(id);
    }

    public Proyecto createProyecto(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    public Proyecto updateProyecto(String id, Proyecto proyecto) {
        proyecto.setId_proyecto(id);
        return proyectoRepository.save(proyecto);
    }

    public void deleteProyecto(String id) {
        proyectoRepository.deleteById(id);
    }
}
