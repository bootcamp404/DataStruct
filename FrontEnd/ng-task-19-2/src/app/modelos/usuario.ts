export interface Usuario {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  contrasenya: string;
  rol: { id: number };
//   departamento?: string;
//   cargo?: string;
}