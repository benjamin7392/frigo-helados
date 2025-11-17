const Configuracion = require('../models/Configuracion');

// Obtener configuración
exports.obtenerConfiguracion = async (req, res) => {
  try {
    let config = await Configuracion.findOne();
    
    if (!config) {
      config = await Configuracion.create({});
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener configuración', error: error.message });
  }
};

// Actualizar configuración
exports.actualizarConfiguracion = async (req, res) => {
  try {
    let config = await Configuracion.findOne();
    
    if (!config) {
      config = await Configuracion.create(req.body);
    } else {
      config = await Configuracion.findByIdAndUpdate(
        config._id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.json(config);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar configuración', error: error.message });
  }
};
