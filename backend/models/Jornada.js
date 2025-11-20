const mongoose = require('mongoose');

const jornadaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, required: true },
  entrada: { type: Date },
  salida: { type: Date },
  horasTrabajadas: { type: Number, default: 0 }, // Se puede calcular al marcar salida
  pagado: { type: Boolean, default: false }
});

module.exports = mongoose.model('Jornada', jornadaSchema);