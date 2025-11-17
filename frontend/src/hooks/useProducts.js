import { useState, useEffect } from 'react';
import { productService } from '../services';
import toast from 'react-hot-toast';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (productData) => {
    try {
      const newProduct = await productService.create(productData);
      setProducts([...products, newProduct]);
      toast.success('Producto creado exitosamente');
      return newProduct;
    } catch (err) {
      toast.error('Error al crear producto');
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updated = await productService.update(id, productData);
      setProducts(products.map(p => p._id === id ? updated : p));
      toast.success('Producto actualizado exitosamente');
      return updated;
    } catch (err) {
      toast.error('Error al actualizar producto');
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.delete(id);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Producto eliminado exitosamente');
    } catch (err) {
      toast.error('Error al eliminar producto');
      throw err;
    }
  };

  const adjustStock = async (id, cantidad, motivo) => {
    try {
      const updated = await productService.adjustStock(id, cantidad, motivo);
      setProducts(products.map(p => p._id === id ? updated : p));
      toast.success('Stock ajustado exitosamente');
      return updated;
    } catch (err) {
      toast.error('Error al ajustar stock');
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
  };
}
