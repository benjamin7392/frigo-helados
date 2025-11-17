// Helpers para modularizar la lógica de ventas y stock

const Producto = require('../models/Producto');
const MovimientoStock = require('../models/MovimientoStock');

/**
 * Valida y descuenta stock de un producto
 * @param {string} productoId
 * @param {number} cantidad
 * @param {object} session - sesión de mongoose
 * @returns {Promise<{producto, stockAnterior, subtotal}>}
 */
async function validarYDescontarStock(productoId, cantidad, session) {
  const producto = await Producto.findById(productoId).session(session);
  if (!producto) throw new Error(`Producto ${productoId} no encontrado`);
  if (producto.stock < cantidad) throw new Error(`Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}`);
  const stockAnterior = producto.stock;
  producto.stock -= cantidad;
  await producto.save({ session });
  const subtotal = cantidad * producto.precio;
  return { producto, stockAnterior, subtotal };
}

/**
 * Registra un movimiento de stock
 */
async function registrarMovimientoStock({ producto, tipo, cantidad, stockAnterior, stockNuevo, motivo, usuario, referencia, referenciaModelo, notas }, session) {
  await MovimientoStock.create([
    {
      producto,
      tipo,
      cantidad,
      stockAnterior,
      stockNuevo,
      motivo,
      usuario,
      referencia,
      referenciaModelo,
      notas
    }
  ], { session });
}

/**
 * Devuelve stock a un producto (por cancelación de venta)
 * @param {string} productoId
 * @param {number} cantidad
 * @param {object} session
 * @returns {Promise<{producto, stockAnterior}>}
 */
async function devolverStock(productoId, cantidad, session) {
  const producto = await Producto.findById(productoId).session(session);
  if (!producto) throw new Error(`Producto ${productoId} no encontrado`);
  const stockAnterior = producto.stock;
  producto.stock += cantidad;
  await producto.save({ session });
  return { producto, stockAnterior };
}

module.exports = {
  validarYDescontarStock,
  registrarMovimientoStock,
  devolverStock
};
