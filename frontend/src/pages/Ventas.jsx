import { useEffect, useState } from 'react';
import { saleService, productService } from '../services';
import { formatCurrency, formatDateTime } from '../utils/formatters';
import {
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  X,
  CreditCard,
  DollarSign,
  Smartphone,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Ventas() {
  const [view, setView] = useState('pos'); // 'pos' o 'list'
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [cliente, setCliente] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    if (view === 'list') {
      loadSales();
    }
  }, [view]);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll({ tipo: 'helado', activo: true });
      setProducts(data);
    } catch (error) {
      toast.error('Error al cargar productos');
    }
  };

  const loadSales = async () => {
    try {
      const data = await saleService.getAll();
      setSales(data);
    } catch (error) {
      toast.error('Error al cargar ventas');
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.producto._id === product._id);
    if (existingItem) {
      updateQuantity(product._id, existingItem.cantidad + 1);
    } else {
      setCart([...cart, { producto: product, cantidad: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find((p) => p._id === productId);
    if (newQuantity > product.stock) {
      toast.error(`Stock insuficiente. Disponible: ${product.stock}`);
      return;
    }
    setCart(
      cart.map((item) =>
        item.producto._id === productId ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.producto._id !== productId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    setLoading(true);
    try {
      const saleData = {
        productos: cart.map((item) => ({
          producto: item.producto._id,
          cantidad: item.cantidad,
        })),
        metodoPago,
        cliente: cliente || undefined,
      };

      await saleService.create(saleData);
      toast.success('¡Venta completada!');
      setCart([]);
      setCliente('');
      setMetodoPago('efectivo');
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.mensaje || 'Error al completar la venta');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSale = async (saleId) => {
    if (window.confirm('¿Estás seguro de cancelar esta venta? Se devolverá el stock.')) {
      try {
        await saleService.cancel(saleId);
        toast.success('Venta cancelada y stock devuelto');
        loadSales();
      } catch (error) {
        toast.error('Error al cancelar venta');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ventas</h1>
          <p className="text-gray-600">
            {view === 'pos' ? 'Punto de Venta' : 'Historial de Ventas'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('pos')}
            className={`px-4 py-2 rounded-lg ${
              view === 'pos'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Punto de Venta
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Historial
          </button>
        </div>
      </div>

      {view === 'pos' ? (
        <POS
          products={products}
          cart={cart}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getTotal={getTotal}
          metodoPago={metodoPago}
          setMetodoPago={setMetodoPago}
          cliente={cliente}
          setCliente={setCliente}
          handleCompleteSale={handleCompleteSale}
          loading={loading}
        />
      ) : (
        <SalesList sales={sales} onCancel={handleCancelSale} />
      )}
    </div>
  );
}

function POS({
  products,
  cart,
  addToCart,
  updateQuantity,
  removeFromCart,
  getTotal,
  metodoPago,
  setMetodoPago,
  cliente,
  setCliente,
  handleCompleteSale,
  loading,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Productos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
          {products.map((product) => (
            <button
              key={product._id}
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`p-4 border rounded-lg text-left transition-colors ${
                product.stock === 0
                  ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50'
                  : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <p className="font-medium text-gray-900 mb-1 truncate">{product.nombre}</p>
              <p className="text-sm text-blue-600 font-semibold mb-1">
                {formatCurrency(product.precio)}
              </p>
              <p className="text-xs text-gray-500">
                Stock: {product.stock} {product.unidadMedida}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Carrito ({cart.length})
        </h2>

        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
          {cart.map((item) => (
            <div key={item.producto._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{item.producto.nombre}</p>
                <p className="text-xs text-gray-600">{formatCurrency(item.producto.precio)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.producto._id, item.cantidad - 1)}
                  className="p-1 bg-white rounded border border-gray-300 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.cantidad}</span>
                <button
                  onClick={() => updateQuantity(item.producto._id, item.cantidad + 1)}
                  className="p-1 bg-white rounded border border-gray-300 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item.producto._id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <>
            <div className="border-t pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente (opcional)
                </label>
                <input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Nombre del cliente"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pago
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMetodoPago('efectivo')}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${
                      metodoPago === 'efectivo'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    Efectivo
                  </button>
                  <button
                    onClick={() => setMetodoPago('tarjeta')}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${
                      metodoPago === 'tarjeta'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Tarjeta
                  </button>
                  <button
                    onClick={() => setMetodoPago('transferencia')}
                    className={`col-span-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${
                      metodoPago === 'transferencia'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Transferencia
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(getTotal())}
                  </span>
                </div>

                <button
                  onClick={handleCompleteSale}
                  disabled={loading}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Procesando...' : 'Completar Venta'}
                </button>
              </div>
            </div>
          </>
        )}

        {cart.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <ShoppingCart className="w-12 h-12 mx-auto mb-2" />
            <p>Carrito vacío</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SalesList({ sales, onCancel }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Productos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Método
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateTime(sale.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.cliente || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {sale.productos.length} producto(s)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.metodoPago}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {formatCurrency(sale.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      sale.estado === 'completada'
                        ? 'bg-green-100 text-green-700'
                        : sale.estado === 'cancelada'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {sale.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {sale.estado === 'completada' && (
                    <button
                      onClick={() => onCancel(sale._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sales.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No hay ventas registradas</p>
        </div>
      )}
    </div>
  );
}
