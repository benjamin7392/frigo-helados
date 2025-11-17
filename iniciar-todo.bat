@echo off
echo.
echo ========================================
echo   HELADERIA FRIGO - INICIAR SISTEMA
echo ========================================
echo.
echo Abriendo Backend y Frontend...
echo.
start cmd /k "cd backend && echo BACKEND - Puerto 4000 && node server.js"
timeout /t 3 /nobreak > nul
start cmd /k "cd frontend && echo FRONTEND && npm run dev"
echo.
echo Sistema iniciado en 2 terminales
echo Presiona Ctrl+C en cada terminal para detener
echo.
pause
