package es.impulsalicante.ApiFuturaAlicante.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    //PROPIEDADES
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
    public Usuario(Long id, Rol rol, String contrasenya, String telefono, String apellidos, String nombre, String email) {
        this.id = id;
        this.rol = rol;
        this.contrasenya = contrasenya;
        this.telefono = telefono;
        this.apellidos = apellidos;
        this.nombre = nombre;
        this.email = email;
    }

    public Usuario(){

    }

    //GETTERS SETTERS
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
