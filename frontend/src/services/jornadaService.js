// Servicio de jornadas: marcar entrada/salida y obtener jornadas del usuario.
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://frigo-helados.onrender.com/api';

export const jornadaService = {
  marcarEntrada: async (token) => {
    const res = await axios.post(`${API_URL}/jornadas/entrada`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  marcarSalida: async (token) => {
    const res = await axios.post(`${API_URL}/jornadas/salida`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  getMisJornadas: async (token) => {
    const res = await axios.get(`${API_URL}/jornadas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  getResumen: async (token) => {
    const res = await axios.get(`${API_URL}/jornadas/resumen/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
