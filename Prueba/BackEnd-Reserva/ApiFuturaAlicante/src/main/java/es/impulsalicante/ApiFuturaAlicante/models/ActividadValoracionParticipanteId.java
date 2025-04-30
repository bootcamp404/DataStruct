package es.impulsalicante.ApiFuturaAlicante.models;

import java.io.Serializable;
import java.util.Objects;

public class ActividadValoracionParticipanteId implements Serializable {
    private String actividad; // Debe coincidir con el tipo de ID de Actividad
    private String participante; // Debe coincidir con el tipo de ID de Participante

    public ActividadValoracionParticipanteId() {}

    public ActividadValoracionParticipanteId(String actividad, String participante) {
        this.actividad = actividad;
        this.participante = participante;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ActividadValoracionParticipanteId that = (ActividadValoracionParticipanteId) o;
        return Objects.equals(actividad, that.actividad) &&
                Objects.equals(participante, that.participante);
    }

    @Override
    public int hashCode() {
        return Objects.hash(actividad, participante);
    }
}
