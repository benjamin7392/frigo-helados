import axios from 'axios';

// IP FIJA - NO CAMBIAR
const API_URL = 'http://192.168.1.42:4000/api';

// Logs detallados para debugging
console.log('========================================');
console.log('🔗 API URL:', API_URL);
console.log('🏠 Host actual:', window.location.hostname);
console.log('========================================');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos de timeout para redes lentas
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta exitosa de:', response.config.url);
    return response;
  },
  (error) => {
    console.error('========================================');
    console.error('❌ Error en petición');
    console.error('URL:', error.config?.url);
    console.error('Método:', error.config?.method);
    console.error('Base URL:', error.config?.baseURL);
    
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('📡 Respuesta del servidor:');
      console.error('  Status:', error.response.status);
      console.error('  Data:', error.response.data);
      console.error('  Headers:', error.response.headers);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('⚠️ No se recibió respuesta del servidor');
      console.error('  Puede ser un problema de red o CORS');
      console.error('  Verifica que el backend esté corriendo');
      console.error('  URL intentada:', error.config?.baseURL + error.config?.url);
    } else {
      // Algo pasó al configurar la petición
      console.error('⚠️ Error al configurar la petición:', error.message);
    }
    console.error('========================================');
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
