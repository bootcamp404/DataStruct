export interface ServicioDTO {
  nombre: string;
  descripcion: string;
}

export interface ResumenDepartamentoDTO {
  nombre: string;
  personasAtendidas: number;
  participantes: number;
  empresasApoyadas: number;
  empresasCreadas: number;
  asesoramientos: number;
  contrataciones: number;
  cursos: number;
  horas: number;
}

export interface ResumenMemoriaDTO {
  anio: number;
  personasOrientadas: number;
  altasDemandantes: number;
  accionesOrientacion: number;
  ofertasEmpleo: number;

  actividadesFormacion: number;
  cursos: number;
  pildorasFormativas: number;
  participantesFormacion: number;
  horasFormacion: number;

  asesoramientos: number;
  empresasCreadas: number;
  contrataciones: number;
  puestosTrabajo: number;

  horasOrientacion: number;
  importeAyudasEmpresas: number;
  importeAyudas: number;
  ayudasObservatorio: number;

  personasObservatorio: number;
  descripcionObservatorio: string;
  objetivosObservatorio: string[];

presupuestoTotal: number;          // añadir si falta
presupuestoEjecutado: number;      // añadir si falta

  servicios: ServicioDTO[];
  resumenDepartamentos: ResumenDepartamentoDTO[];
}
