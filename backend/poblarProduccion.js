// Script para poblar la base de datos en producción
require('dotenv').config();
const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB');
    
    // Importar modelos
    const Usuario = require('./models/Usuario');
    const Producto = require('./models/Producto');
    
    // Crear usuarios si no existen
    const adminExists = await Usuario.findOne({ email: 'admin@frigo.com' });
    if (!adminExists) {
      await Usuario.create({
        nombre: 'Administrador',
        email: 'admin@frigo.com',
        password: '123456',
        rol: 'admin'
      });
      console.log('✅ Usuario admin creado');
    }
    
    const vendedorExists = await Usuario.findOne({ email: 'vendedor@frigo.com' });
    if (!vendedorExists) {
      await Usuario.create({
        nombre: 'Vendedor',
        email: 'vendedor@frigo.com',
        password: '123456',
        rol: 'vendedor'
      });
      console.log('✅ Usuario vendedor creado');
    }
    
    // Crear productos si no existen
    const productosExisten = await Producto.countDocuments();
    if (productosExisten === 0) {
      const productos = [
        // VASITOS
        { nombre: 'Vasito 1 Bocha', tipo: 'helado', categoria: 'VASITOS', precio: 800, stock: 100, stockMinimo: 20 },
        
        // CONOS
        { nombre: 'Cono 1 Bocha', tipo: 'helado', categoria: 'CONOS', subCategoria: '1 BOCHA', cantidadBochas: 1, precio: 1000, stock: 100, stockMinimo: 20 },
        { nombre: 'Cono 2 Bochas', tipo: 'helado', categoria: 'CONOS', subCategoria: '2 BOCHAS', cantidadBochas: 2, precio: 1500, stock: 100, stockMinimo: 20 },
        { nombre: 'Cono 3 Bochas', tipo: 'helado', categoria: 'CONOS', subCategoria: '3 BOCHAS', cantidadBochas: 3, precio: 2000, stock: 100, stockMinimo: 20 },
        
        // CUCURUCHONES
        { nombre: 'Cucurucho 2 Bochas', tipo: 'helado', categoria: 'CUCURUCHONES', subCategoria: '2 BOCHAS', cantidadBochas: 2, precio: 1800, stock: 100, stockMinimo: 20 },
        { nombre: 'Cucurucho 3 Bochas', tipo: 'helado', categoria: 'CUCURUCHONES', subCategoria: '3 BOCHAS', cantidadBochas: 3, precio: 2300, stock: 100, stockMinimo: 20 },
        
        // KILOS
        { nombre: '1/4 KG Helado', tipo: 'helado', categoria: 'KILOS', subCategoria: '1/4 KG', precio: 2500, stock: 50, stockMinimo: 10, unidadMedida: 'kg' },
        { nombre: '1/2 KG Helado', tipo: 'helado', categoria: 'KILOS', subCategoria: '1/2 KG', precio: 4500, stock: 50, stockMinimo: 10, unidadMedida: 'kg' },
        { nombre: '1 KG Helado', tipo: 'helado', categoria: 'KILOS', subCategoria: '1 KG', precio: 8000, stock: 50, stockMinimo: 10, unidadMedida: 'kg' },
        
        // PALITOS
        { nombre: 'Palito de Agua', tipo: 'helado', categoria: 'PALITOS', subCategoria: 'AGUA', precio: 500, stock: 200, stockMinimo: 50 },
        { nombre: 'Palito de Crema', tipo: 'helado', categoria: 'PALITOS', subCategoria: 'CREMA', precio: 600, stock: 200, stockMinimo: 50 },
        { nombre: 'Sanguchito', tipo: 'helado', categoria: 'PALITOS', subCategoria: 'SANGUCHITO', precio: 1200, stock: 150, stockMinimo: 30 },
        
        // BOMBONES
        { nombre: 'Bombón Escocés', tipo: 'helado', categoria: 'BOMBONES', precio: 1500, stock: 100, stockMinimo: 20 },
        
        // PROMOS
        { nombre: 'Promo Palitos Agua x6', tipo: 'helado', categoria: 'PROMOS', subCategoria: 'AGUA', precio: 2700, stock: 50, stockMinimo: 10 },
        { nombre: 'Promo Palitos Crema x6', tipo: 'helado', categoria: 'PROMOS', subCategoria: 'CREMA', precio: 3200, stock: 50, stockMinimo: 10 },
        { nombre: 'Promo Bombones x6', tipo: 'helado', categoria: 'PROMOS', subCategoria: 'BOMBONES', precio: 8000, stock: 30, stockMinimo: 5 },
        { nombre: 'Promo Escocés x6', tipo: 'helado', categoria: 'PROMOS', subCategoria: 'ESCOCES', precio: 8500, stock: 30, stockMinimo: 5 }
      ];
      
      await Producto.insertMany(productos);
      console.log('✅ Productos creados');
    }
    
    console.log('✅ Base de datos poblada correctamente');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
