const express = require('express');
const router = express.Router();
const {
  obtenerMovimientos,
  obtenerMovimientosPorProducto,
  obtenerEstadisticas
} = require('../controllers/movimientoStockController');
const { proteger, admin } = require('../middleware/authMiddleware');

// Solo admin y empleados pueden ver movimientos de stock
router.get('/', proteger, (req, res, next) => {
  if (req.usuario.rol === 'admin' || req.usuario.rol === 'empleado') return next();
  return res.status(403).json({ mensaje: 'Solo admin o empleados pueden ver movimientos de stock' });
}, obtenerMovimientos);
router.get('/estadisticas', proteger, (req, res, next) => {
  if (req.usuario.rol === 'admin' || req.usuario.rol === 'empleado') return next();
  return res.status(403).json({ mensaje: 'Solo admin o empleados pueden ver estadísticas de stock' });
}, obtenerEstadisticas);
router.get('/producto/:id', proteger, (req, res, next) => {
  if (req.usuario.rol === 'admin' || req.usuario.rol === 'empleado') return next();
  return res.status(403).json({ mensaje: 'Solo admin o empleados pueden ver movimientos de stock' });
}, obtenerMovimientosPorProducto);

module.exports = router;
