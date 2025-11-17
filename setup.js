const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🍦 INSTALADOR RÁPIDO - Heladería Frigo 🍦\n');

const scripts = [
  {
    name: '1. Instalar dependencias backend',
    command: 'cd backend && npm install',
    dir: 'backend'
  },
  {
    name: '2. Instalar vite-plugin-pwa en frontend',
    command: 'cd frontend && npm install -D vite-plugin-pwa',
    dir: 'frontend'
  },
  {
    name: '3. Poblar base de datos con productos reales',
    command: 'cd backend && node poblarProductosReales.js',
    dir: 'backend'
  }
];

console.log('Tareas a ejecutar:');
scripts.forEach((script, i) => {
  console.log(`${i + 1}. ${script.name}`);
});

rl.question('\n¿Ejecutar todas las tareas? (s/n): ', (answer) => {
  if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si') {
    console.log('\n✅ Iniciando instalación automática...\n');
    
    const { execSync } = require('child_process');
    
    scripts.forEach((script) => {
      try {
        console.log(`\n▶️  ${script.name}...`);
        execSync(script.command, { stdio: 'inherit', shell: true });
        console.log(`✅ ${script.name} completado\n`);
      } catch (error) {
        console.error(`❌ Error en: ${script.name}`);
      }
    });
    
    console.log('\n🎉 Instalación completada!\n');
    console.log('Para iniciar el sistema:');
    console.log('1. Terminal 1: cd backend && node server.js');
    console.log('2. Terminal 2: cd frontend && npm run dev\n');
  } else {
    console.log('\n❌ Instalación cancelada');
  }
  
  rl.close();
});
