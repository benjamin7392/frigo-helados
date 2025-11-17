const Producto = require('../models/Producto');
const MovimientoStock = require('../models/MovimientoStock');

// @desc    Crear nuevo producto
// @route   POST /api/productos
// @access  Private
exports.crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
  }
};

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Private
exports.obtenerProductos = async (req, res) => {
  try {
    const { tipo, activo } = req.query;
    const filtros = {};

    if (tipo) filtros.tipo = tipo;
    if (activo !== undefined) filtros.activo = activo === 'true';

    const productos = await Producto.find(filtros).sort({ nombre: 1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// @desc    Obtener producto por ID
// @route   GET /api/productos/:id
// @access  Private
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener producto', error: error.message });
  }
};

// @desc    Actualizar producto
// @route   PUT /api/productos/:id
// @access  Private
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
};

// @desc    Eliminar producto (desactivar)
// @route   DELETE /api/productos/:id
// @access  Private
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.activo = false;
    await producto.save();

    res.json({ mensaje: 'Producto desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
};

// @desc    Ajustar stock manualmente
// @route   POST /api/productos/:id/ajustar-stock
// @access  Private
exports.ajustarStock = async (req, res) => {
  try {
    const { cantidad, motivo, notas } = req.body;
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const stockAnterior = producto.stock;
    const nuevoStock = stockAnterior + cantidad;

    if (nuevoStock < 0) {
      return res.status(400).json({ mensaje: 'Stock insuficiente' });
    }

    producto.stock = nuevoStock;
    await producto.save();

    // Registrar movimiento
    await MovimientoStock.create({
      producto: producto._id,
      tipo: cantidad > 0 ? 'entrada' : 'salida',
      cantidad: Math.abs(cantidad),
      stockAnterior,
      stockNuevo: nuevoStock,
      motivo: motivo || 'ajuste',
      usuario: req.usuario._id,
      notas
    });

    res.json({
      mensaje: 'Stock ajustado correctamente',
      producto,
      stockAnterior,
      stockNuevo: nuevoStock
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al ajustar stock', error: error.message });
  }
};

// @desc    Obtener productos con stock bajo
// @route   GET /api/productos/stock-bajo
// @access  Private
exports.obtenerProductosStockBajo = async (req, res) => {
  try {
    const productos = await Producto.find({
      activo: true,
      $expr: { $lte: ['$stock', '$stockMinimo'] }
    }).sort({ stock: 1 });

    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos con stock bajo', error: error.message });
  }
};
