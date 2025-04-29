package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Usuario;
import es.impulsalicante.ApiFuturaAlicante.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosService {
    @Autowired
    private UsuariosRepository repositorio;

    //GET
    public List<Usuario> obtenerUsuarios() {
        return repositorio.findAll();
    }

    //GET by id
    public Usuario obtenerUsuarioPorId(String dni) {
        return repositorio.findById(dni).get();
    }

    //POST
    public void crearUsuario(Usuario user) {
        repositorio.save(user);
    }

    //PUT
    public Usuario editarUsuario(String id, Usuario user) {
        Usuario user_mod = repositorio.findById(id).get();

        user_mod.setNombre(user.getNombre());
        user_mod.setApellidos(user.getApellidos());
        user_mod.setEmail(user.getEmail());
        user_mod.setTelefono(user.getTelefono());
        user_mod.setContrasenya(user.getContrasenya());

        repositorio.save(user_mod);
        return user_mod;
    }

    //DELETE
    public void eliminarUsuario(String dni) {
        Usuario user = repositorio.findById(dni).get();
        repositorio.delete(user);
    }
}
