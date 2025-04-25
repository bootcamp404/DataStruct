package es.impulsalicante.ApiFuturaAlicante.services;

import es.impulsalicante.ApiFuturaAlicante.dto.ResumenMemoriaDTO;
import es.impulsalicante.ApiFuturaAlicante.dto.ResumenDepartamentoDTO;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;
import java.io.ByteArrayOutputStream;



import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Service
public class ResumenMemoriaService {
    private String plantillaConDatos(ResumenMemoriaDTO datos, int anio) {
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
                .append("<p style='margin-top: 150px;'>AGENCIA LOCAL DE DESARROLLO ECONÓMICO Y SOCIAL</p>")
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

        // Contenido general
        html.append("<div style='page-break-after: always;'>")
                .append("<h2 style='color:#004080;'>Agencia Local en Cifras</h2>")
                .append("<table style='width: 100%; font-family: Arial, sans-serif; font-size: 14px; border-collapse: collapse;'>")

                // Fila: Total y nuevos usuarios
                .append("<tr>")
                .append("<td colspan='2' style='background-color:#004080; color:white; text-align:center; font-weight:bold; padding:10px;'>Total usuarios:<br/><span style='font-size: 22px;'>11.662</span></td>")
                .append("<td colspan='2' style='background-color:#004080; color:white; text-align:center; font-weight:bold; padding:10px;'>Nuevos usuarios:<br/><span style='font-size: 22px;'>1.979</span></td>")
                .append("</tr>")

                // Fila 1
                .append("<tr>")
                .append(bloqueDato("Nº personas atendidas en orientación:", String.valueOf(datos.getPersonasOrientadas())))
                .append(bloqueDato("Actividades formativas:", String.valueOf(datos.getActividadesFormacion())))
                .append("</tr>")

                // Fila 2
                .append("<tr>")
                .append(bloqueDato("Horas de orientación laboral realizadas:", "9.552")) // si tienes ese dato, ponlo real
                .append(bloqueDato("Horas de formación:", "6.881"))
                .append("</tr>")

                // Fila 3
                .append("<tr>")
                .append(bloqueDato("Ofertas de empleo gestionadas:", "199"))
                .append(bloqueDato("Participantes en actividades formativas:", String.valueOf(datos.getParticipantesFormacion())))
                .append("</tr>")

                // Fila 4
                .append("<tr>")
                .append(bloqueDato("Puestos de trabajo:", "2.038"))
                .append(bloqueDato("Asesoramiento empresas y emprendedores:", String.valueOf(datos.getAsesoramientos())))
                .append("</tr>")

                // Fila 5
                .append("<tr>")
                .append(bloqueDato("Personas contratadas:", String.valueOf(datos.getContrataciones())))
                .append(bloqueDato("Empresas creadas:", String.valueOf(datos.getEmpresasCreadas())))
                .append("</tr>")

                // Fila 6
                .append("<tr>")
                .append(bloqueDato("Empresas en viveros:", "14"))
                .append(bloqueDato("", "")) // celda vacía para cerrar
                .append("</tr>")

                .append("</table>")

                // Ayudas
                .append("<div style='display: flex; justify-content: center; margin-top: 30px;'>")
                .append(bloqueAyuda("Ayudas concedidas a empresas", "3.944.170,34 €"))
                .append(bloqueAyuda("Ayudas concedidas a entidades", datos.getImporteAyudas().toString() + " €"))
                .append("</div>")

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

        html.append("</tbody></table></div>");
        html.append("</body></html>");

        return html.toString();
    }

    public byte[] generarPdf(int anio) {
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
            return new byte[0]; // O lanza un error HTTP 500 desde el controller
        }
    }

    public ResumenMemoriaDTO getResumenPorAnio(Integer anio) {
        ResumenMemoriaDTO resumen = new ResumenMemoriaDTO();
        resumen.setAnio(anio);

        // 🔹 Ejemplo de datos ficticios (simulados por ahora)
        resumen.setPresupuestoTotal(new BigDecimal("1000000.00"));
        resumen.setPresupuestoEjecutado(new BigDecimal("847500.00"));
        resumen.setPorcentajeEjecucion(84.75);

        resumen.setPersonasOrientadas(7360);
        resumen.setActividadesFormacion(99);
        resumen.setParticipantesFormacion(1301);
        resumen.setContrataciones(199);
        resumen.setEmpresasCreadas(54);
        resumen.setAsesoramientos(347);
        resumen.setAyudasEmpresas(28);
        resumen.setImporteAyudas(new BigDecimal("247271.99"));

        // 🔹 Simular departamentos
        List<ResumenDepartamentoDTO> departamentos = new ArrayList<>();

        ResumenDepartamentoDTO empleo = new ResumenDepartamentoDTO();
        empleo.setId("EF");
        empleo.setNombre("Empleo Formación");
        empleo.setPersonasAtendidas(4200);
        empleo.setAltasDemandantes(1200);
        empleo.setAccionesOrientacion(850);
        empleo.setCursos(62);
        empleo.setParticipantes(900);
        empleo.setHoras(5400);
        empleo.setEmpresasApoyadas(17);
        empleo.setNuevasEmpresas(9);
        empleo.setSesionesAsesoramiento(134);

        departamentos.add(empleo);

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

    private String bloqueAyuda(String titulo, String valor) {
        return """
        <div style='background-color: #004080; color: white; padding: 20px; margin: 10px; text-align: center; width: 250px;'>
            <p style='margin: 0; font-weight: bold;'>%s</p>
            <p style='font-size: 18px; font-weight: bold; margin-top: 10px;'>%s</p>
        </div>
    """.formatted(titulo, valor);
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
