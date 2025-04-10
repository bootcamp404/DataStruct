package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.TipoContrato;
import es.impulsalicante.ApiFuturaAlicante.repository.TipoContratosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TiposContratosService {
    @Autowired
    private TipoContratosRepository repositorio;

    //GET
    public List<TipoContrato> obtenerTiposContratos(){
        return repositorio.findAll();
    }

    //GET by id
    public TipoContrato obtenerTipoContratoPorId(String id){
        return repositorio.findById(id).get();
    }

    //POST
    public TipoContrato CrearTipoContrato(TipoContrato tipo_contrato){
        return repositorio.save(tipo_contrato);
    }

    //PUT
    public TipoContrato EditarTipoContrato(String id, TipoContrato tipo_contrato){
        TipoContrato tipo_contrato_mod = repositorio.findById(id).get();

        tipo_contrato_mod.setNombre(tipo_contrato.getNombre());
        tipo_contrato_mod.setContratos(tipo_contrato.getContratos());

        repositorio.save(tipo_contrato_mod);
        return tipo_contrato_mod;
    }

    //DELETE
    public void eliminarTipoContrato(String id){
        TipoContrato tipo_contrato = repositorio.findById(id).get();

        repositorio.delete(tipo_contrato);
    }
}
