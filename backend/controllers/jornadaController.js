const Jornada = require('../models/Jornada');
const Usuario = require('../models/Usuario');

// Resumen de horas y pagos para admin
exports.resumenJornadas = async (req, res) => {
  try {
    // Solo admin
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'No autorizado' });
    }
    // Buscar todos los empleados y cadetes
    const empleados = await Usuario.find({ rol: { $in: ['empleado', 'cadete'] } });
    const resumen = [];
    for (const empleado of empleados) {
      const jornadas = await Jornada.find({ usuario: empleado._id });
      const totalHoras = jornadas.reduce((sum, j) => sum + (j.horasTrabajadas || 0), 0);
      const diasTrabajados = jornadas.length;
      const diasPagados = jornadas.filter(j => j.pagado).length;
      resumen.push({
        usuario: empleado._id,
        nombre: empleado.nombre,
        rol: empleado.rol,
        totalHoras,
        diasTrabajados,
        diasPagados
      });
    }
    res.json(resumen);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener resumen' });
  }
};

// Marcar entrada
exports.marcarEntrada = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    // Verificar si ya existe jornada hoy
    let jornada = await Jornada.findOne({ usuario: usuarioId, fecha: hoy });
    if (jornada && jornada.entrada) {
      return res.status(400).json({ mensaje: 'Ya marcaste entrada hoy.' });
    }
    if (!jornada) {
      jornada = new Jornada({ usuario: usuarioId, fecha: hoy });
    }
    jornada.entrada = new Date();
    await jornada.save();
    res.json({ mensaje: 'Entrada marcada', jornada });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al marcar entrada' });
  }
};

// Marcar salida
exports.marcarSalida = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    let jornada = await Jornada.findOne({ usuario: usuarioId, fecha: hoy });
    if (!jornada || !jornada.entrada) {
      return res.status(400).json({ mensaje: 'Primero debes marcar entrada.' });
    }
    if (jornada.salida) {
      return res.status(400).json({ mensaje: 'Ya marcaste salida hoy.' });
    }
    jornada.salida = new Date();
    // Calcular horas trabajadas
    jornada.horasTrabajadas = (jornada.salida - jornada.entrada) / (1000 * 60 * 60);
    await jornada.save();
    res.json({ mensaje: 'Salida marcada', jornada });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al marcar salida' });
  }
};

// Obtener jornadas de un usuario (admin o el propio usuario)
exports.obtenerJornadas = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId || req.usuario._id;
    const jornadas = await Jornada.find({ usuario: usuarioId }).sort({ fecha: -1 });
    res.json(jornadas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener jornadas' });
  }
};
