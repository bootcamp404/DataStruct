package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Imagen;
import es.impulsalicante.ApiFuturaAlicante.repository.ImagenRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    public List<Imagen> obtenerTodas() {
        return imagenRepository.findAll();
    }

    public List<Imagen> obtenerPorCategoria(String categoria) {
        return imagenRepository.findByCategoria(categoria);
    }

    public Imagen guardar(Imagen imagen) {
        return imagenRepository.save(imagen);
    }

    public void eliminar(Long id) {
        imagenRepository.deleteById(id);
    }


}
