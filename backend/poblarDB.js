const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Importar modelos
const Usuario = require('./models/Usuario');
const Producto = require('./models/Producto');

// Datos de prueba
const usuariosPrueba = [
  {
    nombre: 'Admin Principal',
    email: 'admin@frigo.com',
    password: '123456',
    rol: 'admin'
  },
  {
    nombre: 'Juan Vendedor',
    email: 'vendedor@frigo.com',
    password: '123456',
    rol: 'vendedor'
  },
  {
    nombre: 'Lucía Empleada',
    email: 'empleada@frigo.com',
    password: '123456',
    rol: 'empleado'
  },
  {
    nombre: 'Carlos Cadete',
    email: 'cadete@frigo.com',
    password: '123456',
    rol: 'cadete'
  }
];

const productosPrueba = [
  // Helados de Crema
  {
    nombre: 'Dulce de Leche',
    tipo: 'helado',
    sabor: 'Dulce de Leche',
    categoria: 'crema',
    precio: 2500,
    stock: 50,
    unidadMedida: 'kg',
    stockMinimo: 10,
    descripcion: 'Helado artesanal de dulce de leche tradicional'
  },
  {
    nombre: 'Chocolate',
    tipo: 'helado',
    sabor: 'Chocolate',
    categoria: 'crema',
    precio: 2500,
    stock: 45,
    unidadMedida: 'kg',
    stockMinimo: 10,
    descripcion: 'Helado de chocolate con cacao premium'
  },
  {
    nombre: 'Vainilla',
    tipo: 'helado',
    sabor: 'Vainilla',
    categoria: 'crema',
    precio: 2300,
    stock: 40,
    unidadMedida: 'kg',
    stockMinimo: 10,
    descripcion: 'Helado de vainilla con esencia natural'
  },
  {
    nombre: 'Frutilla',
    tipo: 'helado',
    sabor: 'Frutilla',
    categoria: 'crema',
    precio: 2600,
    stock: 35,
    unidadMedida: 'kg',
    stockMinimo: 10,
    descripcion: 'Helado de frutilla con trozos de fruta'
  },
  {
    nombre: 'Tramontana',
    tipo: 'helado',
    sabor: 'Tramontana',
    categoria: 'crema',
    precio: 2700,
    stock: 30,
    unidadMedida: 'kg',
    stockMinimo: 8,
    descripcion: 'Dulce de leche con cerezas y chocolate'
  },
  // Helados de Agua
  {
    nombre: 'Limón',
    tipo: 'helado',
    sabor: 'Limón',
    categoria: 'agua',
    precio: 2000,
    stock: 25,
    unidadMedida: 'kg',
    stockMinimo: 8,
    descripcion: 'Helado de agua con limón natural'
  },
  {
    nombre: 'Naranja',
    tipo: 'helado',
    sabor: 'Naranja',
    categoria: 'agua',
    precio: 2000,
    stock: 20,
    unidadMedida: 'kg',
    stockMinimo: 8,
    descripcion: 'Helado de agua con jugo de naranja'
  },
  // Premium
  {
    nombre: 'Mascarpone',
    tipo: 'helado',
    sabor: 'Mascarpone',
    categoria: 'premium',
    precio: 3200,
    stock: 15,
    unidadMedida: 'kg',
    stockMinimo: 5,
    descripcion: 'Helado premium con queso mascarpone italiano'
  },
  {
    nombre: 'Pistacho',
    tipo: 'helado',
    sabor: 'Pistacho',
    categoria: 'premium',
    precio: 3500,
    stock: 12,
    unidadMedida: 'kg',
    stockMinimo: 5,
    descripcion: 'Helado con pistachos importados'
  },
  // Insumos
  {
    nombre: 'Conos',
    tipo: 'insumo',
    categoria: 'insumo',
    precio: 100,
    stock: 500,
    unidadMedida: 'unidades',
    stockMinimo: 100,
    descripcion: 'Conos de galleta para helado'
  },
  {
    nombre: 'Cucuruchos',
    tipo: 'insumo',
    categoria: 'insumo',
    precio: 150,
    stock: 300,
    unidadMedida: 'unidades',
    stockMinimo: 80,
    descripcion: 'Cucuruchos de waffle'
  },
  {
    nombre: 'Vasos 250ml',
    tipo: 'insumo',
    categoria: 'insumo',
    precio: 80,
    stock: 1000,
    unidadMedida: 'unidades',
    stockMinimo: 200,
    descripcion: 'Vasos descartables para helado'
  },
  {
    nombre: 'Cucharitas',
    tipo: 'insumo',
    categoria: 'insumo',
    precio: 30,
    stock: 2000,
    unidadMedida: 'unidades',
    stockMinimo: 500,
    descripcion: 'Cucharitas descartables'
  }
];

// Función para poblar la base de datos
const poblarBD = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones existentes
    console.log('\n🗑️  Limpiando base de datos...');
    await Usuario.deleteMany({});
    await Producto.deleteMany({});
    console.log('✅ Base de datos limpiada');

    // Crear usuarios
    console.log('\n👤 Creando usuarios...');
    const usuarios = await Usuario.create(usuariosPrueba);
    console.log(`✅ ${usuarios.length} usuarios creados`);
    usuarios.forEach(u => console.log(`   - ${u.nombre} (${u.email}) - Rol: ${u.rol}`));

    // Crear productos
    console.log('\n🍦 Creando productos...');
    const productos = await Producto.create(productosPrueba);
    console.log(`✅ ${productos.length} productos creados`);
    
    // Agrupar por tipo
    const helados = productos.filter(p => p.tipo === 'helado');
    const insumos = productos.filter(p => p.tipo === 'insumo');
    
    console.log(`\n📊 Resumen:`);
    console.log(`   - Helados: ${helados.length}`);
    console.log(`   - Insumos: ${insumos.length}`);
    console.log(`\n🎉 ¡Base de datos poblada exitosamente!`);
    
    console.log(`\n📝 Credenciales de acceso:`);
    console.log(`   Admin: admin@frigo.com / 123456`);
    console.log(`   Vendedor: vendedor@frigo.com / 123456`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Ejecutar
poblarBD();
