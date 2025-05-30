package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.CampanyaMarketing;
import es.impulsalicante.ApiFuturaAlicante.repository.CampanyaMarketingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CampanyaMarketingService {

    @Autowired
    private CampanyaMarketingRepository repo;

    public List<CampanyaMarketing> getAllCampanyas() {

        return repo.findAll();
    }

    public Optional<CampanyaMarketing> getCampanyaById(String id) {

        return repo.findById(id);
    }

    private String generarId(){
        Long count = repo.count();
        return "CM" + (count + 1);
    }
    public CampanyaMarketing createCampanya(CampanyaMarketing campanyaMarketing) {
        String nuevoId = generarId();
        campanyaMarketing.setId(nuevoId);
        return repo.save(campanyaMarketing);
    }

    public CampanyaMarketing updateCampanya(String id, CampanyaMarketing campanyaMarketing) {
        campanyaMarketing.setId(id);
        return repo.save(campanyaMarketing);
    }

    public void deleteCampanya(String id) {
        repo.deleteById(id);
    }
}
