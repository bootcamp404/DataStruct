package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Usuario;
import es.impulsalicante.ApiFuturaAlicante.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuariosService {

    @Autowired
    private UsuariosRepository usuariosRepository;

    public List<Usuario> getAllUsuarios() {
        return usuariosRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuariosRepository.findById(id);
    }

    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuariosRepository.findByEmail(email);
    }

    public Usuario createUsuario(Usuario usuario) {
        return usuariosRepository.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuario) {
        usuario.setId(id);
        return usuariosRepository.save(usuario);
    }

    public void deleteUsuario(Long id) {
        usuariosRepository.deleteById(id);
    }
}
