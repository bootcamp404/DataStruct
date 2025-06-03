export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  contrasenya: string;
  rol: { id: number };
//   departamento?: string;
//   cargo?: string;
}