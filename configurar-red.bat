@echo off
echo.
echo ========================================
echo   CONFIGURAR IP PARA RED LOCAL
echo ========================================
echo.
set /p IP="Ingresa la IP de tu computadora (ejecuta obtener-ip.bat): "
echo.
echo Configurando frontend para red local...
echo VITE_API_URL=http://%IP%:4000/api > frontend\.env.network
echo.
echo Copiando configuracion de red...
copy /Y frontend\.env.network frontend\.env
echo.
echo ========================================
echo   CONFIGURACION COMPLETADA
echo ========================================
echo.
echo Tu frontend ahora esta configurado para:
echo http://%IP%:4000/api
echo.
echo Proximos pasos:
echo 1. Ejecutar: iniciar-red.bat
echo 2. En tu iPhone, ir a Safari
echo 3. Abrir: http://%IP%:5173
echo 4. Tocar "Compartir" y "Agregar a pantalla inicio"
echo.
pause
