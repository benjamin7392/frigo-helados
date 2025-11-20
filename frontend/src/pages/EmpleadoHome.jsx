import { useEffect, useState } from 'react';
import { jornadaService } from '../services';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function EmpleadoHome() {
  const { user } = useAuth();
  const [jornadas, setJornadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marcando, setMarcando] = useState(false);

  useEffect(() => {
    if (user?.rol === 'empleado' || user?.rol === 'cadete') {
      cargarJornadas();
    }
  }, [user]);

  const cargarJornadas = async () => {
    setLoading(true);
    try {
      const data = await jornadaService.getMisJornadas();
      setJornadas(data);
    } catch (error) {
      toast.error('Error al cargar jornadas');
    } finally {
      setLoading(false);
    }
  };

  const marcarEntrada = async () => {
    setMarcando(true);
    try {
      await jornadaService.marcarEntrada();
      toast.success('Entrada marcada');
      cargarJornadas();
    } catch (e) {
      toast.error(e.response?.data?.mensaje || 'Error al marcar entrada');
    } finally {
      setMarcando(false);
    }
  };

  const marcarSalida = async () => {
    setMarcando(true);
    try {
      await jornadaService.marcarSalida();
      toast.success('Salida marcada');
      cargarJornadas();
    } catch (e) {
      toast.error(e.response?.data?.mensaje || 'Error al marcar salida');
    } finally {
      setMarcando(false);
    }
  };

  // Calcular horas del mes actual
  const mesActual = new Date().getMonth();
  const horasMes = jornadas
    .filter(j => new Date(j.fecha).getMonth() === mesActual)
    .reduce((sum, j) => sum + (j.horasTrabajadas || 0), 0);

  // Última jornada de hoy
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  const jornadaHoy = jornadas.find(j => new Date(j.fecha).getTime() === hoy.getTime());

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Hola, {user?.nombre}!</h1>
      <p className="text-gray-700 mb-4">Marcá tu entrada y salida diaria. Tus horas del mes: <b>{horasMes.toFixed(2)}</b></p>
      <div className="flex gap-4">
        <button
          onClick={marcarEntrada}
          disabled={marcando || jornadaHoy?.entrada}
          className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          {jornadaHoy?.entrada ? 'Entrada marcada' : 'Marcar Entrada'}
        </button>
        <button
          onClick={marcarSalida}
          disabled={marcando || !jornadaHoy?.entrada || jornadaHoy?.salida}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {jornadaHoy?.salida ? 'Salida marcada' : 'Marcar Salida'}
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Tus jornadas recientes</h2>
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Fecha</th>
                <th className="p-2">Entrada</th>
                <th className="p-2">Salida</th>
                <th className="p-2">Horas</th>
              </tr>
            </thead>
            <tbody>
              {jornadas.slice(0, 10).map(j => (
                <tr key={j._id}>
                  <td className="p-2">{new Date(j.fecha).toLocaleDateString()}</td>
                  <td className="p-2">{j.entrada ? new Date(j.entrada).toLocaleTimeString() : '-'}</td>
                  <td className="p-2">{j.salida ? new Date(j.salida).toLocaleTimeString() : '-'}</td>
                  <td className="p-2">{j.horasTrabajadas ? j.horasTrabajadas.toFixed(2) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
