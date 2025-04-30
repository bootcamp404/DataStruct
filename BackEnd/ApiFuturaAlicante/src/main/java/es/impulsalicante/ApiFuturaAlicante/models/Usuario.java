package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    //PROPIEDADES
    @Id
    @Email(message = "Debe ingresar un email válido")
    private String email;
    @Column @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @Column @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;
    @Column @Pattern(regexp = "\\d{9,12}", message = "El teléfono debe tener entre 9 y 12 dígitos")
    private String telefono;
    @Column
    private String contrasenya;

    //CONSTRUCTOR
    public Usuario(String telefono, String email, String apellidos, String nombre, String contrasenya) {
        this.telefono = telefono;
        this.email = email;
        this.apellidos = apellidos;
        this.nombre = nombre;
        this.contrasenya = contrasenya;
    }
    public Usuario(){

    }

    //GETTERS SETTERS
    public String getContrasenya() {
        return contrasenya;
    }

    public void setContrasenya(String contrasenya) {
        this.contrasenya = contrasenya;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
