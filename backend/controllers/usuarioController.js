const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Registrar nuevo usuario
// @route   POST /api/usuarios/registro
// @access  Private/Admin (solo admin puede crear usuarios)
exports.registrarUsuario = async (req, res) => {
  try {
    // Solo admin puede crear usuarios
    if (!req.usuario || req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'Solo el administrador puede crear usuarios.' });
    }

    const { nombre, password, telefono, rol } = req.body;

    // Validar rol permitido
    const rolesPermitidos = ['admin', 'vendedor', 'empleado', 'cadete'];
    if (!rolesPermitidos.includes(rol)) {
      return res.status(400).json({ mensaje: 'Rol no permitido. Debe ser admin, vendedor, empleado o cadete.' });
    }

    // Si se provee email, verificar si ya existe
    if (req.body.email) {
      const usuarioExiste = await Usuario.findOne({ email: req.body.email });
      if (usuarioExiste) {
        return res.status(400).json({ mensaje: 'El email ya está en uso' });
      }
    }

    // Crear usuario (email opcional)
    const usuario = await Usuario.create({
      nombre,
      email: req.body.email,
      password,
      telefono,
      rol
    });

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      rol: usuario.rol
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

// @desc    Login de usuario
// @route   POST /api/usuarios/login
// @access  Public
exports.loginUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Permitir login por email o por nombre (si no hay email)
    let usuario = null;
    if (email) {
      usuario = await Usuario.findOne({ email, activo: true });
    } else if (nombre) {
      usuario = await Usuario.findOne({ nombre, activo: true });
    }
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar password
    const passwordCorrecta = await usuario.compararPassword(password);
    if (!passwordCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id)
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

// @desc    Obtener perfil de usuario
// @route   GET /api/usuarios/perfil
// @access  Private
exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
  }
};

// @desc    Listar todos los usuarios
// @route   GET /api/usuarios
// @access  Private/Admin
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

// @desc    Actualizar usuario
// @route   PUT /api/usuarios/:id
// @access  Private/Admin
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, telefono, rol, activo } = req.body;
    
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.telefono = telefono || usuario.telefono;
    usuario.rol = rol || usuario.rol;
    usuario.activo = activo !== undefined ? activo : usuario.activo;
    // Solo actualizar email si se provee
    if (email) usuario.email = email;

    const usuarioActualizado = await usuario.save();
    res.json({
      _id: usuarioActualizado._id,
      nombre: usuarioActualizado.nombre,
      email: usuarioActualizado.email,
      telefono: usuarioActualizado.telefono,
      rol: usuarioActualizado.rol,
      activo: usuarioActualizado.activo
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};

// @desc    Eliminar usuario (desactivar)
// @route   DELETE /api/usuarios/:id
// @access  Private/Admin
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.activo = false;
    await usuario.save();

    res.json({ mensaje: 'Usuario desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
};
