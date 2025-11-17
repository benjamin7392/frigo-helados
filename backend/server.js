const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware para loggear todas las peticiones (para debugging móvil)
app.use((req, res, next) => {
  console.log(`📱 ${req.method} ${req.path} - IP: ${req.ip} - User-Agent: ${req.get('user-agent')?.substring(0, 50)}`);
  next();
});

// Configurar CORS - permitir todos los orígenes en desarrollo
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://frigo-helados.netlify.app', 'capacitor://localhost', 'ionic://localhost']
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const movimientoStockRoutes = require('./routes/movimientoStockRoutes');
const configuracionRoutes = require('./routes/configuracion');

// Ruta de prueba
app.get('/', (req, res) => res.send('API Heladería Frigo funcionando'));

// Usar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/movimientos-stock', movimientoStockRoutes);
app.use('/api/configuracion', configuracionRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📱 Accede desde tu celular en: http://TU_IP:${PORT}`);
  }
});