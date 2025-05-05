package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Kpi;
import es.impulsalicante.ApiFuturaAlicante.repository.KpiRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class KpiService {
    @Autowired
    private KpiRepository repo;

    //GET
    public List<Kpi> getKpis() {
        return repo.findAll();
    }

    //GET by id
    public Kpi getKpiById(String id) {
        return repo.findById(id).get();
    }

    //POST
    public void postKpi(Kpi kpi) {
        repo.save(kpi);
    }

    //PUT
    public Kpi putKpi(String id, Kpi kpi) {
        Kpi kpi_mod = repo.findById(id).get();

        kpi_mod.setNombre(kpi.getNombre());
        kpi_mod.setDescripcion(kpi.getDescripcion());
        kpi_mod.setValor_esperado(kpi.getValor_esperado());
        kpi_mod.setValor_actual(kpi.getValor_actual());

        repo.save(kpi_mod);
        return kpi_mod;
    }

    //DELETE
    public void deleteKpi(String id) {
        Kpi kpi = repo.findById(id).get();
        repo.delete(kpi);
    }
}
