export interface Proyecto {
  id_proyecto: string;
  nombre: string;
  objetivo: string;
  fecha_ini: string;
  fecha_fin: string;
  departamento: {
    id: string;
  };
}
