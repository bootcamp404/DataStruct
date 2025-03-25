package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
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
        try{
            departamentos.add(dep);
            return dep;
        }
        //Devolverá null en caso de fallar la puesta en la base de datos
        catch(Exception e){
            return null;
        }
    }

    //PUT
    public Departamento putDepartamento(Departamento dep_mod){
        for(Departamento dep_actual : departamentos){

            //Departamento encontrado
            if (dep_actual.getId() == dep_mod.getId()){
                dep_actual.setNombre(dep_mod.getNombre());
                return dep_actual;
            }
        }
        //no encontrado
        return null;
    }

    //DELETE
    public Departamento deleteDepartamento(int id){
        for(Departamento d : departamentos){
            //Encontrado
            if(d.getId() == id){
                Departamento dep = d;
                departamentos.remove(d);
                return dep;
            }
        }
        //no encontrado
        return null;
    }
}
