
const express = require('express');
const router = express.Router();
const jornadaController = require('../controllers/jornadaController');
const auth = require('../middleware/authMiddleware');

// Resumen de jornadas para admin
router.get('/resumen/all', auth.proteger, jornadaController.resumenJornadas);

// Solo empleados/cadetes pueden marcar entrada/salida
router.post('/entrada', auth.proteger, jornadaController.marcarEntrada);
router.post('/salida', auth.proteger, jornadaController.marcarSalida);

// Admin puede ver jornadas de cualquier usuario, empleados solo las propias
router.get('/', auth.proteger, jornadaController.obtenerJornadas); // sin usuarioId
router.get('/:usuarioId', auth.proteger, jornadaController.obtenerJornadas); // con usuarioId

module.exports = router;
