package es.impulsalicante.ApiFuturaAlicante.service;


import es.impulsalicante.ApiFuturaAlicante.models.Empleados;
import es.impulsalicante.ApiFuturaAlicante.repository.EmpleadosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmpleadosService {

    @Autowired
    private EmpleadosRepository empleadoRepository;

    public List<Empleados> getAllEmpleados() {
        return empleadoRepository.findAll();
    }

    public Empleados getEmpleadoByDni(String dni) {
        return empleadoRepository.findById(dni).orElse(null);
    }

    public Empleados createEmpleado(Empleados empleado) {
        return empleadoRepository.save(empleado);
    }

    public Empleados updateEmpleado(String dni, Empleados empleado) {
        empleado.setDni(dni);
        return empleadoRepository.save(empleado);
    }

    public void deleteEmpleado(String dni) {
        empleadoRepository.deleteById(dni);
    }
}