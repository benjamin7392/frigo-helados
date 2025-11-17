@echo off
echo.
echo ========================================
echo   HELADERIA FRIGO - MODO RED LOCAL
echo ========================================
echo.
echo Iniciando servidores para acceso desde celulares...
echo.
echo IMPORTANTE: Asegura que ejecutaste configurar-red.bat
echo.
start cmd /k "cd backend && echo BACKEND - Puerto 4000 && node server.js"
timeout /t 3 /nobreak > nul
start cmd /k "cd frontend && echo FRONTEND - Modo Red && npm run dev:network"
echo.
echo ========================================
echo   SERVIDORES INICIADOS
echo ========================================
echo.
echo Ahora en tu iPhone/iPad:
echo 1. Abre Safari
echo 2. Ve a: http://TU_IP:5173
echo 3. Toca "Compartir" (icono cuadrado con flecha)
echo 4. Selecciona "Agregar a pantalla de inicio"
echo 5. Toca "Agregar"
echo.
echo Repite en cada telefono de empleados
echo.
pause
