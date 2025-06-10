package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.models.Imagen;
import es.impulsalicante.ApiFuturaAlicante.repository.ImagenRepository;
import es.impulsalicante.ApiFuturaAlicante.dto.PredefinedImageDTO;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    // baseUrl seguirá siendo http://localhost:8080, ya que no lo cambias en application.properties
    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    // Define la ruta base para los recursos estáticos, que incluye el context-path
    // Este valor se combinará con baseUrl
    private static final String STATIC_RESOURCES_BASE_PATH = "/alicanteFutura/api/v1"; // Hardcodeado, o se podría inyectar si fuera más dinámico

    public List<Imagen> obtenerTodas() {
        return imagenRepository.findAll();
    }

    public List<Imagen> obtenerPorCategoria(String categoria) {
        return imagenRepository.findByCategoria(categoria);
    }

    public Imagen guardar(Imagen imagen) {
        return imagenRepository.save(imagen);
    }

    public void eliminar(Long id) {
        imagenRepository.deleteById(id);
    }

    @PostConstruct
    public void inicializarImagenesPredefinidas() {
        // Solo inicializar si no hay imágenes en la BD
        if (imagenRepository.count() == 0) {
            crearImagenesPredefinidas();
        }
    }

    private void crearImagenesPredefinidas() {
        // Institucional
        // Construye la URL combinando baseUrl, STATIC_RESOURCES_BASE_PATH y la ruta de la imagen
        guardar(new Imagen("Agencia Local", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/agencialocal.jpg", "Institucional",
                "Logo oficial de la Agencia Local de Desarrollo", "agencia,local,logo"));

        guardar(new Imagen("Impulsa Alicante Logo", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/impulsalicante_logo.jpg", "Institucional",
                "Logo oficial de Impulsa Alicante", "impulsa,alicante,logo"));

        guardar(new Imagen("Impulsa Logos Conjunto", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/impulsa_logos.jpg", "Institucional",
                "Conjunto de logos de Impulsa", "impulsa,logos,conjunto"));

        guardar(new Imagen("Ayuntamiento de Alicante", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/ayuntamiento_alicante.jpg", "Institucional",
                "Edificio del Ayuntamiento de Alicante", "ayuntamiento,alicante,edificio"));

        guardar(new Imagen("Ciudad de Alicante", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/alicante.jpg", "Institucional",
                "Vista de la ciudad de Alicante", "alicante,ciudad,vista"));

        guardar(new Imagen("Alacant", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/alacant.jpg", "Institucional",
                "Imagen representativa de Alacant", "alacant,ciudad"));

        // Empleo y Formación
        guardar(new Imagen("Centro de Empleo Alejandrina Candela", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/centro_empleo_alejandrina_candela.jpg", "Empleo y Formación",
                "Centro de Empleo Alejandrina Candela", "centro,empleo,alejandrina,candela"));

        guardar(new Imagen("LABORA", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/labora.jpg", "Empleo y Formación",
                "Servicio Valenciano de Empleo y Formación", "labora,empleo,formacion"));

        // Promoción Económica
        guardar(new Imagen("Porta Ferrisa", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/porta_ferrisa.jpg", "Promoción Económica",
                "Instalaciones Porta Ferrisa", "porta,ferrisa,instalaciones"));

        // Desarrollo Local
        guardar(new Imagen("Alicante Futura", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/alicante_futura.jpg", "Desarrollo Local",
                "Proyecto Alicante Futura", "alicante,futura,desarrollo"));

        guardar(new Imagen("Observatorio del Pacto", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/observatorio_pacto.jpg", "Desarrollo Local",
                "Observatorio del Pacto por el Empleo", "observatorio,pacto,empleo"));

        // Instituciones y Organismos
        guardar(new Imagen("Ministerio de Trabajo y Economía", baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/logo_ministerio_trabajo_y_economia.jpg", "Instituciones",
                "Logo del Ministerio de Trabajo y Economía Social", "ministerio,trabajo,economia"));

        System.out.println("✅ Imágenes predefinidas inicializadas con las imágenes reales del proyecto");
    }

    public List<PredefinedImageDTO> getPredefinedImages() {
        List<PredefinedImageDTO> images = new ArrayList<>();

        // Definir las categorías y sus imágenes
        images.addAll(getInstitucionalImages());
        images.addAll(getEmpleoImages());
        images.addAll(getPromocionImages());
        images.addAll(getDesarrolloImages());
        images.addAll(getInstitucionesImages());

        return images;
    }

    public List<String> getCategorias() {
        return Arrays.asList(
                "Institucional",
                "Empleo y Formación",
                "Promoción Económica",
                "Desarrollo Local",
                "Instituciones"
        );
    }

    public List<Imagen> buscarImagenes(String termino, String categoria) {
        if (termino == null || termino.trim().isEmpty()) {
            if (categoria == null || categoria.equals("todas")) {
                return obtenerTodas();
            } else {
                return obtenerPorCategoria(categoria);
            }
        }

        List<Imagen> todasLasImagenes = (categoria == null || categoria.equals("todas"))
                ? obtenerTodas()
                : obtenerPorCategoria(categoria);

        return todasLasImagenes.stream()
                .filter(imagen ->
                        imagen.getNombre().toLowerCase().contains(termino.toLowerCase()) ||
                                imagen.getDescripcion().toLowerCase().contains(termino.toLowerCase())
                )
                .collect(java.util.stream.Collectors.toList());
    }

    private List<PredefinedImageDTO> getInstitucionalImages() {
        return Arrays.asList(
                new PredefinedImageDTO("inst_1", "Agencia Local", "Institucional",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/agencialocal.jpg", // Modificado aquí
                        "Logo oficial de la Agencia Local de Desarrollo",
                        Arrays.asList("agencia", "local", "logo")),

                new PredefinedImageDTO("inst_2", "Impulsa Alicante Logo", "Institucional",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/impulsalicante_logo.jpg", // Modificado aquí
                        "Logo oficial de Impulsa Alicante",
                        Arrays.asList("impulsa", "alicante", "logo")),

                new PredefinedImageDTO("inst_3", "Impulsa Logos Conjunto", "Institucional",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/impulsa_logos.jpg", // Modificado aquí
                        "Conjunto de logos de Impulsa",
                        Arrays.asList("impulsa", "logos", "conjunto")),

                new PredefinedImageDTO("inst_4", "Ayuntamiento de Alicante", "Institucional",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/ayuntamiento_alicante.jpg", // Modificado aquí
                        "Edificio del Ayuntamiento de Alicante",
                        Arrays.asList("ayuntamiento", "alicante", "edificio")),

                new PredefinedImageDTO("inst_5", "Ciudad de Alicante", "Institucional",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/alicante.jpg", // Modificado aquí
                        "Vista de la ciudad de Alicante",
                        Arrays.asList("alicante", "ciudad", "vista")),

                new PredefinedImageDTO("inst_6", "Alacant", "Institucional",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/alacant.jpg", // Modificado aquí
                        "Imagen representativa de Alacant",
                        Arrays.asList("alacant", "ciudad"))
        );
    }

    private List<PredefinedImageDTO> getEmpleoImages() {
        return Arrays.asList(
                new PredefinedImageDTO("emp_1", "Centro de Empleo Alejandrina Candela", "Empleo y Formación",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/centro_empleo_alejandrina_candela.jpg", // Modificado aquí
                        "Centro de Empleo Alejandrina Candela",
                        Arrays.asList("centro", "empleo", "alejandrina", "candela")),

                new PredefinedImageDTO("emp_2", "LABORA", "Empleo y Formación",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/labora.jpg", // Modificado aquí
                        "Servicio Valenciano de Empleo y Formación",
                        Arrays.asList("labora", "empleo", "formacion"))
        );
    }

    private List<PredefinedImageDTO> getPromocionImages() {
        return Arrays.asList(
                new PredefinedImageDTO("prom_1", "Porta Ferrisa", "Promoción Económica",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/porta_ferrisa.jpg", // Modificado aquí
                        "Instalaciones Porta Ferrisa",
                        Arrays.asList("porta", "ferrisa", "instalaciones"))
        );
    }

    private List<PredefinedImageDTO> getDesarrolloImages() {
        return Arrays.asList(
                new PredefinedImageDTO("des_1", "Alicante Futura", "Desarrollo Local",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/alicante_futura.jpg", // Modificado aquí
                        "Proyecto Alicante Futura",
                        Arrays.asList("alicante", "futura", "desarrollo")),

                new PredefinedImageDTO("des_2", "Observatorio del Pacto", "Desarrollo Local",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/observatorio_pacto.jpg", // Modificado aquí
                        "Observatorio del Pacto por el Empleo",
                        Arrays.asList("observatorio", "pacto", "empleo"))
        );
    }

    private List<PredefinedImageDTO> getInstitucionesImages() {
        return Arrays.asList(
                new PredefinedImageDTO("inst_min_1", "Ministerio de Trabajo y Economía", "Instituciones",
                        baseUrl + STATIC_RESOURCES_BASE_PATH + "/uploads/logo_ministerio_trabajo_y_economia.jpg", // Modificado aquí
                        "Logo del Ministerio de Trabajo y Economía Social",
                        Arrays.asList("ministerio", "trabajo", "economia"))
        );
    }
}