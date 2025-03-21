package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Departamento;

import java.util.List;

public interface DepartamentoService {
    public List<Departamento> getDepartamentos();
    public Departamento getDepartamentoById(int id);
    public Departamento postDepartamento(Departamento dep);
    public Departamento putDepartamento(Departamento dep);
    public Departamento patchDepartamento(Departamento dep);
    public Departamento deleteDepartamento(int id);
}
