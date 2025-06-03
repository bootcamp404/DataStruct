package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Imagen;
import es.impulsalicante.ApiFuturaAlicante.repository.ImagenRepository;
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

    public List<Imagen> obtenerPorIds(List<Long> ids) {
        if(ids == null || ids.isEmpty()) {
            return List.of();
        }
        return imagenRepository.findAllById(ids);
    }

    public Imagen guardar(Imagen imagen) {
        return imagenRepository.save(imagen);
    }
}
