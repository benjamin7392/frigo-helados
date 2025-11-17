const express = require('express');
const router = express.Router();
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  ajustarStock,
  obtenerProductosStockBajo
} = require('../controllers/productoController');
const { proteger } = require('../middleware/authMiddleware');

router.route('/')
  .get(proteger, obtenerProductos)
  .post(proteger, crearProducto);

router.get('/stock-bajo', proteger, obtenerProductosStockBajo);

router.route('/:id')
  .get(proteger, obtenerProductoPorId)
  .put(proteger, actualizarProducto)
  .delete(proteger, eliminarProducto);

router.post('/:id/ajustar-stock', proteger, ajustarStock);

module.exports = router;
