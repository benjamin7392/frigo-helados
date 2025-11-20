const express = require('express');
const router = express.Router();
const {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  cancelarVenta,
  obtenerReporteVentas
} = require('../controllers/ventaController');
const { proteger, admin } = require('../middleware/authMiddleware');

// Solo admin y empleados pueden ver y crear ventas
router.route('/')
  .get(proteger, (req, res, next) => {
    if (req.usuario.rol === 'admin' || req.usuario.rol === 'empleado') return next();
    return res.status(403).json({ mensaje: 'Solo admin o empleados pueden ver ventas' });
  }, obtenerVentas)
  .post(proteger, (req, res, next) => {
    if (req.usuario.rol === 'admin' || req.usuario.rol === 'empleado') return next();
    return res.status(403).json({ mensaje: 'Solo admin o empleados pueden crear ventas' });
  }, crearVenta);

router.get('/reportes/resumen', proteger, admin, obtenerReporteVentas);

router.route('/:id')
  .get(proteger, (req, res, next) => {
    if (req.usuario.rol === 'admin' || req.usuario.rol === 'empleado') return next();
    return res.status(403).json({ mensaje: 'Solo admin o empleados pueden ver ventas' });
  }, obtenerVentaPorId);

router.put('/:id/cancelar', proteger, (req, res, next) => {
  if (req.usuario.rol === 'admin' || req.usuario.rol === 'empleado') return next();
  return res.status(403).json({ mensaje: 'Solo admin o empleados pueden cancelar ventas' });
}, cancelarVenta);

module.exports = router;
