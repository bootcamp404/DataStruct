package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Actividad;
import es.impulsalicante.ApiFuturaAlicante.repository.ActividadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActividadService {


    @Autowired
    private ActividadRepository repo;

    //GET
    public List<Actividad> getActividad() {
        return repo.findAll();
    }

    //GET by id
    public Optional<Actividad> getActividadByID(String id) {
        return repo.findById(id);
    }

    //POST
    private String generarId(){
        Long count = repo.count();
        return "A" + (count + 1);
    }
    public Actividad createActividad(Actividad actividad) {
        String nuevoId = generarId();
        actividad.setId(nuevoId);
        return repo.save(actividad);
    }

    //PUT
    public Actividad updateActividad(String id, Actividad actividad) {
        actividad.setId(id);
        return repo.save(actividad);
    }

    //DELETE
    public void deleteActividad(String id) {
        Actividad actividad = repo.findById(id).get();
        repo.delete(actividad);
    }
}