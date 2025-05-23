export interface Actividad {
  id_actividad?: string;
  nombre: string;
  descripcion?: string;
  fecha_ini: string;  
  fecha_fin: string; 
  num_participantes: number;
  horas: number;
  id_departamento: string;
  id_proyecto: string;
}