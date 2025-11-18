import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * roles: array de roles permitidos (ej: ['admin', 'empleado'])
 * Si no se pasa roles, solo requiere estar autenticado
 */
export const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.rol)) {
    // Si el usuario no tiene el rol requerido, lo mandamos al dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
