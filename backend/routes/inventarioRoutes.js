// Rutas de inventario: admin (CRUD), empleado (solo lectura)
const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');
const { proteger, admin } = require('../middleware/authMiddleware');

// Obtener inventario (admin y empleado)
router.get('/', proteger, inventarioController.obtenerInventario);

// Crear item (solo admin)
router.post('/', proteger, admin, inventarioController.crearItem);

// Actualizar item (solo admin)
router.put('/:id', proteger, admin, inventarioController.actualizarItem);

// Eliminar item (solo admin)
router.delete('/:id', proteger, admin, inventarioController.eliminarItem);

module.exports = router;
