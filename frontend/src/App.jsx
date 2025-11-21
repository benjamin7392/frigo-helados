
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmpleadoHome from './pages/EmpleadoHome';
import Productos from './pages/ProductosNuevo';
import Ventas from './pages/Ventas';
import Movimientos from './pages/Movimientos';
import Usuarios from './pages/Usuarios';
import Configuracion from './pages/Configuracion';
// Nuevos módulos sugeridos
// import CierreTurno from './pages/CierreTurno'; // trigger netlify redeploy 2
import Asistencia from './pages/Asistencia';
import Inventario from './pages/Inventario';
// import Reportes from './pages/Reportes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute roles={['admin', 'empleado', 'cadete']}>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Home principal: empleados y cadetes ven EmpleadoHome, admin ve Dashboard */}
            <Route index element={
              <ProtectedRoute roles={['admin', 'empleado', 'cadete']}>
                {({ user }) =>
                  user?.rol === 'admin' ? <Dashboard /> : <EmpleadoHome />
                }
              </ProtectedRoute>
            } />
            {/* Dashboard: solo admin */}
            <Route path="dashboard" element={
              <ProtectedRoute roles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* Ventas: admin y empleado */}
            <Route path="ventas" element={
              <ProtectedRoute roles={['admin', 'empleado']}>
                <Ventas />
              </ProtectedRoute>
            } />
            {/* Inventario: admin (CRUD), empleado (solo lectura) */}
            <Route path="productos" element={
              <ProtectedRoute roles={['admin', 'empleado']}>
                <Productos />
              </ProtectedRoute>
            } />
            <Route path="inventario" element={
              <ProtectedRoute roles={['admin', 'empleado']}>
                <Inventario />
              </ProtectedRoute>
            } />
            {/* Movimientos: admin y empleado */}
            <Route path="movimientos" element={
              <ProtectedRoute roles={['admin', 'empleado']}>
                <Movimientos />
              </ProtectedRoute>
            } />
            {/* Cierre de turno: solo empleado */}
            {/* <Route path="cierre-turno" element={
              <ProtectedRoute roles={['empleado']}>
                <CierreTurno />
              </ProtectedRoute>
            } /> */}
            {/* Asistencia: todos los roles */}
            <Route path="asistencia" element={
              <ProtectedRoute roles={['admin', 'empleado', 'cadete']}>
                <Asistencia />
              </ProtectedRoute>
            } />
            {/* Usuarios: solo admin */}
            <Route path="usuarios" element={
              <ProtectedRoute roles={['admin']}>
                <Usuarios />
              </ProtectedRoute>
            } />
            {/* Configuración: solo admin */}
            <Route path="configuracion" element={
              <ProtectedRoute roles={['admin']}>
                <Configuracion />
              </ProtectedRoute>
            } />
            {/* Reportes: solo admin */}
            {/* <Route path="reportes" element={
              <ProtectedRoute roles={['admin']}>
                <Reportes />
              </ProtectedRoute>
            } /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
