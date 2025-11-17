@echo off
echo ========================================
echo   SETUP AUTOMATICO - RAILWAY DEPLOY
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Inicializando Git...
git init
if errorlevel 1 (
    echo ERROR: Git no inicializado
    pause
    exit /b 1
)

echo.
echo [2/5] Agregando archivos...
git add .

echo.
echo [3/5] Creando commit inicial...
git commit -m "Initial commit - Heladeria Frigo"

echo.
echo [4/5] Renombrando rama a main...
git branch -M main

echo.
echo ========================================
echo   REPOSITORIO GIT LISTO
echo ========================================
echo.
echo SIGUIENTE PASO:
echo.
echo 1. Ve a: https://github.com/new
echo 2. Nombre del repo: frigo-helados
echo 3. Deja en PUBLIC
echo 4. NO marques ninguna opcion
echo 5. Clic en "Create repository"
echo.
echo 6. Copia SOLO el nombre de usuario de GitHub
echo    (ejemplo: si tu URL es github.com/benjamin123, copia: benjamin123)
echo.
pause
echo.
set /p GITHUB_USER="Pega aqui tu usuario de GitHub: "

echo.
echo [5/5] Conectando con GitHub...
git remote add origin https://github.com/%GITHUB_USER%/frigo-helados.git
git push -u origin main

echo.
echo ========================================
echo   CODIGO SUBIDO A GITHUB!
echo ========================================
echo.
echo URL de tu repo: https://github.com/%GITHUB_USER%/frigo-helados
echo.
echo PROXIMO PASO:
echo.
echo 1. Ve a: https://railway.app
echo 2. Clic en "Start a New Project"
echo 3. Login con GitHub
echo 4. Clic en "Deploy from GitHub repo"
echo 5. Selecciona "frigo-helados"
echo 6. Espera 2-3 minutos
echo.
echo 7. Clic en "+ New" -> Database -> MongoDB
echo.
echo 8. Ve a tu servicio -> Settings -> Generate Domain
echo.
echo 9. Copia la URL que te dan (ejemplo: frigo-production.railway.app)
echo.
pause
echo.
set /p RAILWAY_URL="Pega aqui tu URL de Railway (sin https://): "

echo.
echo Actualizando frontend con la nueva URL...

powershell -Command "(gc frontend\src\services\api.js) -replace 'http://192.168.1.42:4000/api', 'https://%RAILWAY_URL%/api' | Out-File -encoding ASCII frontend\src\services\api.js"

echo.
echo ========================================
echo   FRONTEND ACTUALIZADO
echo ========================================
echo.
echo Ahora ejecuta:
echo   cd frontend
echo   npm run build
echo   npx cap sync
echo.
echo Tu app funcionara desde cualquier lugar!
echo.
pause
