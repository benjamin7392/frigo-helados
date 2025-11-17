require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Producto = require('./models/Producto');

const productosReales = [
  // VASITOS
  { nombre: 'VASITO DE 1 BOCHA', categoria: 'VASITOS', subCategoria: '1 BOCHA', cantidadBochas: 1, precio: 1500, tipo: 'helado', stock: 100, orden: 1 },
  
  // CONOS
  { nombre: 'CONO DE 1 BOCHA', categoria: 'CONOS', subCategoria: '1 BOCHA', cantidadBochas: 1, precio: 1500, tipo: 'helado', stock: 100, orden: 2 },
  { nombre: 'CONO DE 2 BOCHAS', categoria: 'CONOS', subCategoria: '2 BOCHAS', cantidadBochas: 2, precio: 2500, tipo: 'helado', stock: 100, orden: 3 },
  { nombre: 'CONO DE 3 BOCHAS', categoria: 'CONOS', subCategoria: '3 BOCHAS', cantidadBochas: 3, precio: 3500, tipo: 'helado', stock: 100, orden: 4 },
  
  // CUCURUCHONES
  { nombre: 'CUCURUCHO DE 2 BOCHAS', categoria: 'CUCURUCHONES', subCategoria: '2 BOCHAS', cantidadBochas: 2, precio: 3000, tipo: 'helado', stock: 100, orden: 5 },
  { nombre: 'CUCURUCHO DE 3 BOCHAS', categoria: 'CUCURUCHONES', subCategoria: '3 BOCHAS', cantidadBochas: 3, precio: 4000, tipo: 'helado', stock: 100, orden: 6 },
  
  // KILOS
  { nombre: '1/4 DE HELADO', categoria: 'KILOS', subCategoria: '1/4 KG', cantidadBochas: 0, precio: 3500, tipo: 'helado', stock: 50, unidadMedida: 'kg', orden: 7 },
  { nombre: '1/2 DE HELADO', categoria: 'KILOS', subCategoria: '1/2 KG', cantidadBochas: 0, precio: 6500, tipo: 'helado', stock: 50, unidadMedida: 'kg', orden: 8 },
  { nombre: '1LT DE HELADO', categoria: 'KILOS', subCategoria: '1 KG', cantidadBochas: 0, precio: 12000, tipo: 'helado', stock: 50, unidadMedida: 'kg', orden: 9 },
  
  // PALITOS
  { nombre: 'PALITO DE AGUA', categoria: 'PALITOS', subCategoria: 'AGUA', cantidadBochas: 0, precio: 800, tipo: 'helado', stock: 200, orden: 10 },
  { nombre: 'PALITO DE CREMA', categoria: 'PALITOS', subCategoria: 'CREMA', cantidadBochas: 0, precio: 1000, tipo: 'helado', stock: 200, orden: 11 },
  { nombre: 'SANGUCHITO', categoria: 'PALITOS', subCategoria: 'SANGUCHITO', cantidadBochas: 0, precio: 1500, tipo: 'helado', stock: 150, orden: 12 },
  
  // BOMBONES
  { nombre: 'BOMBON ESCOCES', categoria: 'BOMBONES', subCategoria: 'ESCOCES', cantidadBochas: 0, precio: 1200, tipo: 'helado', stock: 150, orden: 13 },
  
  // PROMOS
  { nombre: 'PROMO DE AGUA', categoria: 'PROMOS', subCategoria: 'AGUA', cantidadBochas: 0, precio: 7000, tipo: 'helado', stock: 50, descripcion: 'Promo x10 palitos de agua', orden: 14 },
  { nombre: 'PROMO DE CREMA', categoria: 'PROMOS', subCategoria: 'CREMA', cantidadBochas: 0, precio: 9000, tipo: 'helado', stock: 50, descripcion: 'Promo x10 palitos de crema', orden: 15 },
  { nombre: 'PROMO DE BOMBON', categoria: 'PROMOS', subCategoria: 'BOMBON', cantidadBochas: 0, precio: 11000, tipo: 'helado', stock: 30, descripcion: 'Promo x10 bombones', orden: 16 },
  { nombre: 'PROMO DE ESCOCES', categoria: 'PROMOS', subCategoria: 'ESCOCES', cantidadBochas: 0, precio: 11000, tipo: 'helado', stock: 30, descripcion: 'Promo x10 escoceses', orden: 17 },
  
  // INSUMOS
  { nombre: 'Conos para helado', categoria: 'INSUMOS', tipo: 'insumo', precio: 100, stock: 500, unidadMedida: 'unidades', stockMinimo: 50, orden: 18 },
  { nombre: 'Cucuruchos', categoria: 'INSUMOS', tipo: 'insumo', precio: 150, stock: 300, unidadMedida: 'unidades', stockMinimo: 30, orden: 19 },
  { nombre: 'Vasitos descartables', categoria: 'INSUMOS', tipo: 'insumo', precio: 50, stock: 1000, unidadMedida: 'unidades', stockMinimo: 100, orden: 20 },
  { nombre: 'Cucharitas', categoria: 'INSUMOS', tipo: 'insumo', precio: 30, stock: 2000, unidadMedida: 'unidades', stockMinimo: 200, orden: 21 },
];

async function poblarProductos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📦 Conectado a MongoDB');

    // Limpiar productos existentes
    await Producto.deleteMany({});
    console.log('🗑️  Productos anteriores eliminados');

    // Insertar nuevos productos
    await Producto.insertMany(productosReales);
    console.log('✅ Productos reales insertados correctamente');
    console.log(`📊 Total de productos: ${productosReales.length}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

poblarProductos();
