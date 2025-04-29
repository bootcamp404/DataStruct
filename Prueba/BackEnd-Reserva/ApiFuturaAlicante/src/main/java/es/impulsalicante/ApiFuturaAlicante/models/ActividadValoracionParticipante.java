package es.impulsalicante.ApiFuturaAlicante.models;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "actividad_valoracion_participante")
@IdClass(ActividadValoracionParticipanteId.class)
public class ActividadValoracionParticipante {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_actividad", nullable = false)
    private Actividad actividad;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_participante", nullable = false)
    private Participante participante;

    @OneToOne
    @JoinColumn(name = "id_valoracion", nullable = false)
    private Valoracion valoracion;

    public void setActividad(Actividad actividad) {
        this.actividad = actividad;
    }

    public void setParticipante(Participante participante) {
        this.participante = participante;
    }

    public void setValoracion(Valoracion valoracion) {
        this.valoracion = valoracion;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public Participante getParticipante() {
        return participante;
    }

    public Valoracion getValoracion() {
        return valoracion;
    }

    public ActividadValoracionParticipante(Actividad actividad, Participante participante, Valoracion valoracion) {
        this.actividad = actividad;
        this.participante = participante;
        this.valoracion = valoracion;
    }

    public ActividadValoracionParticipante(){}
}

