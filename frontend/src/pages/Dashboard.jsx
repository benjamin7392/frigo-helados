import { useEffect, useState } from 'react';
import { saleService, productService } from '../services';
import { formatCurrency } from '../utils/formatters';
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVentas: 0,
    totalIngresos: 0,
    promedioVenta: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const [salesReport, lowStock, sales] = await Promise.all([
        saleService.getReport({ fechaInicio: today }),
        productService.getLowStock(),
        saleService.getAll(),
      ]);

      setStats(salesReport);
      setLowStockProducts(lowStock);
      setRecentSales(sales.slice(0, 5));
    } catch (error) {
      toast.error('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas Hoy"
          value={stats.totalVentas}
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title="Ingresos Hoy"
          value={formatCurrency(stats.totalIngresos)}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Promedio por Venta"
          value={formatCurrency(stats.promedioVenta)}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Productos Stock Bajo"
          value={lowStockProducts.length}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Stock Bajo</h2>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                ✅ Todos los productos tienen stock suficiente
              </p>
            ) : (
              lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.nombre}</p>
                    <p className="text-sm text-gray-600">
                      Stock: {product.stock} {product.unidadMedida}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Mínimo: {product.stockMinimo}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ventas Recientes</h2>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentSales.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay ventas registradas</p>
            ) : (
              recentSales.map((sale) => (
                <div key={sale._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sale.total)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(sale.createdAt).toLocaleString('es-AR')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    sale.estado === 'completada'
                      ? 'bg-green-100 text-green-700'
                      : sale.estado === 'cancelada'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {sale.estado}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
