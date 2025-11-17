const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true
  },
  tipo: {
    type: String,
    enum: ['helado', 'insumo', 'otro'],
    required: true
  },
  sabor: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    enum: ['VASITOS', 'CONOS', 'CUCURUCHONES', 'KILOS', 'PALITOS', 'BOMBONES', 'PROMOS', 'INSUMOS', 'OTROS'],
    required: true
  },
  subCategoria: {
    type: String,
    trim: true
    // Ej: "1 BOCHA", "2 BOCHAS", "3 BOCHAS", "1/4", "1/2", "1LT", "AGUA", "CREMA"
  },
  cantidadBochas: {
    type: Number,
    min: 0,
    default: 0
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: 0
  },
  costo: {
    type: Number,
    default: 0,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  unidadMedida: {
    type: String,
    enum: ['kg', 'litros', 'unidades'],
    default: 'unidades'
  },
  stockMinimo: {
    type: Number,
    default: 5,
    min: 0
  },
  activo: {
    type: Boolean,
    default: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  imagen: {
    type: String,
    default: ''
  },
  orden: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índice para búsquedas rápidas
productoSchema.index({ nombre: 1, tipo: 1 });

module.exports = mongoose.model('Producto', productoSchema);
