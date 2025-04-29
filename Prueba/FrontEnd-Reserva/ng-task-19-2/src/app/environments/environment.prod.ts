// src/environments/environment.prod.ts (entorno de producción)
export const environment = {
    production: true,
    apiUrl: '/api', // URL relativa en producción (o usa la URL completa de tu API en producción)
    apiKey: 'prod_api_key', // Cambia esto a tu clave de API de producción
    version: '1.0.0',
    logging: false, // Desactivar logs en producción
    // Otras configuraciones específicas para producción
    defaultLanguage: 'es',
    cacheTTL: 3600 // Tiempo de vida de la caché más largo en producción
  };
  