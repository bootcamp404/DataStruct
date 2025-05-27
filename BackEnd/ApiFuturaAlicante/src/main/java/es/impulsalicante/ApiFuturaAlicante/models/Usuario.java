package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    //PROPIEDADES
    @Id
    @Email(message = "Debe ingresar un email válido")
    private String email;
    @Column (nullable = true)
    private String nombre;
    @Column (nullable = true)
    private String apellidos;
    @Column(nullable = true)
    @Pattern(regexp = "\\d{9,12}", message = "El teléfono debe tener entre 9 y 12 dígitos")
    private String telefono;
    @Column
    @NotBlank(message = "La contraseña es obligatoria")
    private String contrasenya;

    //RELACIONES
    @ManyToOne
    @JoinColumn(name = "id_rol")
    @JsonIgnoreProperties({"usuarios"})
    private Rol rol;

    //CONSTRUCTOR
    public Usuario(String telefono, String email, String apellidos, String nombre, String contrasenya, Rol rol) {
        this.telefono = telefono;
        this.email = email;
        this.apellidos = apellidos;
        this.nombre = nombre;
        this.contrasenya = contrasenya;
        this.rol = rol;
    }
    public Usuario(){

    }

    //GETTERS SETTERS
    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

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
