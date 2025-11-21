// Controlador de Inventario: CRUD para insumos, herramientas y recursos no vendidos.
// Solo admin puede crear/editar/eliminar, empleados solo pueden consultar.
const Inventario = require('../models/Inventario');

// Obtener todo el inventario
exports.obtenerInventario = async (req, res) => {
  try {
    const items = await Inventario.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener inventario' });
  }
};

// Crear nuevo item
exports.crearItem = async (req, res) => {
  try {
    const { nombre, cantidad, unidad, categoria, descripcion } = req.body;
    const item = new Inventario({
      nombre,
      cantidad,
      unidad,
      categoria,
      descripcion,
      creadoPor: req.usuario._id,
      actualizadoPor: req.usuario._id,
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear item' });
  }
};

// Actualizar item
exports.actualizarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cantidad, unidad, categoria, descripcion } = req.body;
    const item = await Inventario.findByIdAndUpdate(
      id,
      {
        nombre,
        cantidad,
        unidad,
        categoria,
        descripcion,
        actualizadoPor: req.usuario._id,
        fechaActualizacion: Date.now(),
      },
      { new: true }
    );
    if (!item) return res.status(404).json({ mensaje: 'Item no encontrado' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar item' });
  }
};

// Eliminar item
exports.eliminarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Inventario.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ mensaje: 'Item no encontrado' });
    res.json({ mensaje: 'Item eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar item' });
  }
};
