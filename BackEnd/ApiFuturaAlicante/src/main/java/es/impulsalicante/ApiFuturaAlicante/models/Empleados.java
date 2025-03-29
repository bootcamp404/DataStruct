package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;


@Entity
@Table(name = "empleados")
@Getter
public class Empleados {
    @Id
    private String dni;
    @Column
    private String nombre;
    @Column
    private String apellidos;
    @Column
    private int telefono;
    @Column
    private String email;


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public Empleados (String dni, String nombre, String apellidos, String email, int telefono){
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
    }
}
