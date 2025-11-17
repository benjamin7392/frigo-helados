import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { IceCream, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const testConnection = async () => {
    setTestingConnection(true);
    const apiUrl = 'https://frigo-helados.onrender.com/api';
    
    console.log('🧪 Probando conexión a:', apiUrl);
    toast.loading('Probando conexión...', { id: 'test' });
    
    try {
      const response = await fetch(apiUrl.replace('/api', ''), {
        method: 'GET',
        mode: 'cors',
      });
      
      console.log('✅ Respuesta recibida:', response.status);
      toast.success(`✅ Conexión OK (Status: ${response.status})`, { id: 'test' });
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      toast.error(`❌ No se puede conectar a ${apiUrl}`, { id: 'test', duration: 5000 });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('🚀 Formulario de login enviado');
    console.log('API URL:', import.meta.env.VITE_API_URL);

    try {
      await login(email, password);
      toast.success('¡Bienvenido!');
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Error capturado en Login.jsx:', error);
      
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.response) {
        // El servidor respondió con un error
        errorMessage = error.response?.data?.mensaje || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // No hubo respuesta del servidor
        errorMessage = `❌ No se puede conectar al servidor. Verifica: Backend corriendo, misma red WiFi, IP: ${import.meta.env.VITE_API_URL}`;
      } else {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, { duration: 6000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <IceCream className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Frigo Helados</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestión</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={testConnection}
            disabled={testingConnection}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
          >
            {testingConnection ? '⏳ Probando...' : '🧪 Probar Conexión al Servidor'}
          </button>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 font-semibold mb-1">🔗 API URL:</p>
            <p className="text-xs text-blue-600 font-mono break-all">
              https://frigo-helados.onrender.com/api
            </p>
            <p className="text-xs text-gray-500 mt-2">
              📍 Accediendo desde: {window.location.hostname}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center mb-2">Credenciales de prueba:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Admin:</strong> admin@frigo.com / 123456</p>
              <p><strong>Vendedor:</strong> vendedor@frigo.com / 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
