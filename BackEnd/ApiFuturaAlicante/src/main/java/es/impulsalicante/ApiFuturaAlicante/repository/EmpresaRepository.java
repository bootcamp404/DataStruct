package es.impulsalicante.ApiFuturaAlicante.repository;

import es.impulsalicante.ApiFuturaAlicante.models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, String> {

    @Query("SELECT COUNT(e) FROM Empresa e WHERE YEAR(e.fechaCreacion) = :anio")
    int countEmpresasByAnio(int anio);



}
