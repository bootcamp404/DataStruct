export interface Usuario {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  contrasenya: string;
  rol?: 'empleado' | 'administrador' | 'administrador_jefe'
//   departamento?: string;
//   cargo?: string;
}