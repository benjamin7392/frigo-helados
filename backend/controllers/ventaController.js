const Venta = require('../models/Venta');
const mongoose = require('mongoose');
const { validarYDescontarStock, registrarMovimientoStock, devolverStock } = require('../utils/ventaHelpers');

// @desc    Crear nueva venta
// @route   POST /api/ventas
// @access  Private
exports.crearVenta = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productos, metodoPago, cliente, notas } = req.body;

    // Validar que haya productos
    if (!productos || productos.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({ mensaje: 'Debe incluir al menos un producto' });
    }

    let total = 0;
    const productosVenta = [];

    // Procesar cada producto usando helpers
    for (const item of productos) {
      let producto, stockAnterior, subtotal;
      try {
        ({ producto, stockAnterior, subtotal } = await validarYDescontarStock(item.producto, item.cantidad, session));
      } catch (err) {
        await session.abortTransaction();
        return res.status(400).json({ mensaje: err.message });
      }

      total += subtotal;
      productosVenta.push({
        producto: producto._id,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precio: producto.precio,
        subtotal
      });

      // Registrar movimiento de stock con helper
      await registrarMovimientoStock({
        producto: producto._id,
        tipo: 'salida',
        cantidad: item.cantidad,
        stockAnterior,
        stockNuevo: producto.stock,
        motivo: 'venta',
        usuario: req.usuario._id
      }, session);
    }

    // Crear venta
    const venta = await Venta.create([{
      productos: productosVenta,
      total,
      metodoPago,
      vendedor: req.usuario._id,
      cliente,
      notas,
      estado: 'completada'
    }], { session });

    await session.commitTransaction();

    const ventaPopulada = await Venta.findById(venta[0]._id)
      .populate('productos.producto')
      .populate('vendedor', 'nombre email');

    res.status(201).json(ventaPopulada);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
  } finally {
    session.endSession();
  }
};

// @desc    Obtener todas las ventas
// @route   GET /api/ventas
// @access  Private
exports.obtenerVentas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, estado, vendedor } = req.query;
    const filtros = {};

    if (estado) filtros.estado = estado;
    if (vendedor) filtros.vendedor = vendedor;
    if (fechaInicio || fechaFin) {
      filtros.createdAt = {};
      if (fechaInicio) filtros.createdAt.$gte = new Date(fechaInicio);
      if (fechaFin) filtros.createdAt.$lte = new Date(fechaFin);
    }

    const ventas = await Venta.find(filtros)
      .populate('vendedor', 'nombre email')
      .populate('productos.producto', 'nombre tipo')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
};

// @desc    Obtener venta por ID
// @route   GET /api/ventas/:id
// @access  Private
exports.obtenerVentaPorId = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate('vendedor', 'nombre email')
      .populate('productos.producto');

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener venta', error: error.message });
  }
};

// @desc    Cancelar venta
// @route   PUT /api/ventas/:id/cancelar
// @access  Private
exports.cancelarVenta = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const venta = await Venta.findById(req.params.id).session(session);

    if (!venta) {
      await session.abortTransaction();
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    if (venta.estado === 'cancelada') {
      await session.abortTransaction();
      return res.status(400).json({ mensaje: 'La venta ya está cancelada' });
    }


    // Devolver stock usando helpers
    for (const item of venta.productos) {
      try {
        const { producto, stockAnterior } = await devolverStock(item.producto, item.cantidad, session);
        await registrarMovimientoStock({
          producto: producto._id,
          tipo: 'entrada',
          cantidad: item.cantidad,
          stockAnterior,
          stockNuevo: producto.stock,
          motivo: 'devolucion',
          referencia: venta._id,
          referenciaModelo: 'Venta',
          usuario: req.usuario._id,
          notas: 'Devolución por cancelación de venta'
        }, session);
      } catch (err) {
        await session.abortTransaction();
        return res.status(400).json({ mensaje: err.message });
      }
    }

    venta.estado = 'cancelada';
    await venta.save({ session });

    await session.commitTransaction();
    res.json({ mensaje: 'Venta cancelada y stock devuelto', venta });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ mensaje: 'Error al cancelar venta', error: error.message });
  } finally {
    session.endSession();
  }
};

// @desc    Obtener reporte de ventas
// @route   GET /api/ventas/reportes/resumen
// @access  Private
exports.obtenerReporteVentas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const filtros = { estado: 'completada' };

    if (fechaInicio || fechaFin) {
      filtros.createdAt = {};
      if (fechaInicio) filtros.createdAt.$gte = new Date(fechaInicio);
      if (fechaFin) filtros.createdAt.$lte = new Date(fechaFin);
    }

    const ventas = await Venta.find(filtros);

    const totalVentas = ventas.length;
    const totalIngresos = ventas.reduce((sum, venta) => sum + venta.total, 0);
    const promedioVenta = totalVentas > 0 ? totalIngresos / totalVentas : 0;

    // Ventas por método de pago
    const ventasPorMetodo = ventas.reduce((acc, venta) => {
      acc[venta.metodoPago] = (acc[venta.metodoPago] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalVentas,
      totalIngresos,
      promedioVenta,
      ventasPorMetodo
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar reporte', error: error.message });
  }
};
