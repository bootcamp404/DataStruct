package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DepartamentoServiceImpl implements DepartamentoService{
    //lista provisional de departamentos (se cambiará en un futuro por el acceso a BD)
    private List<Departamento> departamentos = new ArrayList<>(Arrays.asList(
            new Departamento(1, "formación"),
            new Departamento(2, "administración"),
            new Departamento(3, "marketing"),
            new Departamento(4, "empleo")
    ));

    //GET
    public List<Departamento> getDepartamentos(){
        return departamentos;
    }

    //GET by id
    public Departamento getDepartamentoById(int id){
        for(Departamento d : departamentos){
            if(d.getId() == id){
                return d;
            }
        }
        //si no se encuentra se devolverá null
        return null;
    }

    //POST
    public Departamento postDepartamento(Departamento dep){
        departamentos.add(dep);
        return dep;
    }
}
