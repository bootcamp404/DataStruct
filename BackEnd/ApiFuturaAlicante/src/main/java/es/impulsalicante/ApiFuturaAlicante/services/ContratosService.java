package es.impulsalicante.ApiFuturaAlicante.services;

import com.fasterxml.jackson.databind.util.JSONPObject;
import es.impulsalicante.ApiFuturaAlicante.models.Contrato;
import es.impulsalicante.ApiFuturaAlicante.repository.ContratosRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ContratosService {
    @Autowired
    private ContratosRespository repositorio;

    //GET
    public List<Contrato> obtenerContratos(){
        return repositorio.findAll();
    }

    //GET by id
    public Contrato obtenerContratoPorId(String id){
        return repositorio.findById(id).get();
    }

    //POST
    public Contrato CrearContrato(Contrato contrato){
        return repositorio.save(contrato);
    }

    //PUT
    public Contrato EditarContrato(Contrato contrato){
        Contrato contrato_mod = repositorio.findById(contrato.getId()).get();

        contrato_mod.setImporte(contrato.getImporte());
        contrato_mod.setDepartamento(contrato.getDepartamento());
        contrato_mod.setTipo_contrato(contrato.getTipo_contrato());

        repositorio.save(contrato_mod);
        return contrato_mod;
    }

    //DELETE
    public void EliminarContrato(String id){
        Contrato contrato = repositorio.findById(id).get();

        repositorio.delete(contrato);
    }
}
