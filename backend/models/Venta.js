const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    nombre: String,
    cantidad: {
      type: Number,
      required: true,
      min: 0
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  metodoPago: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'transferencia', 'otro'],
    required: true
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  cliente: {
    type: String,
    trim: true
  },
  notas: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['completada', 'cancelada', 'pendiente'],
    default: 'completada'
  }
}, {
  timestamps: true
});

// Índice para reportes por fecha
ventaSchema.index({ createdAt: -1 });
ventaSchema.index({ vendedor: 1 });

module.exports = mongoose.model('Venta', ventaSchema);
