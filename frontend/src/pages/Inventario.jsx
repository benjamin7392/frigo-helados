// Vista de Inventario: muestra insumos, herramientas y recursos no vendidos de la heladería.
// Admin puede crear/editar/eliminar, empleado solo visualizar.

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui';
import { getInventario } from '../services/inventarioService';
import { useAuth } from '../context/AuthContext';

export default function Inventario() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInventario(token);
        setItems(data);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Inventario de la Heladería</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando inventario...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.length === 0 ? (
                <li className="py-4 text-gray-500">No hay insumos ni herramientas registrados.</li>
              ) : (
                items.map((item) => (
                  <li key={item._id} className="py-4 flex justify-between items-center">
                    <span>{item.nombre}</span>
                    <span className="text-sm text-gray-500">{item.cantidad} {item.unidad}</span>
                  </li>
                ))
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
