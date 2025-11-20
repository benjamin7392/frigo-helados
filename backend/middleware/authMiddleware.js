// Permite solo a empleados (y no admin/cadete)
exports.soloEmpleado = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'empleado') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado. Se requiere rol de empleado' });
  }
};

// Permite solo a cadetes
exports.soloCadete = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'cadete') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado. Se requiere rol de cadete' });
  }
};
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token
      req.usuario = await Usuario.findById(decoded.id).select('-password');

      if (!req.usuario || !req.usuario.activo) {
        return res.status(401).json({ mensaje: 'Usuario no autorizado o inactivo' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'No autorizado, token inválido' });
    }
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }
};

exports.admin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado. Se requiere rol de administrador' });
  }
};
