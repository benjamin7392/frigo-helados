const express = require('express');
const router = express.Router();
const {
  obtenerMovimientos,
  obtenerMovimientosPorProducto,
  obtenerEstadisticas
} = require('../controllers/movimientoStockController');
const { proteger } = require('../middleware/authMiddleware');

router.get('/', proteger, obtenerMovimientos);
router.get('/estadisticas', proteger, obtenerEstadisticas);
router.get('/producto/:id', proteger, obtenerMovimientosPorProducto);

module.exports = router;
