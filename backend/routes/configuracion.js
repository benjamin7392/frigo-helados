const express = require('express');
const router = express.Router();
const { obtenerConfiguracion, actualizarConfiguracion } = require('../controllers/configuracionController');
const { proteger, admin } = require('../middleware/authMiddleware');

router.get('/', proteger, obtenerConfiguracion);
router.put('/', proteger, admin, actualizarConfiguracion);

module.exports = router;
