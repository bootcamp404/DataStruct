package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;

import java.util.List;

public interface DepartamentoService {
    public List<Departamento> getDepartamentos();
    public Departamento getDepartamentoById(int id);
    public void postDepartamento(Departamento dep);
    public void putDepartamento(Departamento dep);
    public void patchDepartamento(Departamento dep);
    public void deleteDepartamento(int id);
}
