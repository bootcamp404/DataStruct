package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.IndicadorAnual;
import es.impulsalicante.ApiFuturaAlicante.repository.IndicadorAnualRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IndicadorAnualService {

    @Autowired
    private IndicadorAnualRepository repository;

    public IndicadorAnual guardar(IndicadorAnual indicador) {
        return repository.save(indicador);
    }

    public List<IndicadorAnual> obtenerPorAnioYDepartamento(int anio, String departamento) {
        return repository.findByAnioAndDepartamento(anio, departamento);
    }

    public List<IndicadorAnual> obtenerTodos() {
        return repository.findAll();
    }

    public void eliminarPorId(Long id) {
        repository.deleteById(id);
    }
}
