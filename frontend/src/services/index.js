import api from './api';

// Autenticación
export const authService = {
  login: async (email, password) => {
    console.log('🔐 Intentando login...');
    console.log('📧 Email:', email);
    console.log('🌐 URL completa:', api.defaults.baseURL + '/usuarios/login');
    
    try {
      const response = await api.post('/usuarios/login', { email, password });
      console.log('✅ Login exitoso:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('💾 Token y usuario guardados en localStorage');
      }
      return response.data;
    } catch (error) {
      console.error('❌ Error en login:', error);
      throw error;
    }
  },

  register: async (userData) => {
    const response = await api.post('/usuarios/registro', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getProfile: async () => {
    const response = await api.get('/usuarios/perfil');
    return response.data;
  },
};

// Productos
export const productService = {
  getAll: async (filters = {}) => {
    const response = await api.get('/productos', { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  create: async (productData) => {
    const response = await api.post('/productos', productData);
    return response.data;
  },

  update: async (id, productData) => {
    const response = await api.put(`/productos/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },

  adjustStock: async (id, adjustmentData) => {
    const response = await api.post(`/productos/${id}/ajustar-stock`, adjustmentData);
    return response.data;
  },

  getLowStock: async () => {
    const response = await api.get('/productos/stock-bajo');
    return response.data;
  },
};

// Ventas
export const saleService = {
  getAll: async (filters = {}) => {
    const response = await api.get('/ventas', { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/ventas/${id}`);
    return response.data;
  },

  create: async (saleData) => {
    const response = await api.post('/ventas', saleData);
    return response.data;
  },

  cancel: async (id) => {
    const response = await api.put(`/ventas/${id}/cancelar`);
    return response.data;
  },

  getReport: async (filters = {}) => {
    const response = await api.get('/ventas/reportes/resumen', { params: filters });
    return response.data;
  },
};

// Movimientos de Stock
export const stockMovementService = {
  getAll: async (filters = {}) => {
    const response = await api.get('/movimientos-stock', { params: filters });
    return response.data;
  },

  getByProduct: async (productId) => {
    const response = await api.get(`/movimientos-stock/producto/${productId}`);
    return response.data;
  },

  getStatistics: async (filters = {}) => {
    const response = await api.get('/movimientos-stock/estadisticas', { params: filters });
    return response.data;
  },
};

// Usuarios
export const userService = {
  getAll: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/usuarios/registro', userData);
    return response.data;
  },
};

// Configuración
export const configService = {
  get: async () => {
    const response = await api.get('/configuracion');
    return response.data;
  },

  update: async (configData) => {
    const response = await api.put('/configuracion', configData);
    return response.data;
  },
};
