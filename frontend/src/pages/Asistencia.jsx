import { useEffect, useState } from 'react';
import { jornadaService } from '../services';
import toast from 'react-hot-toast';

export default function Asistencia() {
  const [resumen, setResumen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarResumen();
  }, []);

  const cargarResumen = async () => {
    setLoading(true);
    try {
      const data = await jornadaService.getResumen();
      setResumen(data);
    } catch (error) {
      toast.error('Error al cargar resumen de asistencia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Resumen de Asistencia</h1>
      {loading ? (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nombre</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Total Horas</th>
              <th className="p-2">Días Trabajados</th>
              <th className="p-2">Días Pagados</th>
            </tr>
          </thead>
          <tbody>
            {resumen.map((r) => (
              <tr key={r.usuario}>
                <td className="p-2">{r.nombre}</td>
                <td className="p-2">{r.rol}</td>
                <td className="p-2">{r.totalHoras}</td>
                <td className="p-2">{r.diasTrabajados}</td>
                <td className="p-2">{r.diasPagados}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
