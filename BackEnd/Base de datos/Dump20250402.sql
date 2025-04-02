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
  CONSTRAINT `actividad_valoracion_participante_ibfk_2` FOREIGN KEY (`id_valoracion`) REFERENCES `valoracion` (`id_valoracion`) ON DELETE CASCADE,
  CONSTRAINT `actividad_valoracion_participante_ibfk_3` FOREIGN KEY (`id_participante`) REFERENCES `participante` (`id_participante`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_valoracion_participante`
--

LOCK TABLES `actividad_valoracion_participante` WRITE;
/*!40000 ALTER TABLE `actividad_valoracion_participante` DISABLE KEYS */;
INSERT INTO `actividad_valoracion_participante` VALUES ('A001','V003','P003');
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
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `dni` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id_departamento` varchar(20) NOT NULL,
  PRIMARY KEY (`dni`),
  UNIQUE KEY `email` (`email`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES ('45612378M','BBB','AAA','111222333','pepe.aaa@example.com','RRHH'),('78912345K','Quentin','Tarantino','444555666','quentin.t@example.com','RRHH'),('87654321Z','Pepe','Viyuela','987654321','pepe.viyuela@example.com','RRHH');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
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
INSERT INTO `estado_subvencion` VALUES ('E001','Pendiente'),('E002','Aprobada'),('E003','Rechazada'),('E004','En proceso'),('E005','Finalizada'),('E006','Cancelada');
/*!40000 ALTER TABLE `estado_subvencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participante`
--

DROP TABLE IF EXISTS `participante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participante` (
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
-- Dumping data for table `participante`
--

LOCK TABLES `participante` WRITE;
/*!40000 ALTER TABLE `participante` DISABLE KEYS */;
INSERT INTO `participante` VALUES ('P003','Pepe','García','pepe.ejemplo@gmail.com','123456789');
/*!40000 ALTER TABLE `participante` ENABLE KEYS */;
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
  `fecha_inicio` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id_proyecto`),
  KEY `id_departamento` (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES ('P1','Proyecto A','Desarrollar una nueva página web',NULL,'2024-06-15 00:00:00.000000','RRHH','2024-03-15 00:00:00.000000');
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `id_centro` varchar(255) NOT NULL,
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
INSERT INTO `sede` VALUES ('4','RRHH');
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
INSERT INTO `subvencion` VALUES ('S001','Entidad pepe',5000.00,'E001'),('S002','Comunidad Valenciana',5000.00,'E002'),('S003','Fundación La Caixa',20000.00,'E003'),('S004','Gobierno de España',15000.00,'E004'),('S005','Universidad de Alicante',12000.00,'E005'),('S006','Ayuntamiento de Alicante',8000.00,'E006');
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
  CONSTRAINT `territorio_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id_centro`),
  CONSTRAINT `territorio_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `territorio`
--

LOCK TABLES `territorio` WRITE;
/*!40000 ALTER TABLE `territorio` DISABLE KEYS */;
INSERT INTO `territorio` VALUES ('T1','P1',1);
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
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `NIF` varchar(9) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoracion`
--

DROP TABLE IF EXISTS `valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoracion` (
  `id_valoracion` varchar(20) NOT NULL,
  `estrellas` int DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id_valoracion`),
  CONSTRAINT `valoracion_chk_1` CHECK ((`estrellas` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoracion`
--

LOCK TABLES `valoracion` WRITE;
/*!40000 ALTER TABLE `valoracion` DISABLE KEYS */;
INSERT INTO `valoracion` VALUES ('V002',4,'Un taller para fomentar la innovación en empresas. Muy recomendado'),('V003',4,'Un taller muy bueno.');
/*!40000 ALTER TABLE `valoracion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-02 10:11:41
