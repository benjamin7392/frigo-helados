@echo off
echo.
echo ========================================
echo   OBTENER IP DE TU COMPUTADORA
echo ========================================
echo.
ipconfig | findstr /i "IPv4"
echo.
echo Anota la direccion IPv4 de tu adaptador WiFi
echo Ejemplo: 192.168.1.10
echo.
pause
