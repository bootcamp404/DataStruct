package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Actividad;
import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import es.impulsalicante.ApiFuturaAlicante.models.Subvencion;
import es.impulsalicante.ApiFuturaAlicante.repository.ActividadRepository;
import es.impulsalicante.ApiFuturaAlicante.repository.DepartamentosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActividadService {


    @Autowired
    private ActividadRepository actividadRepository;

    //GET
    public List<Actividad> getActividad() {
        return actividadRepository.findAll();
    }

    //GET by id
    public Optional<Actividad> getActividadByID(String id) {
        return actividadRepository.findById(id);
    }

    //POST
    public Actividad createActividad(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    //PUT
    public Actividad updateActividad(String id, Actividad actividad) {
        actividad.setId(id);
        return actividadRepository.save(actividad);
    }

    //DELETE
    public void deleteActividad(String id) {
        Actividad actividad = actividadRepository.findById(id).get();
        actividadRepository.delete(actividad);
    }
}