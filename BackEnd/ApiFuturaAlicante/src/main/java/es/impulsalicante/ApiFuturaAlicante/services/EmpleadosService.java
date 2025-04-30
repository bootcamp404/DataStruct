package es.impulsalicante.ApiFuturaAlicante.services;


import es.impulsalicante.ApiFuturaAlicante.models.Departamento;
import es.impulsalicante.ApiFuturaAlicante.repository.EmpleadosRepository;
import es.impulsalicante.ApiFuturaAlicante.repository.DepartamentosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class EmpleadosService {

    @Autowired
    private DepartamentosRepository departamentoRepository;

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


    public Empleados updateEmpleado(String dni, Empleados empleadoActualizado) {
        Empleados empleadoExistente = empleadoRepository.findById(dni)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        // Actualizar todos los campos excepto el DNI
        empleadoExistente.setNombre(empleadoActualizado.getNombre());
        empleadoExistente.setApellidos(empleadoActualizado.getApellidos());
        empleadoExistente.setEmail(empleadoActualizado.getEmail());
        empleadoExistente.setTelefono(empleadoActualizado.getTelefono());

        // Actualizar departamento
        if (empleadoActualizado.getDepartamento() != null) {
            Departamento departamento = departamentoRepository.findById(empleadoActualizado.getDepartamento().getId())
                    .orElseThrow(() -> new RuntimeException("Departamento no encontrado"));
            empleadoExistente.setDepartamento(departamento);
        }

        return empleadoRepository.save(empleadoExistente);
    }

    public void deleteEmpleado(String dni) {
        empleadoRepository.deleteById(dni);
    }
}