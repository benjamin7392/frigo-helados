const MovimientoStock = require('../models/MovimientoStock');

// @desc    Obtener historial de movimientos de stock
// @route   GET /api/movimientos-stock
// @access  Private
exports.obtenerMovimientos = async (req, res) => {
  try {
    const { producto, tipo, motivo, fechaInicio, fechaFin } = req.query;
    const filtros = {};

    if (producto) filtros.producto = producto;
    if (tipo) filtros.tipo = tipo;
    if (motivo) filtros.motivo = motivo;
    if (fechaInicio || fechaFin) {
      filtros.createdAt = {};
      if (fechaInicio) filtros.createdAt.$gte = new Date(fechaInicio);
      if (fechaFin) filtros.createdAt.$lte = new Date(fechaFin);
    }

    const movimientos = await MovimientoStock.find(filtros)
      .populate('producto', 'nombre tipo unidadMedida')
      .populate('usuario', 'nombre email')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener movimientos', error: error.message });
  }
};

// @desc    Obtener movimientos de un producto específico
// @route   GET /api/movimientos-stock/producto/:id
// @access  Private
exports.obtenerMovimientosPorProducto = async (req, res) => {
  try {
    const movimientos = await MovimientoStock.find({ producto: req.params.id })
      .populate('usuario', 'nombre email')
      .sort({ createdAt: -1 });

    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener movimientos del producto', error: error.message });
  }
};

// @desc    Obtener estadísticas de movimientos
// @route   GET /api/movimientos-stock/estadisticas
// @access  Private
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const filtros = {};

    if (fechaInicio || fechaFin) {
      filtros.createdAt = {};
      if (fechaInicio) filtros.createdAt.$gte = new Date(fechaInicio);
      if (fechaFin) filtros.createdAt.$lte = new Date(fechaFin);
    }

    const movimientos = await MovimientoStock.find(filtros);

    const estadisticas = {
      totalMovimientos: movimientos.length,
      entradas: movimientos.filter(m => m.tipo === 'entrada').length,
      salidas: movimientos.filter(m => m.tipo === 'salida').length,
      ajustes: movimientos.filter(m => m.tipo === 'ajuste').length,
      porMotivo: {}
    };

    // Agrupar por motivo
    movimientos.forEach(mov => {
      estadisticas.porMotivo[mov.motivo] = (estadisticas.porMotivo[mov.motivo] || 0) + 1;
    });

    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener estadísticas', error: error.message });
  }
};
