-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: impulsaalicante
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad` (
  `id_actividad` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_ini` datetime(6) DEFAULT NULL,
  `fecha_fin` datetime(6) DEFAULT NULL,
  `num_participantes` int DEFAULT '0',
  `id_departamento` varchar(255) NOT NULL,
  `horas` int DEFAULT NULL,
  `id_proyecto` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_actividad`),
  KEY `actividad_ibfk_1` (`id_departamento`),
  KEY `fk_actividad_proyecto` (`id_proyecto`),
  CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`),
  CONSTRAINT `fk_actividad_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` VALUES ('A001','Asesoramiento Empresarial','Asesoramiento individualizado a personas emprendedoras','2025-03-01 00:00:00.000000','2025-03-31 00:00:00.000000',50,'D3',30,'P001'),('A002','Mentorías','Mentorías para emprendedores con ideas innovadoras','2025-04-01 00:00:00.000000','2025-04-15 00:00:00.000000',35,'D3',20,'P001'),('A003','Formación básica','Formación para nuevos emprendedores','2025-05-10 00:00:00.000000','2025-05-20 00:00:00.000000',60,'D3',25,'P002'),('A004','Gestión y Competencias Empresariales','Sesiones formativas sobre emprendimiento','2025-06-01 00:00:00.000000','2025-06-10 00:00:00.000000',40,'D3',15,'P002');
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campanya_marketing`
--

DROP TABLE IF EXISTS `campanya_marketing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campanya_marketing` (
  `id_campanya` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_departamento` varchar(20) NOT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id_campanya`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `campanya_marketing_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campanya_marketing`
--

LOCK TABLES `campanya_marketing` WRITE;
/*!40000 ALTER TABLE `campanya_marketing` DISABLE KEYS */;
/*!40000 ALTER TABLE `campanya_marketing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centro`
--

DROP TABLE IF EXISTS `centro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `centro` (
  `id_centro` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `id_departamento` varchar(255) DEFAULT NULL,
  `id_proyecto` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_centro`),
  KEY `FKg0jcf57sxyf9o6fh0nmbu43p` (`id_departamento`),
  KEY `FKlk45s6cc8gmg134ot4etdavuh` (`id_proyecto`),
  CONSTRAINT `FKg0jcf57sxyf9o6fh0nmbu43p` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`),
  CONSTRAINT `FKlk45s6cc8gmg134ot4etdavuh` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centro`
--

LOCK TABLES `centro` WRITE;
/*!40000 ALTER TABLE `centro` DISABLE KEYS */;
INSERT INTO `centro` VALUES ('4','Sede PEPE','Calle Ficticia 123, Alicante',NULL,NULL,NULL),('C100','Centro de Formación Norte','Calle Norte 123, Alicante',NULL,'D1',NULL),('C101','Centro de Formación Sur','Calle Sur 456, Alicante',NULL,'D1',NULL),('C102','Centro Integral de Empleo','Avenida Empleo 789, Alicante',NULL,'D1',NULL),('C2','Centro Sur','Avenida de Ejemplo 456, Alicante',NULL,NULL,NULL),('C3','Centro Este','Plaza de la Ciudad 789, Alicante',NULL,NULL,NULL),('T1','Territorio 1','Calle Falsa 123',NULL,NULL,NULL);
/*!40000 ALTER TABLE `centro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrato`
--

DROP TABLE IF EXISTS `contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrato` (
  `id_contrato` varchar(255) NOT NULL,
  `importe_adjudicacion` double DEFAULT NULL,
  `id_departamento` varchar(20) NOT NULL,
  `id_tipo_contrato` varchar(255) NOT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id_contrato`,`id_tipo_contrato`),
  KEY `id_departamento` (`id_departamento`),
  KEY `FK39kcipdsdxfggxtae0w0r8od7` (`id_tipo_contrato`),
  CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE,
  CONSTRAINT `FK39kcipdsdxfggxtae0w0r8od7` FOREIGN KEY (`id_tipo_contrato`) REFERENCES `tipo_contrato` (`id_tipo_contrato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrato`
--

LOCK TABLES `contrato` WRITE;
/*!40000 ALTER TABLE `contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convenio`
--

DROP TABLE IF EXISTS `convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `convenio` (
  `id` varchar(20) NOT NULL,
  `entidad` varchar(255) DEFAULT NULL,
  `programa_nombre` varchar(255) DEFAULT NULL,
  `importe` decimal(10,2) DEFAULT NULL,
  `numero_actividades` int DEFAULT NULL,
  `numero_participantes` int DEFAULT NULL,
  `numero_horas` int DEFAULT NULL,
  `lineas_actuacion` text,
  `observaciones` text,
  `anexo` varchar(100) DEFAULT NULL,
  `fecha_firma` date DEFAULT NULL,
  `fecha_fin_vigencia` date DEFAULT NULL,
  `id_departamento` varchar(20) DEFAULT NULL,
  `cursos` text,
  `indicadores` text,
  `ambitos_intervencion` text,
  `participantes_hombres` int DEFAULT NULL,
  `participantes_mujeres` int DEFAULT NULL,
  `observaciones_adicionales` text,
  PRIMARY KEY (`id`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `convenio_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenio`
--

LOCK TABLES `convenio` WRITE;
/*!40000 ALTER TABLE `convenio` DISABLE KEYS */;
INSERT INTO `convenio` VALUES ('CN001','APSA','Inclusión de personas con discapacidad',10000.00,5,80,120,'Inserción laboral, formación ocupacional','Anexo I completo','Anexo I','2024-03-15','2025-03-15','D2',NULL,NULL,NULL,NULL,NULL,NULL),('CN002','Cruz Roja','Programa Refuerzo Educativo',10000.00,4,60,90,'Talleres de apoyo escolar','Anexo II validado','Anexo II','2024-02-01','2025-02-01','D1',NULL,NULL,NULL,NULL,NULL,NULL),('CN003','Fundación Secretariado Gitano','Acción Gitana Empleo',9000.00,6,100,150,'Orientación laboral, formación digital','Alta participación','Anexo III','2024-01-10','2025-01-10','D1',NULL,NULL,NULL,NULL,NULL,NULL),('CN004','Santa María del Mar','Talleres de capacitación',8500.00,3,45,75,'Formación práctica','Satisfacción elevada','Anexo IV','2024-04-01','2025-04-01','D1',NULL,NULL,NULL,NULL,NULL,NULL),('CN005','Fundación Laboral de la Construcción','Plan Formativo Construcción',15000.00,8,120,200,'Formación teórico-práctica','Demanda sectorial alta','Anexo V','2024-05-20','2025-05-20','D1',NULL,NULL,NULL,NULL,NULL,NULL),('CN006','Mercalicante','Plan Agroalimentario',10000.00,7,110,195,'Seguridad alimentaria, logística','Buena acogida empresarial','Anexo VI','2024-06-01','2025-06-01','D1',NULL,NULL,NULL,NULL,NULL,NULL),('CNV100','APSA','Contratación de trabajadores con discapacidad intelectual',16000.00,0,2,NULL,'Ayudante de oficina','Buen desempeño laboral','Anexo 14','2024-01-15','2024-12-31','D2',NULL,NULL,NULL,1,1,NULL),('CNV101','Cruz Roja','Puentes hacia el empleo: itinerarios por la igualdad',10000.00,6,121,893,'Orientación e inserción sociolaboral','Alta participación y resultados visibles','Anexo 15','2024-02-01','2024-12-31','D2','4','6.589,66 h orientación / 6 acciones / 57 inserciones','Igualdad de oportunidades y formación técnica',83,38,'Personas insertadas con seguimiento social'),('CNV102','Fundación Secretariado Gitano','Acceder',10000.00,NULL,526,NULL,'Formación y empleabilidad de población gitana','Contrataciones y apoyo al autoempleo','Anexo 16','2024-03-01','2024-12-31','D2','3','54 acciones / 108 contrataciones / 26 autoempleo','Educación secundaria y empleabilidad',378,148,'22% contratos indefinidos'),('CNV103','Fundación Santa María la Real','Lanzadera Conecta Empleo Alicante 2023',8000.00,1,30,NULL,'Mejora de empleabilidad','Inserción y contrataciones efectivas','Anexo 17','2024-04-01','2024-12-31','D2','1','6 contrataciones indefinidas','Emprendimiento, innovación social',16,14,'Participantes en situación de desempleo'),('CV006','Fundación Secretariado Gitano','Acceder',10000.00,6,526,150,'Formación para inserción laboral','Buen resultado general','Anexo Gitano','2024-02-01','2024-12-31','D1','Empoderamiento digital, habilidades sociales','54 formados, 108 contrataciones, 11 en graduado secundaria','Empleo, juventud, mujeres',300,226,'22% contratos indefinidos. 26 autoempleo.');
/*!40000 ALTER TABLE `convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id_departamento` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES ('D1','Empleo y Formación'),('D2','Departamento de Empleo y Formación'),('D3','Promoción Económica'),('RRHH','Recursos Humanos');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id_empresa` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `id_departamento` varchar(20) NOT NULL,
  `id_sector` int DEFAULT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `id_departamento` (`id_departamento`),
  KEY `id_sector` (`id_sector`),
  CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE,
  CONSTRAINT `empresa_ibfk_2` FOREIGN KEY (`id_sector`) REFERENCES `sector_empresa` (`id_sector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_subvencion`
--

DROP TABLE IF EXISTS `estado_subvencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_subvencion` (
  `id_estado_sub` varchar(20) NOT NULL,
  PRIMARY KEY (`id_estado_sub`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_subvencion`
--

LOCK TABLES `estado_subvencion` WRITE;
/*!40000 ALTER TABLE `estado_subvencion` DISABLE KEYS */;
INSERT INTO `estado_subvencion` VALUES ('E001'),('E002'),('E003'),('E004'),('E005'),('E006');
/*!40000 ALTER TABLE `estado_subvencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indicadores_anuales`
--

DROP TABLE IF EXISTS `indicadores_anuales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indicadores_anuales` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `anio` int NOT NULL,
  `departamento` varchar(255) NOT NULL,
  `personas_atendidas` int DEFAULT '0',
  `contrataciones` int DEFAULT '0',
  `empresas_creadas` int DEFAULT '0',
  `actividades_formacion` int DEFAULT '0',
  `participantes_formacion` int DEFAULT '0',
  `horas_formacion` int DEFAULT '0',
  `asesoramientos` int DEFAULT '0',
  `ayudas_empresas` decimal(12,2) DEFAULT NULL,
  `ayudas_entidades` decimal(38,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `horas_orientacion` int DEFAULT '0',
  `ofertas_empleo` int DEFAULT NULL,
  `puestos_trabajo` int DEFAULT NULL,
  `pildoras_formativas` int DEFAULT NULL,
  `acciones_orientacion` int DEFAULT NULL,
  `altas_demandantes` int DEFAULT NULL,
  `empleos_creados` int DEFAULT NULL,
  `altas_autonomos` int DEFAULT NULL,
  `bajas_autonomos` int DEFAULT NULL,
  `sociedades` int DEFAULT NULL,
  `candidatos_tramitados` int DEFAULT NULL,
  `creditos_concedidos` int DEFAULT NULL,
  `importe_microcreditos` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indicadores_anuales`
--

LOCK TABLES `indicadores_anuales` WRITE;
/*!40000 ALTER TABLE `indicadores_anuales` DISABLE KEYS */;
INSERT INTO `indicadores_anuales` VALUES (1,2025,'empleo',7360,199,54,99,1301,6092,347,3944170.34,247271.99,'2025-04-24 07:19:54',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,2025,'D3',150,40,12,8,160,320,25,12500.00,3500.00,'2025-05-14 11:07:48',60,5,10,7,15,20,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `indicadores_anuales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpis`
--

DROP TABLE IF EXISTS `kpis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kpis` (
  `id_kpi` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `valor_esperado` float DEFAULT NULL,
  `valor_actual` float DEFAULT NULL,
  `id_empresa` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_kpi`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `kpis_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpis`
--

LOCK TABLES `kpis` WRITE;
/*!40000 ALTER TABLE `kpis` DISABLE KEYS */;
/*!40000 ALTER TABLE `kpis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `id_proyecto` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `objetivo` varchar(255) DEFAULT NULL,
  `fecha_ini` datetime(6) DEFAULT NULL,
  `fecha_fin` datetime(6) DEFAULT NULL,
  `id_departamento` varchar(255) NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  KEY `FKmqx7nlse5yxfk06t06jbcsw0j` (`id_departamento`),
  CONSTRAINT `FKmqx7nlse5yxfk06t06jbcsw0j` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES ('A001','Proyecto Empleo Joven','Fomentar la empleabilidad en jóvenes menores de 30 años','2024-01-15 00:00:00.000000','2024-07-15 00:00:00.000000','D1'),('A002','Taller TIC para Mayores','Reducir la brecha digital en personas mayores de 55 años','2024-03-01 00:00:00.000000','2024-06-30 00:00:00.000000','D1'),('A003','Formación Inclusiva','Desarrollar habilidades laborales en colectivos vulnerables','2024-02-01 00:00:00.000000','2024-05-15 00:00:00.000000','D1'),('A004','Portal de Empleo Online','Actualizar y mejorar la plataforma de búsqueda de empleo','2024-01-01 00:00:00.000000','2024-12-31 00:00:00.000000','D1'),('P001','Proyecto Empleo Joven','Fomentar la empleabilidad en jóvenes menores de 30 años','2024-01-15 00:00:00.000000','2024-07-15 00:00:00.000000','D1'),('P002','Taller TIC para Mayores','Reducir la brecha digital en personas mayores de 55 años','2024-03-01 00:00:00.000000','2024-06-30 00:00:00.000000','D1'),('P003','Formación Inclusiva','Desarrollar habilidades laborales en colectivos vulnerables','2024-02-01 00:00:00.000000','2024-05-15 00:00:00.000000','D1'),('P004','Portal de Empleo Online','Actualizar y mejorar la plataforma de búsqueda de empleo local','2024-01-01 00:00:00.000000','2024-12-31 00:00:00.000000','D1'),('P011','Oficina de asesoramiento a emprendedores (Punto PAE)','Fomentar el emprendimiento mediante el acompañamiento y asesoramiento.','2025-01-15 00:00:00.000000','2025-12-15 00:00:00.000000','D3'),('P012','Formación Centro de Emprendedores','Impulsar el conocimiento y habilidades para la creación de empresas.','2025-02-01 00:00:00.000000','2025-11-30 00:00:00.000000','D3'),('P1','Proyecto A','Desarrollar una nueva página web',NULL,'2024-06-15 00:00:00.000000','RRHH'),('P5','Proyecto B','Desarrollar una nueva página web',NULL,'2024-06-15 00:00:00.000000','RRHH');
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador total');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector_empresa`
--

DROP TABLE IF EXISTS `sector_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector_empresa` (
  `id_sector` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_sector`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector_empresa`
--

LOCK TABLES `sector_empresa` WRITE;
/*!40000 ALTER TABLE `sector_empresa` DISABLE KEYS */;
INSERT INTO `sector_empresa` VALUES (1,'Tecnología');
/*!40000 ALTER TABLE `sector_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subvencion`
--

DROP TABLE IF EXISTS `subvencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subvencion` (
  `id_subvencion` varchar(255) NOT NULL,
  `entidad` varchar(255) NOT NULL,
  `importe` int DEFAULT NULL,
  `id_estado_sub` varchar(20) NOT NULL DEFAULT 'E001',
  `id_proyecto` varchar(20) DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `modalidad` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_subvencion`),
  KEY `id_estado_sub` (`id_estado_sub`),
  KEY `fk_subvencion_proyecto` (`id_proyecto`),
  CONSTRAINT `fk_subvencion_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`),
  CONSTRAINT `subvencion_ibfk_1` FOREIGN KEY (`id_estado_sub`) REFERENCES `estado_subvencion` (`id_estado_sub`) ON DELETE RESTRICT,
  CONSTRAINT `subvencion_ibfk_2` FOREIGN KEY (`id_estado_sub`) REFERENCES `estado_subvencion` (`id_estado_sub`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subvencion`
--

LOCK TABLES `subvencion` WRITE;
/*!40000 ALTER TABLE `subvencion` DISABLE KEYS */;
INSERT INTO `subvencion` VALUES ('S001','Entidad Pepe',5000,'E001','P001','2024-01-20 00:00:00.000000','A'),('S002','Comunidad Valenciana',5000,'E002','P002','2024-02-15 00:00:00.000000','B'),('S003','Fundación La Caixa',20000,'E003','P003','2024-02-25 00:00:00.000000','C'),('S004','Gobierno de España',15000,'E004','P004','2024-03-10 00:00:00.000000','A'),('S005','Universidad de Alicante',12000,'E005','P002','2024-04-01 00:00:00.000000','B');
/*!40000 ALTER TABLE `subvencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_contrato`
--

DROP TABLE IF EXISTS `tipo_contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_contrato` (
  `id_tipo_contrato` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_contrato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_contrato`
--

LOCK TABLES `tipo_contrato` WRITE;
/*!40000 ALTER TABLE `tipo_contrato` DISABLE KEYS */;
INSERT INTO `tipo_contrato` VALUES ('T001','Contratado');
/*!40000 ALTER TABLE `tipo_contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`),
  KEY `FK_USUARIO_ROL_idx` (`id_rol`),
  CONSTRAINT `FK_USUARIO_ROL` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('ivan',NULL,'ivan@gmail.com','123456',NULL,1),('leo',NULL,'leo@gmail.com','123456',NULL,1),('prueba','1','prueba123@gmail.com','123456',NULL,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-23 11:26:02
