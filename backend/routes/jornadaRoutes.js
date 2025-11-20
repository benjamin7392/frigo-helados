
const express = require('express');
const router = express.Router();
const jornadaController = require('../controllers/jornadaController');
const auth = require('../middleware/authMiddleware');

// Resumen de jornadas para admin
router.get('/resumen/all', auth.proteger, jornadaController.resumenJornadas);
router.get('/resumen/all', auth.proteger, auth.admin, jornadaController.resumenJornadas);

// Solo empleados/cadetes pueden marcar entrada/salida
router.post('/entrada', auth.proteger, jornadaController.marcarEntrada);
router.post('/salida', auth.proteger, jornadaController.marcarSalida);
router.post('/entrada', auth.proteger, (req, res, next) => {
	if (req.usuario.rol === 'empleado' || req.usuario.rol === 'cadete') return next();
	return res.status(403).json({ mensaje: 'Solo empleados o cadetes pueden marcar asistencia' });
}, jornadaController.marcarEntrada);
router.post('/salida', auth.proteger, (req, res, next) => {
	if (req.usuario.rol === 'empleado' || req.usuario.rol === 'cadete') return next();
	return res.status(403).json({ mensaje: 'Solo empleados o cadetes pueden marcar asistencia' });
}, jornadaController.marcarSalida);

// Admin puede ver jornadas de cualquier usuario, empleados solo las propias
// Admin puede ver jornadas de cualquier usuario, empleados/cadetes solo las propias
router.get('/', auth.proteger, (req, res, next) => {
	if (req.usuario.rol === 'admin') return next();
	req.query.soloPropias = true;
	return next();
}, jornadaController.obtenerJornadas); // sin usuarioId
router.get('/:usuarioId', auth.proteger, (req, res, next) => {
	if (req.usuario.rol === 'admin') return next();
	// empleados/cadetes solo pueden ver sus propias jornadas
	if (req.usuario._id.toString() === req.params.usuarioId) {
		req.query.soloPropias = true;
		return next();
	}
	return res.status(403).json({ mensaje: 'No autorizado a ver jornadas de otros usuarios' });
}, jornadaController.obtenerJornadas); // con usuarioId

module.exports = router;
