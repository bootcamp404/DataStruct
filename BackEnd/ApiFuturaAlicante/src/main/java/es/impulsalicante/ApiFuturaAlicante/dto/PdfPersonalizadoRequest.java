package es.impulsalicante.ApiFuturaAlicante.dto;

import java.util.Map;

public class PdfPersonalizadoRequest {
    private Map<String, String> imageMapping;

    public Map<String, String> getImageMapping() {
        return imageMapping;
    }

    public void setImageMapping(Map<String, String> imageMapping) {
        this.imageMapping = imageMapping;
    }
}