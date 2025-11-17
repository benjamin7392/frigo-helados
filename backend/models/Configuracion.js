const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  nombreNegocio: {
    type: String,
    default: 'Heladería Frigo',
    trim: true
  },
  slogan: {
    type: String,
    default: 'Los mejores helados artesanales',
    trim: true
  },
  direccion: {
    type: String,
    default: '',
    trim: true
  },
  telefono: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  colorPrimario: {
    type: String,
    default: '#3b82f6'
  },
  colorSecundario: {
    type: String,
    default: '#10b981'
  },
  colorFondo: {
    type: String,
    default: '#f3f4f6'
  },
  moneda: {
    type: String,
    default: 'ARS',
    enum: ['ARS', 'USD', 'EUR']
  },
  iva: {
    type: Number,
    default: 21,
    min: 0,
    max: 100
  },
  horarioApertura: {
    type: String,
    default: '10:00'
  },
  horarioCierre: {
    type: String,
    default: '22:00'
  },
  mensajeBienvenida: {
    type: String,
    default: 'Bienvenido al sistema de ventas'
  },
  impresora: {
    habilitada: {
      type: Boolean,
      default: false
    },
    nombre: {
      type: String,
      default: ''
    },
    anchoTicket: {
      type: Number,
      default: 80
    }
  },
  notificaciones: {
    stockBajo: {
      type: Boolean,
      default: true
    },
    ventaCompletada: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Configuracion', configuracionSchema);
