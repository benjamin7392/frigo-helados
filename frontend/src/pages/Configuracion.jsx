import { useState, useEffect } from 'react';
import { configService } from '../services';
import toast from 'react-hot-toast';
import { Settings, Save, Palette, Store, DollarSign, Printer, Bell } from 'lucide-react';
import { LoadingSpinner, Card, Button, Input } from '../components/ui';

export default function Configuracion() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await configService.get();
      setConfig(data);
    } catch (error) {
      toast.error('Error al cargar configuración');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await configService.update(config);
      toast.success('Configuración guardada exitosamente');
    } catch (error) {
      toast.error('Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setConfig({ ...config, [field]: value });
  };

  const handleNestedChange = (parent, field, value) => {
    setConfig({
      ...config,
      [parent]: {
        ...config[parent],
        [field]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-500">Personaliza tu sistema</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información del Negocio */}
        <Card title="Información del Negocio" icon={Store}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Negocio"
              value={config.nombreNegocio}
              onChange={(e) => handleChange('nombreNegocio', e.target.value)}
            />
            <Input
              label="Slogan"
              value={config.slogan}
              onChange={(e) => handleChange('slogan', e.target.value)}
            />
            <Input
              label="Dirección"
              value={config.direccion}
              onChange={(e) => handleChange('direccion', e.target.value)}
            />
            <Input
              label="Teléfono"
              value={config.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={config.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario
              </label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={config.horarioApertura}
                  onChange={(e) => handleChange('horarioApertura', e.target.value)}
                  placeholder="Apertura"
                />
                <Input
                  type="time"
                  value={config.horarioCierre}
                  onChange={(e) => handleChange('horarioCierre', e.target.value)}
                  placeholder="Cierre"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Input
              label="Mensaje de Bienvenida"
              value={config.mensajeBienvenida}
              onChange={(e) => handleChange('mensajeBienvenida', e.target.value)}
            />
          </div>
        </Card>

        {/* Apariencia */}
        <Card title="Apariencia" icon={Palette}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Primario
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.colorPrimario}
                  onChange={(e) => handleChange('colorPrimario', e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <Input
                  value={config.colorPrimario}
                  onChange={(e) => handleChange('colorPrimario', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Secundario
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.colorSecundario}
                  onChange={(e) => handleChange('colorSecundario', e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <Input
                  value={config.colorSecundario}
                  onChange={(e) => handleChange('colorSecundario', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color de Fondo
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.colorFondo}
                  onChange={(e) => handleChange('colorFondo', e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <Input
                  value={config.colorFondo}
                  onChange={(e) => handleChange('colorFondo', e.target.value)}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Configuración Financiera */}
        <Card title="Configuración Financiera" icon={DollarSign}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moneda
              </label>
              <select
                value={config.moneda}
                onChange={(e) => handleChange('moneda', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="ARS">Pesos Argentinos (ARS)</option>
                <option value="USD">Dólares (USD)</option>
                <option value="EUR">Euros (EUR)</option>
              </select>
            </div>
            <Input
              label="IVA (%)"
              type="number"
              value={config.iva}
              onChange={(e) => handleChange('iva', parseFloat(e.target.value))}
              min="0"
              max="100"
            />
          </div>
        </Card>

        {/* Impresora */}
        <Card title="Configuración de Impresora" icon={Printer}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.impresora?.habilitada || false}
                onChange={(e) =>
                  handleNestedChange('impresora', 'habilitada', e.target.checked)
                }
                className="w-4 h-4"
              />
              <label className="text-sm font-medium text-gray-700">
                Habilitar impresión de tickets
              </label>
            </div>
            {config.impresora?.habilitada && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre de la Impresora"
                  value={config.impresora?.nombre || ''}
                  onChange={(e) =>
                    handleNestedChange('impresora', 'nombre', e.target.value)
                  }
                />
                <Input
                  label="Ancho del Ticket (mm)"
                  type="number"
                  value={config.impresora?.anchoTicket || 80}
                  onChange={(e) =>
                    handleNestedChange('impresora', 'anchoTicket', parseInt(e.target.value))
                  }
                />
              </div>
            )}
          </div>
        </Card>

        {/* Notificaciones */}
        <Card title="Notificaciones" icon={Bell}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.notificaciones?.stockBajo || false}
                onChange={(e) =>
                  handleNestedChange('notificaciones', 'stockBajo', e.target.checked)
                }
                className="w-4 h-4"
              />
              <label className="text-sm font-medium text-gray-700">
                Alertas de stock bajo
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.notificaciones?.ventaCompletada || false}
                onChange={(e) =>
                  handleNestedChange('notificaciones', 'ventaCompletada', e.target.checked)
                }
                className="w-4 h-4"
              />
              <label className="text-sm font-medium text-gray-700">
                Notificación al completar venta
              </label>
            </div>
          </div>
        </Card>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            icon={Save}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar Configuración'}
          </Button>
        </div>
      </form>
    </div>
  );
}
