-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: impulsaalicante
-- ------------------------------------------------------
-- Server version	8.0.35

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
  `id_actividad` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `fecha_ini` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `num_participantes` int DEFAULT '0',
  `id_departamento` varchar(20) NOT NULL,
  PRIMARY KEY (`id_actividad`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` VALUES ('A001','Taller Cultural','Un taller para fomentar la innovación.','2024-06-01','2024-06-30',30,'RRHH'),('A002','Taller de Ingenieria','Un taller para aprender.','2024-06-10','2024-06-25',30,'RRHH');
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campanya_marketing`
--

DROP TABLE IF EXISTS `campanya_marketing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campanya_marketing` (
  `id_campanya` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_departamento` varchar(20) NOT NULL,
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
  PRIMARY KEY (`id_centro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centro`
--

LOCK TABLES `centro` WRITE;
/*!40000 ALTER TABLE `centro` DISABLE KEYS */;
INSERT INTO `centro` VALUES ('4','Sede PEPE','Calle Ficticia 123, Alicante'),('C2','Centro Sur','Avenida de Ejemplo 456, Alicante'),('C3','Centro Este','Plaza de la Ciudad 789, Alicante'),('T1','Territorio 1','Calle Falsa 123');
/*!40000 ALTER TABLE `centro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrato`
--

DROP TABLE IF EXISTS `contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrato` (
  `id_contrato` varchar(20) NOT NULL,
  `importe_adjudicacion` decimal(10,2) NOT NULL,
  `id_departamento` varchar(20) NOT NULL,
  `id_tipo_contrato` varchar(45) NOT NULL,
  PRIMARY KEY (`id_contrato`,`id_tipo_contrato`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE
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
INSERT INTO `departamento` VALUES ('RRHH','Recursos Humanos');
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
  `departamento` varchar(100) NOT NULL,
  `personas_atendidas` int DEFAULT '0',
  `contrataciones` int DEFAULT '0',
  `empresas_creadas` int DEFAULT '0',
  `actividades_formacion` int DEFAULT '0',
  `participantes_formacion` int DEFAULT '0',
  `horas_formacion` int DEFAULT '0',
  `asesoramientos` int DEFAULT '0',
  `ayudas_empresas` decimal(12,2) DEFAULT NULL,
  `ayudas_entidades` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indicadores_anuales`
--

LOCK TABLES `indicadores_anuales` WRITE;
/*!40000 ALTER TABLE `indicadores_anuales` DISABLE KEYS */;
INSERT INTO `indicadores_anuales` VALUES (1,2025,'empleo',7360,199,54,99,1301,6092,347,3944170.34,247271.99,'2025-04-24 07:19:54');
/*!40000 ALTER TABLE `indicadores_anuales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpis`
--

DROP TABLE IF EXISTS `kpis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kpis` (
  `id_kpi` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `valor_esperado` decimal(10,2) DEFAULT NULL,
  `valor_actual` decimal(10,2) DEFAULT NULL,
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
  `fecha_ini` date DEFAULT NULL,
  `fecha_fin` datetime(6) DEFAULT NULL,
  `id_departamento` varchar(10) NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  KEY `id_departamento` (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES ('P1','Proyecto A','Desarrollar una nueva página web',NULL,'2024-06-15 00:00:00.000000','RRHH');
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
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
  `id_subvencion` varchar(20) NOT NULL,
  `entidad` varchar(255) NOT NULL,
  `importe` decimal(10,2) NOT NULL,
  `id_estado_sub` varchar(20) NOT NULL DEFAULT 'E001',
  `id_proyecto` varchar(20) DEFAULT NULL,
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
INSERT INTO `subvencion` VALUES ('S001','Entidad pepe',5000.00,'E001',NULL),('S002','Comunidad Valenciana',5000.00,'E002',NULL),('S003','Fundación La Caixa',20000.00,'E003',NULL),('S004','Gobierno de España',15000.00,'E004',NULL),('S005','Universidad de Alicante',12000.00,'E005',NULL),('S006','Ayuntamiento de Alicante',8000.00,'E006',NULL);
/*!40000 ALTER TABLE `subvencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_contrato`
--

DROP TABLE IF EXISTS `tipo_contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_contrato` (
  `id_tipo_contrato` varchar(20) NOT NULL,
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
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `contrasenya` varchar(45) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('Juan','Pérez García','juan.perez@example.com','1234Segura','612345678'),('Juan','Pérez','prueba123@gmail.com','123456','666777888'),(NULL,NULL,'prueba33@gmail.com','123456',NULL);
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

-- Dump completed on 2025-05-05 13:00:36
