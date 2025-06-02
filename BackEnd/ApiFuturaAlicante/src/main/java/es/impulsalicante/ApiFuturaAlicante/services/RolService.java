package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Rol;
import es.impulsalicante.ApiFuturaAlicante.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RolService {
    @Autowired
    private RolRepository repo;

    //GET
    public List<Rol> obtenerRoles() {
        return repo.findAll();
    }

    //GET by id
    public Rol obtenerRol(Integer id) {
        return repo.findById(id).get();
    }

    //POST
    public void crearRol(Rol rol) {
        repo.save(rol);
    }

    //PUT
    public Rol modificarRol(Integer id, Rol rol) {
        rol.setId(id);
        return repo.save(rol);
    }

    //DELETE
    public void eliminarRol(Integer id) {
        Rol rol = repo.findById(id).get();
        repo.delete(rol);
    }
}
