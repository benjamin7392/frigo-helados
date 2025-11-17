const express = require('express');
const router = express.Router();
const {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  cancelarVenta,
  obtenerReporteVentas
} = require('../controllers/ventaController');
const { proteger } = require('../middleware/authMiddleware');

router.route('/')
  .get(proteger, obtenerVentas)
  .post(proteger, crearVenta);

router.get('/reportes/resumen', proteger, obtenerReporteVentas);

router.route('/:id')
  .get(proteger, obtenerVentaPorId);

router.put('/:id/cancelar', proteger, cancelarVenta);

module.exports = router;
