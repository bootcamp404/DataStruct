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
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actividad_valoracion_participante`
--

DROP TABLE IF EXISTS `actividad_valoracion_participante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_valoracion_participante` (
  `id_actividad` varchar(20) NOT NULL,
  `id_valoracion` varchar(20) NOT NULL,
  `id_participante` varchar(20) NOT NULL,
  PRIMARY KEY (`id_actividad`,`id_participante`),
  KEY `id_valoracion` (`id_valoracion`),
  KEY `id_participante` (`id_participante`),
  CONSTRAINT `actividad_valoracion_participante_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id_actividad`) ON DELETE CASCADE,
  CONSTRAINT `actividad_valoracion_participante_ibfk_2` FOREIGN KEY (`id_valoracion`) REFERENCES `valoraciones` (`id_valoracion`) ON DELETE CASCADE,
  CONSTRAINT `actividad_valoracion_participante_ibfk_3` FOREIGN KEY (`id_participante`) REFERENCES `participantes` (`id_participante`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_valoracion_participante`
--

LOCK TABLES `actividad_valoracion_participante` WRITE;
/*!40000 ALTER TABLE `actividad_valoracion_participante` DISABLE KEYS */;
/*!40000 ALTER TABLE `actividad_valoracion_participante` ENABLE KEYS */;
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
  `id_centro` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(355) NOT NULL,
  PRIMARY KEY (`id_centro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centro`
--

LOCK TABLES `centro` WRITE;
/*!40000 ALTER TABLE `centro` DISABLE KEYS */;
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
  PRIMARY KEY (`id_contrato`),
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
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `dni` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id_departamento` varchar(20) NOT NULL,
  PRIMARY KEY (`dni`),
  UNIQUE KEY `email` (`email`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_subvencion`
--

DROP TABLE IF EXISTS `estado_subvencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_subvencion` (
  `id_estado_sub` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_estado_sub`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_subvencion`
--

LOCK TABLES `estado_subvencion` WRITE;
/*!40000 ALTER TABLE `estado_subvencion` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado_subvencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participantes`
--

DROP TABLE IF EXISTS `participantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participantes` (
  `id_participante` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_participante`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantes`
--

LOCK TABLES `participantes` WRITE;
/*!40000 ALTER TABLE `participantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `participantes` ENABLE KEYS */;
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
  `objetivo` text,
  `fecha_ini` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `id_departamento` varchar(20) NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id_centro` varchar(20) NOT NULL,
  `id_departamento` varchar(20) NOT NULL,
  PRIMARY KEY (`id_centro`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `sede_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id_centro`) ON DELETE CASCADE,
  CONSTRAINT `sede_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
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
  PRIMARY KEY (`id_subvencion`),
  KEY `id_estado_sub` (`id_estado_sub`),
  CONSTRAINT `subvencion_ibfk_1` FOREIGN KEY (`id_estado_sub`) REFERENCES `estado_subvencion` (`id_estado_sub`) ON DELETE RESTRICT,
  CONSTRAINT `subvencion_ibfk_2` FOREIGN KEY (`id_estado_sub`) REFERENCES `estado_subvencion` (`id_estado_sub`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subvencion`
--

LOCK TABLES `subvencion` WRITE;
/*!40000 ALTER TABLE `subvencion` DISABLE KEYS */;
/*!40000 ALTER TABLE `subvencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `territorio`
--

DROP TABLE IF EXISTS `territorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `territorio` (
  `id_centro` varchar(20) NOT NULL,
  `id_proyecto` varchar(20) NOT NULL,
  `es_vivero_empresarial` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_centro`),
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `territorio_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id_centro`) ON DELETE CASCADE,
  CONSTRAINT `territorio_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `territorio`
--

LOCK TABLES `territorio` WRITE;
/*!40000 ALTER TABLE `territorio` DISABLE KEYS */;
/*!40000 ALTER TABLE `territorio` ENABLE KEYS */;
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
  `id_contrato` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_contrato`),
  KEY `id_contrato` (`id_contrato`),
  CONSTRAINT `tipo_contrato_ibfk_1` FOREIGN KEY (`id_contrato`) REFERENCES `contrato` (`id_contrato`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_contrato`
--

LOCK TABLES `tipo_contrato` WRITE;
/*!40000 ALTER TABLE `tipo_contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoraciones`
--

DROP TABLE IF EXISTS `valoraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoraciones` (
  `id_valoracion` varchar(20) NOT NULL,
  `estrellas` int DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id_valoracion`),
  CONSTRAINT `valoraciones_chk_1` CHECK ((`estrellas` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoraciones`
--

LOCK TABLES `valoraciones` WRITE;
/*!40000 ALTER TABLE `valoraciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `valoraciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-20 11:25:16
