package es.impulsalicante.ApiFuturaAlicante.models;

import lombok.Getter;

@Getter
public class Empleados {

    private String dni;
    private String nombre;
    private String apellidos;
    private int telefono;
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
