package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.SectorEmpresa;
import es.impulsalicante.ApiFuturaAlicante.repository.SectorEmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectorEmpresaService {

    private final SectorEmpresaRepository repository;

    public SectorEmpresaService(SectorEmpresaRepository repository) {
        this.repository = repository;
    }

    public List<SectorEmpresa> findAll() {
        return repository.findAll();
    }

    public Optional<SectorEmpresa> findById(Integer id) {
        return repository.findById(id);
    }

    public SectorEmpresa save(SectorEmpresa sector) {
        return repository.save(sector);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
