const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { proteger, admin } = require('../middleware/authMiddleware');


router.get('/', proteger, admin, usuarioController.obtenerUsuarios);
router.post('/registro', proteger, admin, usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/perfil', proteger, usuarioController.obtenerPerfil);
router.put('/:id', proteger, admin, usuarioController.actualizarUsuario);
router.delete('/:id', proteger, admin, usuarioController.eliminarUsuario);

module.exports = router;
