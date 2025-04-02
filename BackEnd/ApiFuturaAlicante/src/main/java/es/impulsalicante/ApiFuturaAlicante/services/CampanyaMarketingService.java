package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.CampanyaMarketing;
import es.impulsalicante.ApiFuturaAlicante.models.Proyecto;
import es.impulsalicante.ApiFuturaAlicante.repository.CampanyaMarketingRepository;
import es.impulsalicante.ApiFuturaAlicante.repository.DepartamentosRepository;
import es.impulsalicante.ApiFuturaAlicante.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CampanyaMarketingService {

    @Autowired
    private CampanyaMarketingRepository campanyaMarketingRepository;

    public List<CampanyaMarketing> getAllCampanyas() {

        return campanyaMarketingRepository.findAll();
    }

    public Optional<CampanyaMarketing> getCampanyaById(String id) {

        return campanyaMarketingRepository.findById(id);
    }

    public CampanyaMarketing createCampanya(CampanyaMarketing campanyaMarketing) {
        return campanyaMarketingRepository.save(campanyaMarketing);
    }

    public CampanyaMarketing updateCampanya(String id, CampanyaMarketing campanyaMarketing) {
        campanyaMarketing.setId(id);
        return campanyaMarketingRepository.save(campanyaMarketing);
    }

    public void deleteCampanya(String id) {
        campanyaMarketingRepository.deleteById(id);
    }
}
