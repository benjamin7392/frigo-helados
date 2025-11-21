// Modelo de Inventario: insumos, herramientas, recursos no vendidos de la heladería.
const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true, default: 0 },
  unidad: { type: String, required: true }, // ej: kg, unidades, litros
  categoria: { type: String }, // opcional: "insumo", "herramienta", etc
  descripcion: { type: String },
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  actualizadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventario', InventarioSchema);
