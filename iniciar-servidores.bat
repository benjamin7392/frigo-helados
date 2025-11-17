@echo off
echo ============================================
echo   Iniciando Servidores - Heladeria Frigo
echo ============================================
echo.

REM Ir a la carpeta del backend y iniciar el servidor
cd /d "%~dp0backend"
start "Backend - Puerto 4000" cmd /k "node server.js"

REM Esperar 2 segundos
timeout /t 2 /nobreak >nul

REM Ir a la carpeta del frontend y iniciar el servidor con acceso de red
cd /d "%~dp0frontend"
start "Frontend - Puerto 5173" cmd /k "npx vite --host"

echo.
echo ============================================
echo   Servidores iniciados correctamente!
echo ============================================
echo.
echo   Backend:  http://localhost:4000
echo   Frontend: http://192.168.1.42:5173
echo.
echo   Celular:  http://192.168.1.42:5173
echo ============================================
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
