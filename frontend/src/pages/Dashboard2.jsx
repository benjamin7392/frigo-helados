import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { saleService, productService } from '../services';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, DollarSign, ShoppingCart, AlertCircle, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { LoadingSpinner, Card } from '../components/ui';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [salesByMethod, setSalesByMethod] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar estadísticas del día
      const today = new Date().toISOString().split('T')[0];
      const report = await saleService.getReport(today, today);
      setStats(report);

      // Cargar productos con stock bajo
      const products = await productService.getLowStock();
      setLowStockProducts(products);

      // Cargar ventas recientes
      const sales = await saleService.getAll();
      setRecentSales(sales.slice(0, 5));

      // Preparar datos para gráficos
      prepareChartData(sales);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = (sales) => {
    // Ventas por día (últimos 7 días)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daySales = sales.filter(s => {
        const saleDate = new Date(s.createdAt).toISOString().split('T')[0];
        return saleDate === dateStr && s.estado !== 'cancelada';
      });

      last7Days.push({
        fecha: formatDate(date, 'short'),
        ventas: daySales.length,
        total: daySales.reduce((sum, s) => sum + s.total, 0),
      });
    }
    setChartData(last7Days);

    // Ventas por método de pago
    const methodCounts = sales.reduce((acc, sale) => {
      if (sale.estado !== 'cancelada') {
        acc[sale.metodoPago] = (acc[sale.metodoPago] || 0) + 1;
      }
      return acc;
    }, {});

    const methodData = Object.entries(methodCounts).map(([method, count]) => ({
      name: method === 'efectivo' ? 'Efectivo' : method === 'tarjeta' ? 'Tarjeta' : 'Transferencia',
      value: count,
    }));
    setSalesByMethod(methodData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Bienvenido, {user?.nombre}</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ventas Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalVentas || 0}</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-blue-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ingresos Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats?.totalIngresos || 0)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Productos Vendidos</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalProductos || 0}</p>
            </div>
            <Package className="w-12 h-12 text-purple-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ticket Promedio</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats?.promedioVenta || 0)}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ventas por día */}
        <Card title="Ventas Últimos 7 Días" icon={Calendar}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'total') return formatCurrency(value);
                  return value;
                }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="ventas" stroke="#3b82f6" name="Cantidad" />
              <Line yAxisId="right" type="monotone" dataKey="total" stroke="#10b981" name="Total" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráfico de ventas por método de pago */}
        <Card title="Ventas por Método de Pago" icon={DollarSign}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByMethod}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {salesByMethod.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productos con stock bajo */}
        <Card title="Alertas de Stock" icon={AlertCircle}>
          {lowStockProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hay productos con stock bajo</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.nombre}</p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock} {product.unidadMedida}
                    </p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Últimas ventas */}
        <Card title="Últimas Ventas" icon={ShoppingCart}>
          {recentSales.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hay ventas registradas</p>
          ) : (
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div
                  key={sale._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sale.total)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(sale.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      sale.estado === 'completada'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {sale.estado}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
