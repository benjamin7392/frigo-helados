@echo off
echo ========================================
echo   SETUP AUTOMATICO - RENDER DEPLOY
echo   100%% GRATUITO - SIN TARJETA
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
echo PROXIMO PASO (TODO GRATIS):
echo.
echo 1. Ve a: https://render.com/register
echo 2. Registrate con GitHub (GRATIS, sin tarjeta)
echo 3. Autoriza Render a acceder a tu GitHub
echo.
echo 4. Clic en "New +" -^> "Web Service"
echo 5. Conecta tu repo "frigo-helados"
echo.
echo 6. Configuracion:
echo    - Name: frigo-helados-backend
echo    - Root Directory: (dejar vacio)
echo    - Environment: Node
echo    - Build Command: npm install
echo    - Start Command: npm start
echo    - Plan: FREE
echo.
echo 7. En "Advanced" -^> "Add Environment Variable":
echo    JWT_SECRET = clave_super_secreta_123
echo    NODE_ENV = production
echo.
echo 8. Clic en "Create Web Service"
echo    (Render construira tu app, toma 5-10 minutos)
echo.
echo 9. Una vez desplegado, copia la URL (ejemplo: frigo-helados.onrender.com)
echo.
pause
echo.
set /p RENDER_URL="Pega aqui tu URL de Render (sin https://): "

echo.
echo Actualizando frontend con la nueva URL...

powershell -Command "(gc frontend\src\services\api.js) -replace 'http://192.168.1.42:4000/api', 'https://%RENDER_URL%/api' | Out-File -encoding ASCII frontend\src\services\api.js"

powershell -Command "(gc frontend\src\pages\Login.jsx) -replace 'http://192.168.1.42:4000/api', 'https://%RENDER_URL%/api' | Out-File -encoding ASCII frontend\src\pages\Login.jsx"

echo.
echo ========================================
echo   FRONTEND ACTUALIZADO
echo ========================================
echo.
echo ULTIMO PASO - Crear MongoDB gratis:
echo.
echo 1. Ve a: https://www.mongodb.com/cloud/atlas/register
echo 2. Registrate GRATIS
echo 3. Create a deployment -^> FREE (M0)
echo 4. Username: admin / Password: (crea una)
echo 5. Network Access -^> Add IP -^> Allow Access from Anywhere (0.0.0.0/0)
echo 6. Database -^> Connect -^> Drivers -^> Copia el connection string
echo.
echo 7. Ve a Render -^> Tu servicio -^> Environment
echo 8. Agrega variable:
echo    MONGO_URI = (pega el connection string)
echo    (reemplaza ^<password^> con tu password y ^<dbname^> con heladeria-frigo)
echo.
echo 9. Render redesplegara automaticamente
echo.
echo PARA POBLAR LA BASE DE DATOS:
echo   npm install -g @render/cli
echo   render login
echo   render services list
echo   render run -s frigo-helados-backend node backend/poblarProduccion.js
echo.
echo Ahora ejecuta:
echo   cd frontend
echo   npm run build
echo   npx cap sync
echo.
echo Tu app funcionara desde cualquier lugar!
echo.
pause
