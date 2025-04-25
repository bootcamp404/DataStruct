package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.dto.EstadisticasDTO;
import org.springframework.stereotype.Service;

@Service
public class EstadisticasService {

    public EstadisticasDTO getEstadisticas(int year) {
        EstadisticasDTO dto = new EstadisticasDTO();

        // Simulación de datos
        dto.setTotalFormularios(12);
        dto.setTotalRespuestas(240);
        dto.setRespuestasPorMes(new int[]{10, 15, 20, 18, 25, 30, 28, 22, 20, 25, 30, 17});
        dto.setRespuestasPorFormulario(new int[]{60, 50, 40});
        dto.setNombresFormularios(new String[]{"Encuesta Empleo", "Satisfacción", "Demanda TIC"});
        dto.setRespuestasPorDepartamento(new int[]{100, 80, 60});
        dto.setNombresDepartamentos(new String[]{"RRHH", "Empleo", "Innovación"});

        return dto;
    }
}
