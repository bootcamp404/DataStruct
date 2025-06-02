package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Kpi;
import es.impulsalicante.ApiFuturaAlicante.repository.KpiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class KpiService {

    @Autowired
    private KpiRepository kpiRepository;

    public List<Kpi> getAllKpi() {
        return kpiRepository.findAll();
    }

    public Optional<Kpi> getKpiById(String id) {
        return kpiRepository.findById(id);
    }

    private String generarId(){
        Long count = kpiRepository.count();
        return "K" + (count + 1);
    }
    public Kpi createKpi(Kpi kpi) {
        String nuevoId = generarId();
        kpi.setId_kpi(nuevoId);
        return kpiRepository.save(kpi);
    }

    public Kpi updateKpi(String id, Kpi kpi) {
        kpi.setId_kpi(id);
        return kpiRepository.save(kpi);
    }

    public void deleteKpi(String id) {
        kpiRepository.deleteById(id);
    }
}
