package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Convenio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConvenioRepository extends JpaRepository<Convenio, String> {
    List<Convenio> findByDepartamento_Id(String idDepartamento); // Para 2.6.2 en Empleo y Formación
}
