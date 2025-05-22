package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartamentosRepository extends JpaRepository<Departamento, String> {


    @Query("SELECT d FROM Departamento d")
    List<Departamento> findAllDepartamentos();
}
