package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import es.impulsalicante.ApiFuturaAlicante.repository.DepartamentosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartamentosService {

    @Autowired
    private DepartamentosRepository repo_departamentos;

    //GET
    public List<Departamento> getDepartamentos(){
        return repo_departamentos.findAll();
    }

    //GET by id
    public Departamento getDepartamentoById(int id){
        return repo_departamentos.findById(id).get();
    }

    //POST
    public void postDepartamento(Departamento dep){
        repo_departamentos.save(dep);
    }

    //PUT
    public Departamento putDepartamento(Departamento dep){
        Departamento dep_mod = repo_departamentos.findById(dep.getId()).get();

        dep_mod.setNombre(dep.getNombre());

        return dep_mod;
    }

    //DELETE
    public void deleteDepartamento(int id) {
        Departamento dep = repo_departamentos.findById(id).get();
        repo_departamentos.delete(dep);
    }
}