package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Empresa;
import es.impulsalicante.ApiFuturaAlicante.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }

    public Optional<Empresa> getEmpresaById(String id) {
        return empresaRepository.findById(id);
    }

    public Empresa createEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Empresa updateEmpresa(String id, Empresa empresa) {
        empresa.setIdEmpresa(id);
        return empresaRepository.save(empresa);
    }

    public void deleteEmpresa(String id) {
        empresaRepository.deleteById(id);
    }
}
