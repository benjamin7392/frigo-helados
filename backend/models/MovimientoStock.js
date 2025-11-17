const mongoose = require('mongoose');

const movimientoStockSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  tipo: {
    type: String,
    enum: ['entrada', 'salida', 'ajuste'],
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  stockAnterior: {
    type: Number,
    required: true
  },
  stockNuevo: {
    type: Number,
    required: true
  },
  motivo: {
    type: String,
    enum: ['compra', 'venta', 'merma', 'ajuste', 'devolucion', 'produccion'],
    required: true
  },
  referencia: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'referenciaModelo'
  },
  referenciaModelo: {
    type: String,
    enum: ['Venta', 'Compra']
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  notas: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Índices para consultas frecuentes
movimientoStockSchema.index({ producto: 1, createdAt: -1 });
movimientoStockSchema.index({ tipo: 1 });

module.exports = mongoose.model('MovimientoStock', movimientoStockSchema);
