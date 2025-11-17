@echo off
echo.
echo ========================================
echo   COMPILAR APK - HELADERIA FRIGO
echo ========================================
echo.
echo Construyendo aplicacion...
cd frontend
call npm run build
echo.
echo Sincronizando con Android...
call npx cap sync android
echo.
echo Compilando APK...
cd android
call gradlew.bat assembleDebug
echo.
echo ========================================
echo   APK GENERADA EXITOSAMENTE
echo ========================================
echo.
echo Ubicacion:
echo frontend\android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Ahora puedes:
echo 1. Copiar el APK a tu celular
echo 2. Instalarlo desde el explorador de archivos
echo 3. Conectar el celular a la misma WiFi
echo 4. Abrir la app
echo.
pause
