package es.impulsalicante.ApiFuturaAlicante.repository;


import es.impulsalicante.ApiFuturaAlicante.models.Empleados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadosRepository extends JpaRepository<Empleados, String> {
}