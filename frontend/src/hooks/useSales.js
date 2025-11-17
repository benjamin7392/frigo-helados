import { useState, useEffect } from 'react';
import { saleService } from '../services';
import toast from 'react-hot-toast';

export function useSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await saleService.getAll();
      setSales(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar ventas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const createSale = async (saleData) => {
    try {
      const newSale = await saleService.create(saleData);
      setSales([newSale, ...sales]);
      toast.success('Venta registrada exitosamente');
      return newSale;
    } catch (err) {
      toast.error(err.message || 'Error al registrar venta');
      throw err;
    }
  };

  const cancelSale = async (id) => {
    try {
      const updated = await saleService.cancel(id);
      setSales(sales.map(s => s._id === id ? updated : s));
      toast.success('Venta cancelada exitosamente');
      return updated;
    } catch (err) {
      toast.error('Error al cancelar venta');
      throw err;
    }
  };

  return {
    sales,
    loading,
    error,
    fetchSales,
    createSale,
    cancelSale,
  };
}
