// Servicio de inventario: CRUD para insumos, herramientas y recursos no vendidos.
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://frigo-helados.onrender.com/api';

export const getInventario = async (token) => {
  const res = await axios.get(`${API_URL}/inventario`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const crearItemInventario = async (item, token) => {
  const res = await axios.post(`${API_URL}/inventario`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const actualizarItemInventario = async (id, item, token) => {
  const res = await axios.put(`${API_URL}/inventario/${id}`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const eliminarItemInventario = async (id, token) => {
  const res = await axios.delete(`${API_URL}/inventario/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
