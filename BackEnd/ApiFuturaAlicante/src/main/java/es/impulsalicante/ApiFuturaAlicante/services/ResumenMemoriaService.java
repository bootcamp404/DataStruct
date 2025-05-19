    package es.impulsalicante.ApiFuturaAlicante.services;

    import es.impulsalicante.ApiFuturaAlicante.dto.*;
    import es.impulsalicante.ApiFuturaAlicante.models.*;
    import es.impulsalicante.ApiFuturaAlicante.repository.*;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import org.xhtmlrenderer.pdf.ITextRenderer;

    import java.io.*;




    import java.math.BigDecimal;
    import java.math.RoundingMode;
    import java.text.SimpleDateFormat;
    import java.time.LocalDate;
    import java.time.format.DateTimeFormatter;
    import java.util.*;
    import java.util.stream.Collectors;


    @Service
    public class ResumenMemoriaService {
        @Autowired
        private IndicadorAnualRepository indicadoresAnualesRepository;

        @Autowired
        private ContratosRespository contratosRespository;

        @Autowired
        private UsuariosRepository usuarioRepository;

        @Autowired
        private ConvenioRepository convenioRepository;

        @Autowired
        private  EmpresaRepository empresaRepository;

        @Autowired
        private ProyectoRepository proyectoRepository;

        @Autowired
        private ActividadRepository actividadRepository;

        @Autowired
        private CentrosRepository centrosRepository;

        @Autowired
        private SubvencionRepository subvencionRepository;

        @Autowired
        private DepartamentosRepository departamentoRepository;


        private static final SimpleDateFormat DF = new SimpleDateFormat("dd/MM/yyyy");



        private String plantillaConDatos(ResumenMemoriaDTO datos, int anio) throws IOException {
            StringBuilder html = new StringBuilder();

            html.append("<!DOCTYPE html>")
                    .append("<html xmlns='http://www.w3.org/1999/xhtml'>")
                    .append("<head>")
                    .append("<meta charset='UTF-8' />")
                    .append("<style>")
                    .append("body { font-family: Arial, sans-serif; }")
                    .append("h1, h2 { color: #004080; }")
                    .append("table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }")
                    .append("th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }")
                    .append(".section { margin-bottom: 30px; }")
                    .append("</style>")
                    .append("</head>")
                    .append("<body>");

            // Portada
            html.append("<div style='page-break-after: always; text-align: center; margin-top: 200px;'>")
                    .append("<h1 style='font-size: 48px; color: #004080;'>MEMORIA DE ACTIVIDAD</h1>")
                    .append("<h2 style='font-size: 36px;'>").append(anio).append("</h2>")
                    .append("</div>");

            // Índice
            html.append("<div style='page-break-after: always;'>")
                    .append("<h2 style='color: #004080;'>ÍNDICE</h2>")
                    .append("<ul style='line-height: 1.8;'>")
                    .append("<li><strong>1. La Agencia Local</strong>")
                    .append("<ul>")
                    .append("<li>1.1 La Agencia en Cifras</li>")
                    .append("<li>1.2 Qué Hacemos</li>")
                    .append("<li>1.3 Cómo Estamos Organizados</li>")
                    .append("<li>1.4 Dónde Estamos</li>")
                    .append("</ul></li>")
                    .append("<li><strong>2. Departamento de Empleo y Formación</strong>")
                    .append("<ul>")
                    .append("<li>2.1 Datos Totales</li>")
                    .append("<li>2.2 Nuestros Centros</li>")
                    .append("<li>2.3 Nuestros Servicios</li>")
                    .append("<li>2.4 Formación</li>")
                    .append("<li>2.5 Programas y Proyectos</li>")
                    .append("<li>2.6 Subvenciones</li>")
                    .append("<li>2.7 Otros</li>")
                    .append("</ul></li>")
                    .append("<li><strong>3. Departamento de Promoción Económica</strong>")
                    .append("<ul>")
                    .append("<li>3.1 Programas de Fomento</li>")
                    .append("<li>3.2 Viveros Empresariales</li>")
                    .append("<li>3.3 Ayudas Económicas</li>")
                    .append("</ul></li>")
                    .append("<li><strong>4. Programas de Desarrollo Local Estratégico</strong></li>")
                    .append("<li><strong>5. Área de Gestión</strong></li>")
                    .append("<li><strong>6. Departamento de Marketing y Comunicación</strong></li>")
                    .append("<li><strong>7. Anexos</strong></li>")
                    .append("</ul>")
                    .append("</div>");

            // Anexos
            html.append(generarSeccionAnexos(anio))
                    .append("<div style=\"page-break-after: always;\"></div>\n");

            //1 Portada
            html.append(String.format("""
        <div style='page-break-after: always; font-family: Arial, sans-serif; padding: 0; margin: 0;'>
            <div style='background: linear-gradient(to right, #2D60FA 50%%, #2D60FA 50%%); display: flex; align-items: center; height: 100px;'>
                <div style='background-color: #004080; color: white; font-size: 40px; font-weight: bold; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;'>%s</div>
                <div style='padding-left: 20px;'>
                    <div style='color: black; font-size: 24px; font-weight: bold;'>DEPARTAMENTO DE</div>
                    <div style='color: white; font-size: 28px; font-weight: bold; background-color: #004080; padding: 4px 10px; display: inline-block;'>%s</div>
                </div>
            </div>
            <div>
                <img src='%s' style='width:100%%; height:auto; margin-top:0;' />
            </div>
        </div>
        """,
                    "1", // número de sección
                    "AGENCIA LOCAL DE DESARROLLO\n" +
                            " ECONÓMICO Y SOCIAL", // título del departamento
                    "img/portada_dpto_promocion.jpg" // ruta de imagen ajusta según tu proyecto
            ));

            // Contenido general
            html.append("<div style='page-break-after: always;'>")
                    .append("<h2 style='color:#004080;'>Agencia Local en Cifras</h2>")
                    .append("<table style='width: 100%; font-family: Arial, sans-serif; font-size: 14px; border-collapse: collapse;'>")

                    // Fila: Total y nuevos usuarios
                    .append("<tr>")
                    .append("<td colspan='2' style='background-color:#004080; color:white; text-align:center; font-weight:bold; padding:10px;'>Total usuarios:<br /><span style='font-size: 22px;'>11.662</span></td>")
                    .append("<td colspan='2' style='background-color:#004080; color:white; text-align:center; font-weight:bold; padding:10px;'>Nuevos usuarios:<br/><span style='font-size: 22px;'>1.979</span></td>")
                    .append("</tr>")

                    // Fila 1
                    .append("<tr>")
                    .append(bloqueDato("Nº personas atendidas en orientación:", String.valueOf(datos.getPersonasOrientadas())))
                    .append(bloqueDato("Actividades formativas:", String.valueOf(datos.getActividadesFormacion())))
                    .append("</tr>")

                    // Fila 2
                    .append("<tr>")
                    .append(bloqueDato("Horas de orientación laboral realizadas:", String.valueOf(datos.getHorasOrientacion())))
                    .append(bloqueDato("Horas de formación:", String.valueOf(datos.getHorasFormacion())))
                    .append("</tr>")

                    // Fila 3
                    .append("<tr>")
                    .append(bloqueDato("Ofertas de empleo gestionadas:", String.valueOf(datos.getOfertasEmpleo())))
                    .append(bloqueDato("Participantes en actividades formativas:", String.valueOf(datos.getParticipantesFormacion())))
                    .append("</tr>")

                    // Fila 4
                    .append("<tr>")
                    .append(bloqueDato("Puestos de trabajo:", String.valueOf(datos.getPuestosTrabajo())))
                    .append(bloqueDato("Asesoramiento empresas y emprendedores:", String.valueOf(datos.getAsesoramientos())))
                    .append("</tr>")

                    // Fila 5
                    .append("<tr>")
                    .append(bloqueDato("Personas contratadas:", String.valueOf(datos.getContrataciones())))
                    .append(bloqueDato("Empresas creadas:", String.valueOf(datos.getEmpresasCreadas())))
                    .append("</tr>")


                    .append("</table>")

                    // Ayudas (fuera de tabla)
                    .append("<div style='display: flex; justify-content: space-between; gap: 20px; margin-top: 30px;'>")
                    .append(bloqueAyuda("Ayudas concedidas a empresas", datos.getImporteAyudasEmpresas().toString() + " €"))
                    .append(bloqueAyuda("Ayudas concedidas a entidades", datos.getImporteAyudas().toString() + " €"))
                    .append("</div>")
                    .append("</div>");


            //1.2
            html.append("<div style='page-break-before: always;'>")
                    .append("""
    <div style='page-break-before: always; font-family: Arial, sans-serif;'>
      <div style='margin-bottom: 20px;'>
        <div style='display: flex; align-items: center;'>
          <div style='background-color: #004080; color: white; padding: 5px 10px; font-weight: bold; font-size: 14px; border-radius: 4px; margin-right: 10px;'>1.2</div>
          <h2 style='color: #004080; margin: 0;'>QUÉ HACEMOS</h2>
        </div>
        <p style='margin-top: 15px; line-height: 1.6; font-size: 14px;'>
          Desde su creación, en el año 2000, la <strong>Agencia Local de Desarrollo Económico y Social</strong> es la entidad gestora de las actuaciones y estrategias definidas en el
          <strong>Pacto Territorial por el Empleo de la ciudad de Alicante</strong> y la encargada de poner en marcha políticas que impulsan la creación de empleo y el desarrollo socioeconómico del municipio.
        </p>
        <p style='line-height: 1.6; font-size: 14px;'>
          Todas las actuaciones realizadas van encaminadas al desarrollo de las <strong>cuatro líneas estratégicas</strong> del Pacto Territorial:
        </p>
      </div>
    
      <h3 style='color: #d4d9e1; font-size: 32px; margin-bottom: 10px;'>líneas estratégicas</h3>
    
      <div style='display: flex; flex-wrap: wrap; gap: 10px; '>
        <div style='flex: 1 1 47%; border: 1px solid #ccc; padding: 15px; min-width: 200px;'>
          <p style='font-weight: bold; color: #004080;'>1</p>
          <p style='font-weight: bold;'>Apoyo activo al empleo con especial atención a colectivos vulnerables</p>
          <ul style='margin-top: 5px; font-size: 13px;'>
            <li>Orientación laboral</li>
            <li>Formación para el empleo</li>
            <li>Intermediación laboral</li>
          </ul>
        </div>
        <div style='flex: 1 1 47%; border: 1px solid #ccc; padding: 15px; min-width: 200px;'>
          <p style='font-weight: bold; color: #004080;'>2</p>
          <p style='font-weight: bold;'>Dinamización y diversificación de la economía del territorio</p>
          <ul style='margin-top: 5px; font-size: 13px;'>
            <li>Modernización del tejido productivo</li>
            <li>Promoción del emprendimiento</li>
            <li>Atracción de inversiones (ALIA)</li>
          </ul>
        </div>
        <div style='flex: 1 1 47%; border: 1px solid #ccc; padding: 15px; min-width: 200px;'>
          <p style='font-weight: bold; color: #004080;'>3</p>
          <p style='font-weight: bold;'>Transición del modelo productivo hacia la nueva economía</p>
          <ul style='margin-top: 5px; font-size: 13px;'>
            <li>Desarrollo tecnológico</li>
            <li>Transformación digital</li>
            <li>Innovación y emprendimiento – Alicante Futura</li>
          </ul>
        </div>
        <div style='flex: 1 1 47%; border: 1px solid #ccc; padding: 15px; min-width: 200px;'>
          <p style='font-weight: bold; color: #004080;'>4</p>
          <p style='font-weight: bold;'>Impulsar la colaboración público-privada y la planificación estratégica</p>
          <ul style='margin-top: 5px; font-size: 13px;'>
            <li>Entre administraciones públicas</li>
            <li>Con entidades públicas y privadas</li>
            <li>Mejora de los servicios al ciudadano</li>
          </ul>
        </div>
      </div>
    
      <h3 style='color: #d4d9e1; font-size: 32px; margin-top: 30px;'>5 áreas</h3>
      <div style='display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px;'>
        <div style='background-color: #004080; color: white; padding: 10px; text-align: center; flex: 1;'>Departamento de Empleo y Formación</div>
        <div style='background-color: #004080; color: white; padding: 10px; text-align: center; flex: 1;'>Departamento de Promoción Económica</div>
        <div style='background-color: #004080; color: white; padding: 10px; text-align: center; flex: 1;'>Departamento Jurídico Administrativo</div>
        <div style='background-color: #004080; color: white; padding: 10px; text-align: center; flex: 1;'>Departamento Económico Financiero</div>
        <div style='background-color: #004080; color: white; padding: 10px; text-align: center; flex: 1;'>Departamento de Marketing y Comunicación</div>
      </div>
    </div>
    """)

                    .append("</div>");

            // Tabla de departamentos
            html.append("<div class='section'><h2>Departamentos</h2><table>")
                    .append("<thead><tr>")
                    .append("<th>Departamento</th>")
                    .append("<th>Personas atendidas</th>")
                    .append("<th>Altas demandantes</th>")
                    .append("<th>Orientaciones</th>")
                    .append("<th>Cursos</th>")
                    .append("<th>Participantes</th>")
                    .append("<th>Horas</th>")
                    .append("<th>Empresas apoyadas</th>")
                    .append("<th>Empresas creadas</th>")
                    .append("<th>Sesiones asesoramiento</th>")
                    .append("</tr></thead><tbody>");

            if (datos.getResumenDepartamentos() != null) {
                for (ResumenDepartamentoDTO d : datos.getResumenDepartamentos()) {
                    html.append("<tr>")
                            .append("<td>").append(d.getNombre()).append("</td>")
                            .append("<td>").append(d.getPersonasAtendidas()).append("</td>")
                            .append("<td>").append(d.getAltasDemandantes()).append("</td>")
                            .append("<td>").append(d.getAccionesOrientacion()).append("</td>")
                            .append("<td>").append(d.getCursos()).append("</td>")
                            .append("<td>").append(d.getParticipantes()).append("</td>")
                            .append("<td>").append(d.getHoras()).append("</td>")
                            .append("<td>").append(d.getEmpresasApoyadas()).append("</td>")
                            .append("<td>").append(d.getNuevasEmpresas()).append("</td>")
                            .append("<td>").append(d.getSesionesAsesoramiento()).append("</td>")
                            .append("</tr>");
                }
            }

            //1.3
            html.append("""
                    <div style="page-break-before: always; font-family: Arial, sans-serif; background-color: #0056A0; color: white; padding: 40px;">
                              <div style="text-align: center; margin-bottom: 40px;">
                                <div style="display: inline-block; background-color: #003366; padding: 5px 10px; border-radius: 5px; font-weight: bold;">1.3</div>
                                <h2 style="display: inline-block; margin: 0 10px; font-size: 28px;">CÓMO ESTAMOS <span style="color: #aac4e6;">ORGANIZADOS</span></h2>
                              </div>
                            
                              <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                                <!-- Presidencia -->
                                <div style="background-color: white; color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                  <div style="color: #0056A0; font-weight: bold;">Presidencia</div>
                                  Concejala de Empleo y Fomento
                                </div>
                            
                                <!-- Línea vertical -->
                                <div style="height: 20px; border-left: 2px dashed white;"></div>
                            
                                <!-- Jefatura -->
                                <div style="background-color: white; color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                  Jefatura de servicio
                                </div>
                            
                                <!-- Departamentos principales -->
                                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 30px;">
                                  <!-- Fila 1 -->
                                  <div style="background-color: white; color: black; padding: 10px 15px; border-radius: 5px; min-width: 220px; text-align: center;">
                                    Marketing y Comunicación
                                  </div>
                                  <div style="background-color: white; color: black; padding: 10px 15px; border-radius: 5px; min-width: 220px; text-align: center;">
                                    Observatorio Pacto Territorial por el Empleo
                                  </div>
                            
                                  <!-- Fila 2 -->
                                  <div style="background-color: white; color: black; padding: 10px 15px; border-radius: 5px; min-width: 220px; text-align: center;">
                                    Jurídico-Administrativo
                                  </div>
                                  <div style="background-color: white; color: black; padding: 10px 15px; border-radius: 5px; min-width: 220px; text-align: center;">
                                    Económico-Financiero
                                  </div>
                                </div>
                            
                                <!-- Departamentos con subelementos -->
                                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; margin-top: 40px;">
                                  <!-- Empleo -->
                                  <div style="background-color: white; color: black; padding: 10px 20px; border-radius: 5px; min-width: 240px;">
                                    <div style="font-weight: bold; text-align: center; margin-bottom: 10px;">Empleo y Formación</div>
                                    <div style="font-size: 13px;">
                                      <div>Formación para el Empleo</div>
                                      <div>Orientación Laboral</div>
                                      <div>Gestión de ofertas</div>
                                      <div>Programas de Empleo</div>
                                    </div>
                                  </div>
                            
                                  <!-- Promoción -->
                                  <div style="background-color: white; color: black; padding: 10px 20px; border-radius: 5px; min-width: 240px;">
                                    <div style="font-weight: bold; text-align: center; margin-bottom: 10px;">Promoción Económica</div>
                                    <div style="font-size: 13px;">
                                      <div>Emprendimiento</div>
                                      <div>Desarrollo Empresarial</div>
                                      <div>Áreas Industriales</div>
                                      <div>Programas de Fomento</div>
                                    </div>
                                  </div>
                                </div>
                            
                                <!-- Proyectos Estratégicos -->
                                <div style="background-color: white; color: black; padding: 10px 20px; border-radius: 5px; margin-top: 40px;">
                                  <div style="font-weight: bold;">Proyectos Estratégicos:</div>
                                  <div style="font-size: 13px; margin-top: 5px;">
                                    - Alicante Futura<br />
                                    - ALIA
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                                   
                    """);

            html.append(generarSeccionCentros());


            html.append(String.format("""
        <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 0; margin: 0;'>
            <div style='background: linear-gradient(to right, #7AFACF 50%%, #7AFACF 50%%); display: flex; align-items: center; height: 100px;'>
                <div style='background-color: #3CBEFA; color: white; font-size: 40px; font-weight: bold; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;'>%s</div>
                <div style='padding-left: 20px;'>
                    <div style='color: black; font-size: 24px; font-weight: bold;'>DEPARTAMENTO DE</div>
                    <div style='color: white; font-size: 28px; font-weight: bold; background-color: #3CBEFA; padding: 4px 10px; display: inline-block;'>%s</div>
                </div>
            </div>
            <div>
                <img src='%s' style='width:100%%; height:auto; margin-top:0;' />
            </div>
        </div>
        """,
                    "2", // número de sección
                    "DEPARTAMENTO DE EMPLEO Y FORMACIÓN", // título del departamento
                    "img/portada_dpto_promocion.jpg" // ruta de imagen ajusta según tu proyecto
            ));

            html.append("""
    <div style='page-break-before: always; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.8; padding: 20px;'>
      <div style='background-color: #d5f3ef; padding: 6px 12px; font-weight: bold; display: inline-block; border-radius: 4px; font-size: 12px;'>2.1</div>
      <h2 style='color: #00a99d; margin: 15px 0 10px;'>DATOS TOTALES</h2>
      <hr style='border: none; border-top: 2px solid #00a99d; margin-bottom: 30px;' />
    
      <!-- Orientación -->
      <h3 style='margin-bottom: 10px;'>ORIENTACIÓN E INTERMEDIACIÓN LABORAL</h3>
      <div style='background-color: #00a99d; color: white; padding: 12px; border-radius: 8px; margin-bottom: 15px;'>
        <p><strong>Personas atendidas:</strong> %s</p>
        <p><strong>Nuevas altas de demandantes:</strong> %s</p>
      </div>
      <div style='background-color: #e6f9f8; color: #004080; padding: 12px; border-radius: 8px; margin-bottom: 30px;'>
        <p><strong>Acciones de orientación:</strong> %s</p>
        <p><strong>Ofertas de trabajo:</strong> %s</p>
      </div>
    
      <!-- Formación -->
      <h3 style='margin-bottom: 10px;'>FORMACIÓN</h3>
      <div style='background-color: #00a99d; color: white; padding: 12px; border-radius: 8px; margin-bottom: 15px;'>
        <p><strong>Actividades:</strong> %s</p>
        <p><strong>Cursos:</strong> %s</p>
      </div>
      <div style='background-color: #e6f9f8; color: #004080; padding: 12px; border-radius: 8px; margin-bottom: 30px;'>
        <p><strong>Píldoras formativas:</strong> %s</p>
        <p><strong>Participantes:</strong> %s</p>
        <p><strong>Horas:</strong> %s</p>
      </div>
    
      <!-- Autoempleo -->
      <h3 style='margin-bottom: 10px;'>ASESORAMIENTO EMPRESARIAL Y AL AUTOEMPLEO</h3>
      <div style='background-color: #00a99d; color: white; padding: 12px; border-radius: 8px;'>
        <p><strong>Personas atendidas en autoempleo:</strong> %s</p>
        <p><strong>Empresas creadas:</strong> %s</p>
      </div>
    </div>
    """.formatted(
                    datos.getPersonasOrientadas(),
                    datos.getAltasDemandantes() != null ? datos.getAltasDemandantes() : "—",
                    datos.getAccionesOrientacion() != null ? datos.getAccionesOrientacion() : "—",
                    datos.getOfertasEmpleo(),
                    datos.getActividadesFormacion(),
                    datos.getCursos() != null ? datos.getCursos() : "—",
                    datos.getPildorasFormativas() != null ? datos.getPildorasFormativas() : "—",
                    datos.getParticipantesFormacion(),
                    datos.getHorasFormacion(),
                    datos.getAsesoramientos(),
                    datos.getEmpresasCreadas()
            ));

    //2.2
            html.append(generarSeccionCentrosEmpleoYFormacion());

    //2.3
            String template = """
    <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
        <h2 style='color: #008080; text-align: center;'>2.3 SERVICIOS PARA EL EMPLEO</h2>
        <h3 style='background-color: #000; color: white; padding: 10px 15px; margin-top: 30px;'>2.3.1 Orientación e intermediación laboral</h3>
    
        <div style='text-align: center; border: 1px solid #ccc; padding: 20px; margin-top: 20px;'>
            <h4 style='margin-bottom: 10px;'>PORTALEMP</h4>
            <p style='font-size: 18px; background-color: #e6f4f1; display: inline-block; padding: 8px 20px; border-radius: 8px; color: #006666; font-weight: bold;'>
                impulsalicante.portalemp.com
            </p>
        </div>
    
        <div style='display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px;'>
            <div style='flex: 1; min-width: 240px; background-color: #009999; color: white; padding: 20px; border-radius: 8px;'>
                <strong>Demandantes de empleo registrados:</strong>
                <div style='font-size: 24px; margin-top: 10px;'>%s</div>
            </div>
            <div style='flex: 1; min-width: 240px; background-color: #009999; color: white; padding: 20px; border-radius: 8px;'>
                <strong>Personas atendidas:</strong>
                <div style='font-size: 24px; margin-top: 10px;'>%s</div>
            </div>
            <div style='flex: 1; min-width: 240px; background-color: #f0f9f9; padding: 20px; border-radius: 8px;'>
                <strong>Ofertas de empleo:</strong>
                <div style='font-size: 24px; margin-top: 10px;'>%s</div>
            </div>
            <div style='flex: 1; min-width: 240px; background-color: #f0f9f9; padding: 20px; border-radius: 8px;'>
                <strong>Inscripciones y derivaciones a ofertas:</strong>
                <div style='font-size: 24px; margin-top: 10px;'>%s</div>
            </div>
            <div style='flex: 1; min-width: 240px; background-color: #eaf9ff; padding: 20px; border-radius: 8px;'>
                <strong>Perceptores de prestaciones:</strong>
                <div style='font-size: 24px; margin-top: 10px;'>%s</div>
            </div>
            <div style='flex: 1; min-width: 240px; background-color: #eaf9ff; padding: 20px; border-radius: 8px;'>
                <strong>Pertenecientes a colectivos vulnerables:</strong>
                <div style='font-size: 24px; margin-top: 10px;'>%s</div>
            </div>
        </div>
    
        <h4 style='margin-top: 40px;'>Perfil Demandantes 2023</h4>
        <p style='margin-bottom: 20px;'>Mujer mayor de 45 años, parada de larga duración</p>
    
        <div style='display: flex; flex-wrap: wrap; gap: 30px;'>
            <div style='flex: 1; min-width: 200px;'>
                <strong>Total nuevos demandantes:</strong>
                <div style='font-size: 22px; margin-top: 8px;'>%s</div>
            </div>
            <div style='flex: 1; min-width: 200px;'>
                <strong>Mujeres:</strong>
                <ul style='margin-top: 8px;'>
                    <li>Mayores de 45: %s</li>
                    <li>Entre 30 y 45: %s</li>
                    <li>Menores de 30: %s</li>
                </ul>
            </div>
            <div style='flex: 1; min-width: 200px;'>
                <strong>Hombres:</strong>
                <ul style='margin-top: 8px;'>
                    <li>Mayores de 45: %s</li>
                    <li>Entre 30 y 45: %s</li>
                    <li>Menores de 30: %s</li>
                </ul>
            </div>
        </div>
    </div>
    """;


            html.append(String.format(template,
                    safe(datos.getAltasDemandantes()),
                    safe(datos.getPersonasOrientadas()),
                    safe(datos.getOfertasEmpleo()),
                    safe(datos.getInscripcionesOfertas()),
                    safe(datos.getPerceptoresPrestacion()),
                    safe(datos.getColectivosVulnerables()),
                    safe(datos.getTotalNuevosDemandantes()),
                    safe(datos.getMujeresMayores45()),
                    safe(datos.getMujeresEntre30y45()),
                    safe(datos.getMujeresMenores30()),
                    safe(datos.getHombresMayores45()),
                    safe(datos.getHombresEntre30y45()),
                    safe(datos.getHombresMenores30())
            ));

    //2.4
            html.append(generarSeccionActividadesFormacion());

            List<Actividad> actividades = actividadRepository.findByDepartamentoId("D1");
            String tablaCursosHTML = generarTablaCursos(actividades);
            html.append(tablaCursosHTML);

    //2.5
            html.append(generarSeccionProyectos());

    //2.6
            List<Subvencion> subvenciones = subvencionRepository.findAll();

            Map<String, List<Subvencion>> subvencionesPorModalidad = subvenciones.stream()
                    .filter(s -> s.getModalidad() != null)
                    .collect(Collectors.groupingBy(Subvencion::getModalidad));

            List<Subvencion> modalidadA = subvencionesPorModalidad.getOrDefault("A", List.of());
            List<Subvencion> modalidadB = subvencionesPorModalidad.getOrDefault("B", List.of());
            List<Subvencion> modalidadC = subvencionesPorModalidad.getOrDefault("C", List.of());

            int totalA = modalidadA.stream().mapToInt(Subvencion::getImporte).sum();
            int totalB = modalidadB.stream().mapToInt(Subvencion::getImporte).sum();
            int totalC = modalidadC.stream().mapToInt(Subvencion::getImporte).sum();
            int total = totalA + totalB + totalC;

            html.append(String.format("""
        <h2 style='color:#008080; text-align: center;'>2.6 SUBVENCIONES A ENTIDADES</h2>
    
        <table style='width:100%%; margin-bottom: 30px; border-collapse: collapse;'>
            <tr>
                <td><strong>Subvenciones y convenios nominativos</strong></td>
                <td style='text-align:right;'>%s €</td>
            </tr>
        </table>
    
        <h3>Desglose por modalidad:</h3>
        <table style='width:100%%; border-collapse: collapse;'>
            <thead style='background-color:#47c3c2; color:white;'>
                <tr>
                    <th style='padding: 8px;'>Modalidad</th>
                    <th style='padding: 8px;'>Nº Proyectos</th>
                    <th style='padding: 8px;'>Importe total</th>
                </tr>
            </thead>
            <tbody>
                <tr style='background-color:#e9f4f3;'>
                    <td style='padding: 8px;'>A</td>
                    <td style='padding: 8px;'>%d</td>
                    <td style='padding: 8px;'>%s €</td>
                </tr>
                <tr style='background-color:#e9f4f3;'>
                    <td style='padding: 8px;'>B</td>
                    <td style='padding: 8px;'>%d</td>
                    <td style='padding: 8px;'>%s €</td>
                </tr>
                <tr style='background-color:#e9f4f3;'>
                    <td style='padding: 8px;'>C</td>
                    <td style='padding: 8px;'>%d</td>
                    <td style='padding: 8px;'>%s €</td>
                </tr>
                <tr style='background-color:#009999; color:white; font-weight:bold;'>
                    <td style='padding: 8px;'>TOTAL</td>
                    <td style='padding: 8px;'>%d</td>
                    <td style='padding: 8px;'>%s €</td>
                </tr>
            </tbody>
        </table>
        """,
                    total,
                    modalidadA.size(), totalA,
                    modalidadB.size(), totalB,
                    modalidadC.size(), totalC,
                    modalidadA.size() + modalidadB.size() + modalidadC.size(), total
            ));

    //2.6.1
            html.append(generarDetalleSubvencionesPorModalidad());

    //2.6.2
            html.append(generarSeccionConveniosNominativos());

    //2.7
            html.append(generarSeccionOtros());

    //3
            html.append(String.format("""
        <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 0; margin: 0;'>
            <div style='background: linear-gradient(to right, #f7931e 50%%, #ffbe78 50%%); display: flex; align-items: center; height: 100px;'>
                <div style='background-color: #f26522; color: white; font-size: 40px; font-weight: bold; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;'>%s</div>
                <div style='padding-left: 20px;'>
                    <div style='color: black; font-size: 24px; font-weight: bold;'>DEPARTAMENTO DE</div>
                    <div style='color: white; font-size: 28px; font-weight: bold; background-color: #f26522; padding: 4px 10px; display: inline-block;'>%s</div>
                </div>
            </div>
            <div>
                <img src='%s' style='width:100%%; height:auto; margin-top:0;' />
            </div>
        </div>
        """,
                    "3", // número de sección
                    "PROMOCIÓN ECONÓMICA", // título del departamento
                    "img/portada_dpto_promocion.jpg" // ruta de imagen ajusta según tu proyecto
            ));
    //3.1
            html.append(generarSeccionDatosTotalesPromocionEconomica(anio));

    //3.2
            String htmlSeccion = generarSeccionProyectosYActividadesEmprendimiento(
                    proyectoRepository.findByDepartamentoAndKeyword("D3", "emprendimiento"),
                    actividadRepository.findByDepartamentoAndKeyword("D3", "emprendimiento")
            );
            html.append(htmlSeccion);

            //3.3
            html.append(generarSeccionViverosEmpresariales(anio));

            //3.4
            html.append(generarSeccion34AyudasEmpresas("D3"));

            //3.5
            html.append(generarSeccionColaboracionEventos(anio));

            // 4 portada
            html.append(String.format("""
        <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 0; margin: 0;'>
            <div style='background: linear-gradient(to right, #A71A46 50%%, #A71A46 50%%); display: flex; align-items: center; height: 100px;'>
                <div style='background-color: #A71A46; color: white; font-size: 40px; font-weight: bold; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;'>%s</div>
                <div style='padding-left: 20px;'>
                    <div style='color: black; font-size: 24px; font-weight: bold;'>PROGRAMAS DE</div>
                    <div style='color: white; font-size: 28px; font-weight: bold; background-color: #A71A46; padding: 4px 10px; display: inline-block;'>%s</div>
                </div>
            </div>
            <div>
                <img src='%s' style='width:100%%; height:auto; margin-top:0;' />
            </div>
        </div>
        """,
                    "4", // número de sección
                    "DESARROLLO LOCAL\n" +
                            " ESTRATÉGICO", // título del departamento
                    "img/portada_dpto_promocion.jpg" // ruta de imagen ajusta según tu proyecto
            ));


            //4.1
            html.append(generarSeccion41(anio));

            //4.2
            BigDecimal totalAyudas = indicadoresAnualesRepository.sumAyudasObservatorioByAnio(anio);
            long personasContratadas = contratosRespository.countByYear(anio);
            html.append(generarSeccion42(
                    anio,
                    datos.getAyudasObservatorio(),
                    (int) personasContratadas,
                    datos.getDescripcionObservatorio(),
                    datos.getObjetivosObservatorio()
            ));

            //4.3
            html.append(generarSeccion43(anio));

            //4.4
            html.append(generarSeccion44(anio));



            html.append("</tbody></table></div>");
            html.append("</body></html>");

            return html.toString();
        }

        public byte[] generarPdf(int anio) throws IOException {
            ResumenMemoriaDTO datos = getResumenPorAnio(anio);
            String html = plantillaConDatos(datos, anio);

            try {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ITextRenderer renderer = new ITextRenderer();
                renderer.setDocumentFromString(html);
                renderer.layout();
                renderer.createPDF(baos);

                return baos.toByteArray();
            } catch (Exception e) {
                // Loggea el error para saber qué ocurrió
                System.err.println("❌ Error al generar PDF: " + e.getMessage());
                e.printStackTrace();
                return new byte[0];
            }
        }


        private String safe(Object val) {
            return val != null ? val.toString() : "-";
        }

        private String generarSeccionProyectos() {
            List<Proyecto> proyectos = proyectoRepository.findAll();

            StringBuilder html = new StringBuilder();
            html.append("""
            <div style='page-break-before: always; font-family: Arial, sans-serif;'>
                <h2 style='color: #008080; text-align: center;'>2.5 PROGRAMAS Y PROYECTOS</h2>
        """);

            for (Proyecto proyecto : proyectos) {
                List<Subvencion> subvenciones = proyecto.getSubvenciones();
                List<Actividad> actividades = proyecto.getCentros().stream()
                        .flatMap(centro -> actividadRepository.findAll().stream()
                                .filter(a -> a.getDepartamento() != null &&
                                        centro.getDepartamento() != null &&
                                        a.getDepartamento().getId().equals(centro.getDepartamento().getId()) &&
                                        a.getProyecto() != null &&
                                        a.getProyecto().getId_proyecto().equals(proyecto.getId_proyecto())
                                ))
                        .toList();

                int totalImporte = subvenciones.stream().mapToInt(Subvencion::getImporte).sum();
                int totalParticipantes = actividades.stream().mapToInt(Actividad::getNum_participantes).sum();
                int totalHoras = actividades.stream().mapToInt(a -> a.getHoras() != null ? a.getHoras() : 0).sum();

                html.append(String.format("""
                <div style='border: 1px solid #ccc; border-radius: 10px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;'>
                    <h3 style='color: #004080;'>%s</h3>
                    <p><strong>Objetivo:</strong> %s</p>
                    <p><strong>Fecha de Inicio:</strong> %s</p>
                    <p><strong>Fecha de Fin:</strong> %s</p>
    
                    <h4 style='margin-top: 15px; color: #009999;'>Resumen de Subvenciones</h4>
                    <ul>
                        <li><strong>Nº de Subvenciones:</strong> %d</li>
                        <li><strong>Importe Total:</strong> %d €</li>
                        <li><strong>Entidades:</strong> %s</li>
                        <li><strong>Estados:</strong> %s</li>
                    </ul>
    
                    <h4 style='margin-top: 15px; color: #009999;'>Resumen de Actividades</h4>
                    <ul>
                        <li><strong>Actividades vinculadas:</strong> %d</li>
                        <li><strong>Total Participantes:</strong> %d</li>
                        <li><strong>Total Horas:</strong> %d</li>
                    </ul>
                </div>
            """,
                        safe(proyecto.getNombre()),
                        safe(proyecto.getObjetivo()),
                        safe(proyecto.getFecha_ini()),
                        safe(proyecto.getFecha_fin()),
                        subvenciones.size(),
                        totalImporte,
                        subvenciones.stream().map(Subvencion::getEntidad).distinct().collect(Collectors.joining(", ")),
                        subvenciones.stream()
                                .map(s -> s.getEstadoSubvencion().getId()),
                        actividades.size(),
                        totalParticipantes,
                        totalHoras
                ));
            }



            html.append("</div>");
            return html.toString();
        }

        private String generarSeccionProyectosYActividadesEmprendimiento(List<Proyecto> proyectos, List<Actividad> actividades) {
            StringBuilder html = new StringBuilder();
            int contadorSeccion = 1;

            for (Proyecto proyecto : proyectos) {
                String seccion = "3.2." + contadorSeccion++;
                html.append("""
                <div style='page-break-before: always; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.8; padding: 20px;'>
                  <div style='background-color: #fbe1d2; padding: 6px 12px; font-weight: bold; display: inline-block; border-radius: 4px; font-size: 12px;'>%s</div>
                  <h2 style='color: #f15a24; margin: 15px 0 10px;'>%s</h2>
                  <hr style='border: none; border-top: 2px solid #f15a24; margin-bottom: 30px;' />
                  <p><strong>Objetivo:</strong> %s</p>
                  <p><strong>Fecha inicio:</strong> %s</p>
                  <p><strong>Fecha fin:</strong> %s</p>
                </div>
            """.formatted(seccion,
                        safe(proyecto.getNombre()),
                        safe(proyecto.getObjetivo()),
                        formatDate(proyecto.getFecha_ini()),
                        formatDate(proyecto.getFecha_fin())));
            }

            for (Actividad actividad : actividades) {
                String seccion = "3.2." + contadorSeccion++;
                html.append("""
                <div style='page-break-before: always; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.8; padding: 20px;'>
                  <div style='background-color: #fbe1d2; padding: 6px 12px; font-weight: bold; display: inline-block; border-radius: 4px; font-size: 12px;'>%s</div>
                  <h2 style='color: #f15a24; margin: 15px 0 10px;'>%s</h2>
                  <hr style='border: none; border-top: 2px solid #f15a24; margin-bottom: 30px;' />
                  <p><strong>Descripción:</strong> %s</p>
                  <p><strong>Participantes:</strong> %s</p>
                  <p><strong>Horas:</strong> %s</p>
                  <p><strong>Fecha inicio:</strong> %s</p>
                  <p><strong>Fecha fin:</strong> %s</p>
                </div>
            """.formatted(seccion,
                        safe(actividad.getNombre()),
                        safe(actividad.getDescripcion()),
                        safe(actividad.getNum_participantes()),
                        safe(actividad.getHoras()),
                        formatDate(actividad.getFecha_inicio()),
                        formatDate(actividad.getFecha_fin())));
            }

            return html.toString();
        }


        private String generarDetalleSubvencionesPorModalidad() {
            List<Subvencion> subvenciones = subvencionRepository.findAll();

            Map<String, List<Subvencion>> porModalidad = subvenciones.stream()
                    .filter(s -> s.getModalidad() != null)
                    .collect(Collectors.groupingBy(s -> s.getModalidad().toUpperCase()));

            StringBuilder html = new StringBuilder();
            html.append("""
        <div style='page-break-before: always; font-family: Arial, sans-serif;'>
            <h2 style='color:#008080;'>2.6.1 SUBVENCIONES A ENTIDADES SIN ÁNIMO DE LUCRO</h2>
            <p style='font-size:14px;'>Subvenciones por fomento de inserción laboral, innovación social y emprendimiento.</p>
        """);

            for (String modalidad : List.of("A", "B", "C")) {
                List<Subvencion> lista = porModalidad.getOrDefault(modalidad, Collections.emptyList());
                BigDecimal total = lista.stream()
                        .map(s -> BigDecimal.valueOf(s.getImporte()))
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

                html.append(String.format("""
                <h3 style='color: #004080;'>Modalidad %s:</h3>
                <table style='width:100%%; border-collapse: collapse; margin-bottom: 10px;'>
                    <thead style='background-color:#47c3c2; color:white;'>
                        <tr>
                            <th style='padding: 8px;'>Nº</th>
                            <th style='padding: 8px;'>Entidad</th>
                            <th style='padding: 8px;'>Subvención concedida</th>
                        </tr>
                    </thead>
                    <tbody>
            """, modalidad));

                int i = 1;
                for (Subvencion s : lista) {
                    html.append(String.format("""
                    <tr style='background-color:#e9f4f3;'>
                        <td style='padding: 8px;'>%d</td>
                        <td style='padding: 8px;'>%s</td>
                        <td style='padding: 8px;'>%,d €</td>
                    </tr>
                """, i++, s.getEntidad(), s.getImporte()));
                }

                html.append(String.format("""
                    <tr style='background-color:#009999; color:white; font-weight:bold;'>
                        <td colspan='2' style='padding: 8px;'>TOTAL</td>
                        <td style='padding: 8px;'>%,d €</td>
                    </tr>
                    </tbody>
                </table>
            """, total.intValue()));
            }


            html.append("</div>");
            return html.toString();
        }


        private String formatDate(Date date) {
            return date != null ? new java.text.SimpleDateFormat("dd/MM/yyyy").format(date) : "-";
        }
        private String generarTablaCursos(List<Actividad> actividades) {
            Map<String, int[]> resumen = new LinkedHashMap<>();

            // Inicializar los tipos de cursos
            resumen.put("Cursos Programación LABORA", new int[]{0, 0, 0});
            resumen.put("Cursos propios con certificación", new int[]{0, 0, 0});
            resumen.put("Cursos propios sin certificación", new int[]{0, 0, 0});
            resumen.put("Convenios de formación", new int[]{0, 0, 0});

            for (Actividad a : actividades) {
                String desc = a.getDescripcion().toLowerCase();

                if (desc.contains("labora")) {
                    sumar(resumen.get("Cursos Programación LABORA"), a);
                } else if (desc.contains("certificación")) {
                    sumar(resumen.get("Cursos propios con certificación"), a);
                } else if (desc.contains("competencias") || desc.contains("sin certificación")) {
                    sumar(resumen.get("Cursos propios sin certificación"), a);
                } else if (desc.contains("convenio") || desc.contains("convenios")) {
                    sumar(resumen.get("Convenios de formación"), a);
                }
            }

            // Generar HTML
            StringBuilder html = new StringBuilder();
            html.append("""
            <table style='width: 100%; border-collapse: collapse; margin-top: 30px;'>
                <thead style='background-color: #47c3c2; color: white;'>
                    <tr>
                        <th style='padding: 8px;'>Modalidad</th>
                        <th style='padding: 8px;'>Nº de Cursos</th>
                        <th style='padding: 8px;'>Horas</th>
                        <th style='padding: 8px;'>Participantes</th>
                    </tr>
                </thead>
                <tbody>
        """);

            int totalCursos = 0, totalHoras = 0, totalParticipantes = 0;

            for (Map.Entry<String, int[]> entry : resumen.entrySet()) {
                int[] valores = entry.getValue();
                html.append(String.format("""
                <tr style='background-color: #e9f4f3;'>
                    <td style='padding: 8px;'>%s</td>
                    <td style='padding: 8px;'>%d</td>
                    <td style='padding: 8px;'>%d</td>
                    <td style='padding: 8px;'>%d</td>
                </tr>
            """, entry.getKey(), valores[0], valores[1], valores[2]));

                totalCursos += valores[0];
                totalHoras += valores[1];
                totalParticipantes += valores[2];
            }

            // Totales
            html.append(String.format("""
            <tr style='background-color: #009999; color: white; font-weight: bold;'>
                <td style='padding: 8px;'>Total</td>
                <td style='padding: 8px;'>%d</td>
                <td style='padding: 8px;'>%d</td>
                <td style='padding: 8px;'>%d</td>
            </tr>
        """, totalCursos, totalHoras, totalParticipantes));

            html.append("</tbody></table>");

            return html.toString();
        }
        private String generarSeccionColaboracionEventos(int anio) throws IOException {
            // 1) Recupera sólo las actividades de D3 en el año indicado
            List<Actividad> eventos = actividadRepository
                    .findByDepartamentoAndAnioOrderByFechaInicioAsc("D3", anio);

            if (eventos.isEmpty()) {
                return "";
            }

            SimpleDateFormat DF = new SimpleDateFormat("dd/MM/yyyy");

            StringBuilder html = new StringBuilder();
            html.append(String.format("""
            <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
              <div style='display: flex; align-items: center; gap: 10px;'>
                <div style='background-color: #fbe1d2; padding: 6px 12px; font-weight: bold;
                            border-radius: 4px; font-size: 12px;'>3.5</div>
                <h2 style='color: #f15a24; margin: 0; font-size: 20px;'>
                  COLABORACIÓN EN EVENTOS DE EMPRENDIMIENTO Y PROMOCIÓN EMPRESARIAL
                </h2>
              </div>
              <hr style='border: none; border-top: 2px solid #f15a24; margin: 15px 0;'/>
              <p style='font-size: 14px; line-height: 1.6;'>
                Durante %d la Agencia colaboró en los siguientes eventos:
              </p>
              <div style='display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;'>
        """, anio));

            for (Actividad e : eventos) {
                String ini  = DF.format(e.getFecha_inicio());
                String fin  = e.getFecha_fin() != null ? " – " + DF.format(e.getFecha_fin()) : "";
                int    part = e.getNum_participantes();
                String desc = Optional.ofNullable(e.getDescripcion()).orElse("—");

                html.append(String.format("""
                <div style='flex: 1 1 30%%; background-color: #fff4f0; border-left: 6px solid #f15a24;
                            border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden;'>
                  <div style='padding: 12px;'>
                    <h3 style='margin: 0 0 8px; color: #f15a24; font-size: 16px;'>%s</h3>
                    <p style='margin: 0 0 6px; font-size: 13px; color: #333;'>
                      <strong>Fecha:</strong> %s%s
                    </p>
                    <p style='margin: 0 0 6px; font-size: 13px; color: #333;'>
                      <strong>Participantes:</strong> %d
                    </p>
                    <p style='margin: 0; font-size: 13px; color: #333;'>%s</p>
                  </div>
                </div>
            """,
                        e.getNombre(), ini, fin, part, desc
                ));
            }

            // --- Cierre ---
            html.append("""
              </div>
            </div>
        """);
            return html.toString();
        }

        private void sumar(int[] arr, Actividad a) {
            arr[0]++; // nº cursos
            arr[1] += a.getHoras();
            arr[2] += a.getNum_participantes();
        }

        private String generarSeccionCentrosEmpleoYFormacion() {
            List<CentroDTO> centros = centrosRepository.findAll()
                    .stream()
                    .filter(c -> c.getDepartamento() != null && "Empleo y Formación".equalsIgnoreCase(c.getDepartamento().getNombre()))
                    .map(c -> new CentroDTO(c.getNombre(), c.getDireccion()))
                    .toList();

            StringBuilder html = new StringBuilder();
            html.append("""
            <div style='page-break-before: always; font-family: Arial, sans-serif;'>
              <h2 style='color: #004080; text-align: center;'>2.2 Nuestros Centros</h2>
              <div style='display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-around; margin-top: 30px;'>
        """);

            for (CentroDTO centro : centros) {
                html.append(String.format("""
                <div style='flex: 1 1 40%%; border: 1px solid #ccc; border-radius: 8px; padding: 20px; box-sizing: border-box; min-width: 250px; background-color: #f9f9f9;'>
                    <h3 style='color: #004080; margin: 0 0 10px;'>%s</h3>
                    <p style='margin: 0; font-size: 12px;'>%s</p>
                </div>
            """, centro.getNombre(), centro.getDireccion()));
            }

            html.append("</div></div>");
            return html.toString();
        }


        private String generarSeccionConveniosNominativos() {
            List<Convenio> convenios = convenioRepository.findByDepartamento_Id("D1");

            int total = convenios.size();
            BigDecimal suma = convenios.stream()
                    .map(c -> c.getImporte() != null ? c.getImporte() : BigDecimal.ZERO)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            StringBuilder html = new StringBuilder();

            html.append(String.format("""
            <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
                <h2 style='color:#008080;'>2.6.2 Convenios nominativos</h2>
                <div style='display: flex; justify-content: space-between; margin-bottom: 20px;'>
                    <div><strong>Convenios:</strong> %d</div>
                    <div><strong>Financiación:</strong> %s €</div>
                </div>
        """, total, suma));

            for (Convenio c : convenios) {
                html.append("<div style='border:1px solid #ccc; padding:20px; margin-bottom:20px;'>");
                html.append("<h3 style='color:#004080;'>").append(c.getEntidad()).append("</h3>");
                html.append("<p><strong>Programa:</strong> ").append(c.getProgramaNombre()).append("</p>");
                html.append("<p><strong>Importe:</strong> ").append(String.format("%.2f", c.getImporte())).append(" €</p>");
                html.append("<p><strong>Actividades:</strong> ").append(Optional.ofNullable(c.getNumeroActividades()).orElse(0)).append("</p>");
                html.append("<p><strong>Participantes:</strong> ").append(Optional.ofNullable(c.getNumeroParticipantes()).orElse(0)).append("</p>");
                html.append("<p><strong>Horas:</strong> ").append(Optional.ofNullable(c.getNumeroHoras()).orElse(0)).append("</p>");

                // Datos adicionales
                html.append("<div style='margin-top:10px;'>");
                if (c.getCursos() != null)
                    html.append("<p><strong>Cursos:</strong> ").append(c.getCursos()).append("</p>");
                if (c.getAmbitosIntervencion() != null)
                    html.append("<p><strong>Ámbitos:</strong> ").append(c.getAmbitosIntervencion()).append("</p>");
                if (c.getParticipantesHombres() != null || c.getParticipantesMujeres() != null)
                    html.append("<p><strong>Hombres:</strong> ")
                            .append(safe(c.getParticipantesHombres()))
                            .append(" / <strong>Mujeres:</strong> ")
                            .append(safe(c.getParticipantesMujeres()))
                            .append("</p>");
                if (c.getIndicadores() != null)
                    html.append("<p><strong>Indicadores:</strong> ").append(c.getIndicadores()).append("</p>");
                if (c.getObservacionesAdicionales() != null)
                    html.append("<p><strong>Notas:</strong> ").append(c.getObservacionesAdicionales()).append("</p>");
                html.append("</div>");

                html.append("</div>");
            }

            html.append("</div>");
            return html.toString();
        }

        private String safe(Integer value) {
            return value != null ? value.toString() : "-";
        }


        private String generarSeccionOtros() {
            record EventoOtros(String titulo, String descripcion, String anexo, String imagenPath) {
            }

            List<EventoOtros> eventos = List.of(
                    new EventoOtros(
                            "IV Feria de empleo y formación Zona Norte",
                            "El 29 de marzo de 2023 se celebró la cuarta edición de la feria de empleo y formación, en horario de 9:30 a 13:30 horas. En ella participaron más de 27 organizaciones entre centros educativos, instituciones y servicios públicos. La feria contó con la asistencia de un amplio número de estudiantes de secundaria.",
                            "Anexo 20: 4ª feria de empleo y formación Zona Norte.",
                            "img/anexo20.jpg"
                    ),
                    new EventoOtros(
                            "IV Encuentro de Empleo dirigido a Personas con Diversidad Funcional",
                            "El 24 de noviembre, la plaza del Ayuntamiento y el auditorio de Puerta Ferrisa acogieron el IV Encuentro de Empleo dirigido a Personas con Diversidad Funcional. El evento reunió a 16 empresas y 18 asociaciones para exponer tanto ofertas de trabajo como las diversas propuestas de las entidades participantes.",
                            "Anexo 21: Memoria IV Encuentro de Empleo dirigido a personas con diversidad funcional.",
                            "img/anexo21.jpg"
                    )
            );

            StringBuilder html = new StringBuilder();
            html.append("""
                        <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
                            <h2 style='color:#008080;'>2.7 OTROS</h2>
                    """);

            int index = 1;
            for (EventoOtros e : eventos) {
                html.append(String.format("""
                            <div style='margin-bottom: 40px;'>
                                <h3 style='color:#004080;'>2.7.%d %s</h3>
                                <p>%s</p>
                        """, index++, e.titulo(), e.descripcion()));

                if (e.anexo() != null) {
                    html.append("<p><strong>" + e.anexo() + "</strong></p>");
                }
                if (e.imagenPath() != null) {
                    html.append("<img src='" + e.imagenPath() + "' style='width:100%%; margin-top:10px;' />");
                }

                html.append("</div>");
            }

            html.append("</div>");
            return html.toString();
        }


            private String generarSeccionActividadesFormacion() {
            List<Actividad> actividadesFormacion = actividadRepository.findAll()
                    .stream()
                    .filter(a -> a.getDescripcion() != null && a.getDescripcion().toLowerCase().contains("formación"))
                    .toList();

            StringBuilder html = new StringBuilder();
            html.append("""
            <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
                <h2 style='color: #008080; text-align: center;'>2.4 ACTIVIDADES DE FORMACIÓN</h2>
                <div style='display: flex; flex-wrap: wrap; gap: 30px; margin-top: 30px;'>
        """);

            int count = 1;
            for (Actividad actividad : actividadesFormacion) {
                html.append(String.format("""
                <div style='flex: 1; min-width: 300px; background-color: #eaf9ff; border-radius: 10px; padding: 20px;'>
                    <h3 style='color: #009999;'>%d. %s</h3>
                    <p>%s</p>
                </div>
            """, count++, safe(actividad.getNombre()), safe(actividad.getDescripcion())));
            }

            html.append("</div></div>");
            return html.toString();
        }

        private String generarSeccionDatosTotalesPromocionEconomica( int anio) {
            String idDepartamento = "D3";
            List<IndicadorAnual> indicadores = indicadoresAnualesRepository.findByAnioAndDepartamento(anio, idDepartamento);
            if (indicadores.isEmpty()) return "";

            IndicadorAnual datos = indicadores.get(0);

            StringBuilder html = new StringBuilder();

            html.append("""
        <div style='page-break-before: always; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.8; padding: 20px;'>
          <div style='background-color: #fbe1d2; padding: 6px 12px; font-weight: bold; display: inline-block; border-radius: 4px; font-size: 12px;'>3.1</div>
          <h2 style='color: #f15a24; margin: 15px 0 10px;'>DATOS TOTALES</h2>
          <hr style='border: none; border-top: 2px solid #f15a24; margin-bottom: 30px;' />
    
          <h3>EMPRENDIMIENTO</h3>
          <p><strong>%s</strong> asesoramientos</p>
          <p><strong>%s</strong> Empresas creadas</p>
    
          <h3 style='margin-top: 25px;'>FORMACIÓN</h3>
          <p><strong>%s</strong> acciones formativas</p>
          <p><strong>%s</strong> Participantes</p>
          <p><strong>%s</strong> Horas</p>
    
          <h3 style='margin-top: 25px;'>OTROS</h3>
          <p><strong>%s</strong> Puestos de trabajo</p>
          <p><strong>%s €</strong> Ayudas concedidas</p>
          <p><strong>%s</strong> Ofertas de empleo</p>
        </div>
        """.formatted(
                    safe(datos.getAsesoramientos()),
                    safe(datos.getEmpresasCreadas()),
                    safe(datos.getActividadesFormacion()),
                    safe(datos.getParticipantesFormacion()),
                    safe(datos.getHorasFormacion()),
                    safe(datos.getPuestosTrabajo()),
                    safe(datos.getAyudasEmpresas()),
                    safe(datos.getOfertasEmpleo())
            ));


            return html.toString();
        }

        private String generarSeccionViverosEmpresariales(int anio) {
            // 1) Trae todos los centros y filtra por departamento D3
            List<Centros> viveros = centrosRepository.findAll().stream()
                    .filter(c -> c.getDepartamento() != null
                            && "D3".equals(c.getDepartamento().getId()))
                    .toList();

            if (viveros.isEmpty()) {
                // No hay viveros: devolvemos cadena vacía (o un mensaje si prefieres)
                return "";
            }

            StringBuilder html = new StringBuilder();
            // Cabecera al estilo de la 3.4
            html.append(String.format("""
                <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
                  <div style='display: flex; align-items: center; gap: 10px;'>
                    <div style='background-color: #fbe1d2; padding: 6px 12px; font-weight: bold;
                                border-radius: 4px; font-size: 12px;'>3.3</div>
                    <h2 style='color: #f15a24; margin: 0; font-size: 20px;'>
                      VIVEROS EMPRESARIALES
                    </h2>
                  </div>
                  <p style='margin-top: 15px; font-size: 14px; line-height: 1.6;'>
                    La Agencia cuenta con <strong>%d</strong> viveros en Promoción Económica:
                  </p>
                  <div style='display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;'>
            """, viveros.size()));

            // 2) Una card por cada centro: nombre y dirección
            for (Centros v : viveros) {
                html.append(String.format("""
                    <div style='flex: 1 1 45%%; background-color: #fff4f0; border-radius: 6px;
                                overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);'>
                      <div style='padding: 15px;'>
                        <h3 style='margin: 0 0 8px; color: #f15a24; font-size: 18px;'>%s</h3>
                        <p style='margin: 0; font-size: 13px; color: #333;'>
                          %s
                        </p>
                      </div>
                    </div>
                """,
                        v.getNombre(),
                        v.getDireccion()
                ));
            }

            // 3) Cierre
            html.append("""
                  </div>
                  <p style='margin-top: 20px; font-size: 12px; color: #666;'>
                    <strong>Anexo 31:</strong> Listado de viveros empresariales.
                  </p>
                </div>
            """);
            return html.toString();
        }

        private String generarSeccion41(int anio) {
            String depId = "D4";  // tu departamento de Desarrollo Local
            String filtro = "desarrollo local industrial".toLowerCase();

            // Filtra proyectos cuyo nombre, objetivo o descripción contengan el texto
            List<Proyecto> programas = proyectoRepository.findByDepartamentoAndKeyword(depId, "")
                    .stream()
                    .filter(p -> {
                        String texto = String.join(" ",
                                safe(p.getNombre()),
                                safe(p.getObjetivo())
                        ).toLowerCase();
                        return texto.contains(filtro);
                    })
                    .toList();

            // Filtra actividades por descripción
            List<Actividad> actividades = actividadRepository.findByDepartamentoAndKeyword(depId, "")
                    .stream()
                    .filter(a -> safe(a.getDescripcion()).toLowerCase().contains(filtro))
                    .toList();

            if (programas.isEmpty() && actividades.isEmpty()) {
                return "";  // Si no hay nada que mostrar, devolvemos cadena vacía
            }

            StringBuilder html = new StringBuilder();
            html.append(String.format("""
      <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
        <div style='display: flex; align-items: center; gap: 10px;'>
          <div style='background-color: #B45D81; padding: 6px 12px; font-weight: bold;
                      border-radius: 4px; font-size: 12px;'>4.1</div>
          <h2 style='color: #A71A46; margin: 0; font-size: 24px;'>
            PROGRAMAS DE DESARROLLO LOCAL INDUSTRIAL
          </h2>
        </div>
        <p style='margin-top:15px; font-size:14px;'>
          Balance de los ítems que contienen “desarrollo local industrial” en %d:
        </p>
    """, anio));

            // Renderiza los proyectos filtrados
            for (Proyecto p : programas) {
                html.append(String.format("""
          <div style='border:1px solid #ddd; border-radius:6px; padding:20px; margin:20px 0;'>
            <h3 style='color: #A71A46;'>%s</h3>
            <p><strong>Objetivo:</strong> %s</p>
            <p><strong>Fechas:</strong> %s – %s</p>
          </div>
        """,
                        safe(p.getNombre()),
                        safe(p.getObjetivo()),
                        formatDate(p.getFecha_ini()),
                        formatDate(p.getFecha_fin())
                ));
            }

            // Renderiza las actividades filtradas
            for (Actividad a : actividades) {
                html.append(String.format("""
          <div style='border:1px solid #ddd; border-radius:6px; padding:20px; margin:20px 0;'>
            <h3 style='color: #A71A46;'>%s</h3>
            <p><strong>Descripción:</strong> %s</p>
            <p><strong>Participantes:</strong> %d</p>
            <p><strong>Horas:</strong> %d</p>
            <p><strong>Fechas:</strong> %s – %s</p>
          </div>
        """,
                        safe(a.getNombre()),
                        safe(a.getDescripcion()),
                        a.getNum_participantes(),
                        a.getHoras() != null ? a.getHoras() : 0,
                        formatDate(a.getFecha_inicio()),
                        formatDate(a.getFecha_fin())
                ));
            }

            html.append("</div>");
            return html.toString();
        }

        private String generarSeccion42(int anio, BigDecimal importeSubvencion, int personasContratadas, String descripcion, List<String> objetivos) {
            StringBuilder html = new StringBuilder();

            html.append(String.format("""
      <div style='page-break-before: always; font-family: Arial, sans-serif; padding: 30px;'>
        <!-- Título 4.2 -->
        <div style='display: flex; align-items: center; gap: 15px; margin-bottom: 20px;'>
          <div style='background-color: #DAB0C8; color: white; padding: 10px; font-weight: bold; font-size: 20px; border-radius: 4px;'>4.2</div>
          <div>
            <div style='font-size: 14px; color: #A71A46; font-weight: bold;'>OBSERVATORIO DE ESTRATEGIAS DEL</div>
            <h2 style='margin: 0; color: #A71A46; font-size: 24px; line-height: 1.2;'>
              PACTO TERRITORIAL POR EL EMPLEO DE LA CIUDAD DE ALICANTE
            </h2>
            <hr style='border: none; border-top: 2px solid #A71A46; width: 100px; margin-top: 5px;'/>
          </div>
        </div>

        <!-- KPI Subvención -->
        <div style='background-color: #A71A46; color: white; text-align: center; padding: 20px; border-radius: 6px; margin-bottom: 30px;'>
          <div style='font-size: 32px; font-weight: bold;'>%s €</div>
          <div style='font-size: 14px; opacity: 0.8;'>Subvención programa</div>
        </div>

        <!-- Personas contratadas + descripción -->
        <div style='display: flex; gap: 30px; margin-bottom: 30px;'>
          <div style='background-color: #A71A46; color: white; padding: 15px; border-radius: 6px; text-align: center; min-width: 100px;'>
            <div style='font-size: 24px; font-weight: bold;'>%d</div>
            <div style='font-size: 12px;'>Personas<br/>contratadas</div>
          </div>
          <div style='flex: 1; font-size: 14px; line-height: 1.6; color: #333;'>
            %s
          </div>
        </div>

        <!-- Objetivos -->
        <div style='background-color: #F1D7E0; padding: 20px; border-radius: 6px;'>
          <h3 style='margin: 0 0 10px; color: #A71A46;'>Objetivos</h3>
          <ul style='margin: 0; padding-left: 20px; font-size: 14px; color: #333;'>
    """,
                    importeSubvencion.setScale(2, RoundingMode.HALF_UP),
                    personasContratadas,
                    descripcion
            ));

            // Lista de objetivos
            for (String obj : objetivos) {
                html.append(String.format("    <li>%s</li>\n", obj));
            }

            html.append("""
          </ul>
        </div>
      </div>
    """);

            return html.toString();
        }

        private String generarSeccion43(int anio) {
            StringBuilder html = new StringBuilder();
            html.append("<div class='section' style='page-break-before: always;'>");
            html.append("<h2 style='color:#A71A46;'>4.3 Programas de Alicante Futura</h2>");
            html.append("<div style='display:flex; flex-wrap:wrap; gap:20px; margin-top:15px;'>");

            // 4.3.1
            html.append(formatoTarjeta("4.3.1", "II Congreso Internacional Alicante Futura",
                    String.format("%d asistentes de %d nacionalidades<br/>del 21/11 al 23/11/2023", 150, 12)
            ));
            // 4.3.2
            html.append(formatoTarjeta("4.3.2", "II Alicante Smartphone Film Festival",
                    String.format("%d cortometrajes de %d finalistas<br/>Premios: %d €", 150, 35, 3000)
            ));
            // 4.3.3
            html.append(formatoTarjeta("4.3.3", "III Copa Robotikid Alicante Futura",
                    String.format("%d niños participantes<br/>%d asistentes", 300, 1500)
            ));
            // 4.3.4
            html.append(formatoTarjeta("4.3.4", "7ª Edición Un Mar de Cine",
                    String.format("%d cortometrajes (%d finalistas)<br/>Premios: %d €", 150, 35, 4000)
            ));

            html.append("</div></div>");
            return html.toString();
        }

        private String generarSeccion44(int anio) {
            StringBuilder html = new StringBuilder();
            html.append("<div class='section' style='page-break-before: always;'>");
            html.append("<h2 style='color:#A76C00;'>4.4 ALIA - Oficina de Atracción de Inversiones</h2>");
            html.append("<p style='font-size:14px; margin-top:10px;'>ALIA es la oficina de atracción de inversiones de la Agencia Local de Desarrollo...</p>");
            html.append("<div style='display:flex; flex-wrap:wrap; gap:20px; margin-top:15px;'>");

            html.append(formatoTarjeta("Result.", "2021-2023: Empresas atendidas", String.format("%d", 74)));
            html.append(formatoTarjeta("Empleos medio plazo", "", String.format("%s", "4.000")));
            html.append(formatoTarjeta("Empleos directos", "", String.format("%d", 452)));
            html.append(formatoTarjeta("Inversión potencial", "millones €", String.format("%d", 65)));

            html.append(formatoTarjeta("Informes", "Dinámicas mensuales", String.format("%d", 12)));
            html.append(formatoTarjeta("Informes bimensuales", "", String.format("%d", 6)));
            html.append(formatoTarjeta("Radar inversiones", "", String.format("%d", 1)));

            html.append(formatoTarjeta("Eventos %d", "Participación anual", String.format("%d", 7)).replace("%d", String.valueOf(anio)));
            html.append(formatoTarjeta("Focus group", "Actividades anuales", String.format("%d", 13)).replace("%d", String.valueOf(anio)));

            html.append("</div>");
            html.append("<div style='margin-top:20px; text-align:center;'><img src='img/anexo45.jpg' style='width:100%;'/><p style='font-size:12px;'><strong>Anexo 45</strong> Memoria final ALIA</p></div>");
            html.append("</div>");
            return html.toString();
        }

        // Tarjeta genérica con estilo uniforme
        private String formatoTarjeta(String codigo, String titulo, String cuerpo) {
            return String.format(
                    "<div style='flex:1; min-width:200px; background:#f9f9f9; border-radius:6px; padding:15px; box-shadow:0 1px 3px rgba(0,0,0,0.1);'>" +
                            "<div style='font-weight:bold; color:#333;'>%s</div>" +
                            "<div style='font-size:16px; color:#222; margin:8px 0;'>%s</div>" +
                            "<div style='font-size:14px; color:#555;'>%s</div>" +
                            "</div>",
                    codigo, titulo, cuerpo
            );
        }



        // Helper para construir cada “card”
        private String carta(String título, String valor) {
            return String.format("""
        <div style='background-color: #F4E1F5; padding:15px; border-radius:8px; 
                    text-align:center;'>
          <div style='font-size: 24px; font-weight:bold; color:#A71A46;'>%s</div>
          <div style='margin-top:5px; font-size:14px;'>%s</div>
        </div>
      """, valor, título);
        }


        public ResumenMemoriaDTO getResumenPorAnio(Integer anio) {
            ResumenMemoriaDTO resumen = new ResumenMemoriaDTO();
            resumen.setAnio(anio);

            // ✅ Cargar datos globales
            List<IndicadorAnual> lista = indicadoresAnualesRepository.findByAnio(anio);
            IndicadorAnual datos = lista.isEmpty() ? null : lista.get(0);

            if (datos != null) {

                resumen.setPersonasOrientadas(datos.getPersonasAtendidas());
                resumen.setActividadesFormacion(datos.getActividadesFormacion());
                resumen.setParticipantesFormacion(datos.getParticipantesFormacion());
                resumen.setContrataciones(datos.getContrataciones());
                resumen.setEmpresasCreadas(empresaRepository.countEmpresasByAnio(anio));
                resumen.setAsesoramientos(datos.getAsesoramientos());
                resumen.setImporteAyudas(datos.getAyudasEntidades());
                resumen.setImporteAyudas(datos.getAyudasEmpresas());
                resumen.setImporteAyudasEmpresas(indicadoresAnualesRepository.sumAyudasEmpresasByAnio(anio));
                resumen.setHorasOrientacion(
                        indicadoresAnualesRepository.sumHorasOrientacionByAnio(anio) != null
                                ? indicadoresAnualesRepository.sumHorasOrientacionByAnio(anio)
                                : BigDecimal.ZERO
                );

                resumen.setHorasFormacion(
                        indicadoresAnualesRepository.sumHorasFormacionByAnio(anio) != null
                                ? indicadoresAnualesRepository.sumHorasFormacionByAnio(anio)
                                : BigDecimal.ZERO);

                resumen.setOfertasEmpleo(
                        indicadoresAnualesRepository.sumOfertasEmpleoByAnio(anio) != null
                                ? indicadoresAnualesRepository.sumOfertasEmpleoByAnio(anio)
                                : 0);

                resumen.setPuestosTrabajo(
                        indicadoresAnualesRepository.sumPuestosTrabajoByAnio(anio) != null
                                ? indicadoresAnualesRepository.sumPuestosTrabajoByAnio(anio)
                                : 0);
                resumen.setAyudasObservatorio(
                        indicadoresAnualesRepository.sumAyudasObservatorioByAnio(anio)
                );
                resumen.setPersonasObservatorio(
                        actividadRepository.countPersonasContratadasObservatorio(anio)
                );
                resumen.setDescripcionObservatorio(
                        "Durante el año " + anio + " se ha puesto en marcha el Observatorio de Estrategias del Pacto Territorial..."
                );
                resumen.setObjetivosObservatorio(List.of(
                        "Gestión del Pacto Territorial",
                        "Laboratorio de Nuevas Estrategias de Futuro",
                        "Evaluación y seguimiento de las acciones del Pacto",
                        "Relaciones con otros Pactos y Avalem Territori"
                ));


                resumen.setAltasDemandantes(datos.getAltasDemandantes());
                resumen.setAccionesOrientacion(datos.getAccionesOrientacion());
                resumen.setCursos(datos.getActividadesFormacion());
                resumen.setPildorasFormativas(datos.getPildorasFormativas());


                List<ServicioDTO> servicios = new ArrayList<>();
                servicios.add(new ServicioDTO("Orientación Laboral", "Acompañamiento personalizado para mejorar la empleabilidad."));
                servicios.add(new ServicioDTO("Formación Profesional", "Cursos gratuitos de formación adaptados al mercado laboral."));
                servicios.add(new ServicioDTO("Intermediación Laboral", "Conexión entre demandantes de empleo y empresas."));
                resumen.setServicios(servicios);

            } else {
                // Podrías dejar los valores en cero o loggear un warning
                System.err.println("No se encontraron indicadores para el año " + anio);
            }

            // 🔸 Si tienes datos por departamento, puedes hacer:
            List<ResumenDepartamentoDTO> departamentos = new ArrayList<>();
            indicadoresAnualesRepository.findAll().stream()
                    .filter(i -> i.getAnio() == anio)
                    .forEach(i -> {
                        ResumenDepartamentoDTO dto = new ResumenDepartamentoDTO();
                        dto.setNombre(i.getDepartamento());
                        dto.setPersonasAtendidas(i.getPersonasAtendidas());
                        dto.setParticipantes(i.getParticipantesFormacion());
                        dto.setEmpresasApoyadas(i.getAyudasEmpresas());
                        dto.setEmpresasCreadas(i.getEmpresasCreadas());
                        dto.setAsesoramientos(i.getAsesoramientos());
                        dto.setContrataciones(i.getContrataciones());
                        dto.setCursos(i.getActividadesFormacion());
                        dto.setHoras(i.getHorasFormacion());
                        // Puedes añadir más si lo necesitas
                        departamentos.add(dto);
                    });

            resumen.setResumenDepartamentos(departamentos);

            return resumen;
        }


        private String bloqueDato(String titulo, String valor) {
            return """
            <td style='padding: 10px; vertical-align: top;'>
                <span>%s</span>
            </td>
            <td style='background-color:#004080; color:white; font-weight:bold; text-align:center; padding:10px;'>
                %s
            </td>
        """.formatted(titulo, valor);
        }

        public String convertirImagenABase64DesdeResources(String rutaRelativaClasspath) throws IOException {
            try (InputStream is = getClass().getClassLoader().getResourceAsStream(rutaRelativaClasspath)) {
                if (is == null) {
                    throw new FileNotFoundException("No se encontró la imagen en classpath: " + rutaRelativaClasspath);
                }
                byte[] bytes = is.readAllBytes();
                return Base64.getEncoder().encodeToString(bytes);
            }
        }
        private String generarSeccion34AyudasEmpresas(String idDepartamento) {
            List<String> idsProyectos = proyectoRepository
                    .findByDepartamentoId(idDepartamento)
                    .stream()
                    .map(Proyecto::getId_proyecto)
                    .collect(Collectors.toList());

            List<Subvencion> subvenciones = subvencionRepository.obtenerAyudasPorProyectos(idsProyectos);

            int totalEmpresas = (int) subvenciones.stream()
                    .map(Subvencion::getEntidad)
                    .filter(Objects::nonNull)
                    .distinct()
                    .count();

            BigDecimal totalImporte = subvenciones.stream()
                    .map(subv -> BigDecimal.valueOf(subv.getImporte()))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            StringBuilder html = new StringBuilder();

            html.append("""
            <div style='page-break-before: always; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.8; padding: 20px;'>
                <div style='background-color: #fbe1d2; padding: 6px 12px; font-weight: bold; display: inline-block; border-radius: 4px; font-size: 12px;'>3.4</div>
                <h2 style='color: #f15a24; margin: 15px 0 10px;'>Ayudas Económicas a Empresas de la Ciudad de Alicante</h2>
                <hr style='border: none; border-top: 2px solid #f15a24; margin-bottom: 30px;' />
                <p><strong>Importe concedido:</strong> %s €</p>
                <p><strong>Empresas beneficiarias:</strong> %d</p>
                <table style='width:100%%; border-collapse: collapse; margin-top: 20px;'>
                    <thead>
                        <tr style='background-color: #fbe1d2;'>
                            <th style='border: 1px solid #ddd; padding: 8px;'>Entidad</th>
                            <th style='border: 1px solid #ddd; padding: 8px;'>Importe</th>
                            <th style='border: 1px solid #ddd; padding: 8px;'>Proyecto</th>
                        </tr>
                    </thead>
                    <tbody>
        """.formatted(totalImporte.toPlainString(), totalEmpresas));

            for (Subvencion subv : subvenciones) {
                html.append("""
                <tr>
                    <td style='border: 1px solid #ddd; padding: 8px;'>%s</td>
                    <td style='border: 1px solid #ddd; padding: 8px;'>%d €</td>
                    <td style='border: 1px solid #ddd; padding: 8px;'>%s</td>
                </tr>
            """.formatted(
                        safe(subv.getEntidad()),
                        subv.getImporte(),
                        subv.getProyecto() != null ? safe(subv.getProyecto().getNombre()) : "—"
                ));
            }

            html.append("""
                    </tbody>
                </table>
            </div>
        """);

            return html.toString();
        }




        private String bloqueAyuda(String titulo, String valor) {
            return """
        <div style='
            background-color: #004080;
            color: white;
            width: 45%%;
            text-align: center;
            border-radius: 6px;
            box-sizing: border-box;
        '>
            <p style='margin: 0; font-weight: bold;'>%s</p>
            <p style='font-size: 18px; font-weight: bold; margin-top: 10px;'>%s</p>
        </div>
        """.formatted(titulo, valor);
        }


        public List<CentroDTO> obtenerCentros() {
            // Usa JDBC, JPA o el CentroRepository si ya lo tienes
            return centrosRepository.findAll().stream()
                    .map(c -> new CentroDTO(c.getNombre(), c.getDireccion()))
                    .toList();
        }

        private String generarSeccionCentros() {
            List<CentroDTO> centros = obtenerCentros();

            StringBuilder html = new StringBuilder();
            html.append("""
            <div style='page-break-before: always; font-family: Arial, sans-serif;'>
              <h2 style='color: #004080;'>1.4 DÓNDE ESTAMOS</h2>
              <div style='display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between;'>
        """);

            for (CentroDTO centro : centros) {
                html.append("""
                <div style='flex: 1 1 30%%; border: 1px solid #ccc; border-radius: 8px; padding: 15px; box-sizing: border-box; min-width: 200px;'>
                    <strong>%s</strong><br />
                    <span>%s</span>
                </div>
            """.formatted(centro.getNombre(), centro.getDireccion()));
            }

            html.append("</div></div>");
            return html.toString();
        }


        private String generarSeccionAnexos(int anio) {
            return """
            <div class='section' style='page-break-before: always;'>
                <h2 style='color:#004080;'>Anexos</h2>
                
                <ol  style="line-height: 2.2; margin-left: 20px; font-size: 16px;">
                    <li>Memoria Entre Castillos %d-%d</li>
                    <li>Explotación estadística de Portalemp %d.</li>
                    <li>Cuadro Indicadores Actividad Zona Norte %d.</li>
                    <li>Cuadro Indicadores Actividad Centro Formación ALDES %d.</li>
                    <li>Programación formación anual ALDES Ed. 6 %d.</li>
                    <li>Listado píldoras-charlas formativas %d.</li>
                    <li>Informe de calidad formación auditoría interna %d.</li>
                    <li>Informe de calidad formación auditoría externa %d.</li>
                    <li>Memoria Programa Grandes Ciudades %d.</li>
                    <li>Resumen programas de fomento del empleo %d.</li>
                    <li>Memoria de ejecución PIE+45 %d.</li>
                    <li>Cursos Convenio EOI %d.</li>
                    <li>Resumen resultados subvenciones a entidades %d.</li>
                    <li>Memoria APSA %d.</li>
                    <li>Memoria Cruz Roja %d.</li>
                    <li>Memoria FSG %d.</li>
                    <li>Memoria Lanzadera Santa María la Real %d.</li>
                    <li>Programa y memoria FLC %d.</li>
                    <li>Memoria cursos ALDES-Mercalicante %d.</li>
                    <li>4ª Feria de empleo y formación Zona Norte.</li>
                    <li>Memoria IV Encuentro de Empleo dirigido a personas con diversidad funcional.</li>
                    <li>XII Concurso de decoración navideña Zona Norte de Alicante.</li>
                    <li>Memoria del servicio de asesoramiento a personas emprendedoras (Punto PAE).</li>
                    <li>Formación Centro de Emprendedores.</li>
                    <li>Informe Escuela de Talento Femenino y programación de cursos.</li>
                    <li>Memoria Impulsacultura Proyecta.</li>
                    <li>Memoria de las actuaciones LLAMP %d.</li>
                    <li>Actividades con la Universidad de Alicante.</li>
                    <li>Dossier Fikticia Med – Laboratorio Ficción.</li>
                    <li>Noticia concesión microcrédito.</li>
                    <li>Empresas instaladas en los viveros %d.</li>
                    <li>Informe ayudas a empresas %d.</li>
                    <li>TimeLine Foro Telecos.</li>
                    <li>Dossier Alicante Fashion Week %d.</li>
                    <li>Informe II Edición Valor Social Empresa.</li>
                    <li>Memoria Áreas Industriales %d.</li>
                    <li>Memoria declaración proyectos prioritarios %d.</li>
                    <li>Memoria Observatorio Pacto Territorial – EMPACE.</li>
                    <li>Informe EPA 4º trimestre de %d.</li>
                    <li>Informe paro y contratos diciembre %d.</li>
                    <li>Memoria “Un Mar de Cine %d”.</li>
                    <li>Memoria Congreso Internacional Alicante Futura.</li>
                    <li>Memoria Smartphone Film Festival.</li>
                    <li>Memoria Alicante Futura %d.</li>
                    <li>Memoria final ALIA.</li>
                    <li>Memoria Cilab Alicante %d.</li>
                    <li>Proyectos europeos.</li>
                    <li>Congreso Euthenia Conference %d.</li>
                    <li>Informe Congreso ERSA %d.</li>
                    <li>Actividades Auditorio Puerta Ferrisa.</li>
                    <li>Contratos mayores formalizados en %d.</li>
                    <li>Contratos menores formalizados en %d.</li>
                    <li>Informe de comunicación %d.</li>
                    <li>Noticias web %d.</li>
                </ol>
            </div>
            """.formatted(
                    anio - 1, anio, // Entre Castillos
                    anio, anio, anio, anio, anio, anio, anio, anio, anio, anio, anio,
                    anio, anio, anio, anio, anio, anio, // hasta el 19
                    anio, // LLAMP
                    anio, anio, anio, anio, anio, anio, anio, anio, anio, anio, anio, anio, anio,
                    anio, anio, anio, anio, anio, anio, anio, anio, anio, anio, anio,
                    anio, anio, anio, anio, anio, anio
            );
        }

    }
