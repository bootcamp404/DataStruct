package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.IndicadorAnual;
import es.impulsalicante.ApiFuturaAlicante.repository.IndicadorAnualRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IndicadorAnualService {

    @Autowired
    private IndicadorAnualRepository repository;

    // Guardar directamente
    public IndicadorAnual guardar(IndicadorAnual indicador) {
        return repository.save(indicador);
    }

    // Guardar solo si no existe ya ese año y departamento
    public IndicadorAnual guardarSiNoExiste(IndicadorAnual indicador) {
        boolean existe = repository.existsByAnioAndDepartamento(
                indicador.getAnio(), indicador.getDepartamento()
        );
        return existe ? null : repository.save(indicador);
    }

    // Obtener todos los registros
    public List<IndicadorAnual> obtenerTodos() {
        return repository.findAll();
    }

    // Buscar por año y departamento
    public List<IndicadorAnual> obtenerPorAnioYDepartamento(int anio, String departamento) {
        return repository.findByAnioAndDepartamento(anio, departamento);
    }

    // Buscar todos los registros de un año
    public List<IndicadorAnual> obtenerPorAnio(int anio) {
        return repository.findByAnio(anio);
    }

    // Obtener el primer indicador global de un año
    public IndicadorAnual obtenerUnoPorAnio(int anio) {
        return repository.findByAnio(anio).stream().findFirst().orElse(null);
    }

    // Eliminar por ID
    public void eliminarPorId(Long id) {
        repository.deleteById(id);
    }
}
