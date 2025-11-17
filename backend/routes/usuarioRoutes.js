const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');
const { proteger, admin } = require('../middleware/authMiddleware');

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', proteger, obtenerPerfil);
router.get('/', proteger, admin, obtenerUsuarios);
router.put('/:id', proteger, admin, actualizarUsuario);
router.delete('/:id', proteger, admin, eliminarUsuario);

module.exports = router;
