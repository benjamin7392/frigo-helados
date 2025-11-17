@echo off
echo.
echo ========================================
echo   HELADERIA FRIGO - INSTALADOR
echo ========================================
echo.
echo Instalando dependencias del backend...
cd backend
call npm install
echo.
echo Instalando dependencias del frontend...
cd ..\frontend
call npm install
call npm install -D vite-plugin-pwa
echo.
echo Poblando base de datos con productos...
cd ..\backend
call node poblarProductosReales.js
echo.
echo ========================================
echo   INSTALACION COMPLETADA!
echo ========================================
echo.
echo Para iniciar el sistema:
echo 1. Abrir terminal 1: cd backend ^&^& node server.js
echo 2. Abrir terminal 2: cd frontend ^&^& npm run dev
echo.
echo Usuarios de prueba:
echo   Admin: admin@frigo.com / 123456
echo   Vendedor: vendedor@frigo.com / 123456
echo.
pause
