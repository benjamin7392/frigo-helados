# 🚀 Desplegar en Render.com (100% GRATIS)

## ✅ Sin Tarjeta de Crédito - Plan Gratuito Permanente

---

## Paso 1: Crear Cuenta GitHub (si no tienes)

1. Ve a: https://github.com/signup
2. Ingresa tu email y crea contraseña
3. Verifica tu email

---

## Paso 2: Subir Código a GitHub

**Ejecuta el script automático:**

```powershell
setup-render.bat
```

El script te guiará para:
1. Inicializar Git en tu proyecto
2. Crear repositorio en GitHub
3. Subir el código automáticamente

---

## Paso 3: Crear Cuenta en Render

1. Ve a: **https://render.com/register**
2. **Sign up with GitHub** (no necesitas tarjeta)
3. Autoriza Render a acceder a tu GitHub

---

## Paso 4: Crear MongoDB Gratis

1. Ve a: **https://www.mongodb.com/cloud/atlas/register**
2. Regístrate GRATIS (no necesitas tarjeta)
3. **Create a deployment** → Selecciona **FREE (M0)**
4. Elige región más cercana (AWS São Paulo o US East)
5. **Create Deployment**

### Configurar MongoDB Atlas:

1. **Security Quickstart**:
   - Username: `admin`
   - Password: (crea una segura, guárdala)
   - Clic en **Create Database User**

2. **Network Access**:
   - **Add IP Address**
   - **Allow Access from Anywhere** → `0.0.0.0/0`
   - Clic en **Confirm**

3. **Connect**:
   - Clic en **Connect** en tu cluster
   - **Drivers** → Node.js
   - **Copia el connection string**:
     ```
     mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Reemplaza `<password>` con tu contraseña
   - Cambia `?retryWrites` por `/heladeria-frigo?retryWrites`

---

## Paso 5: Desplegar Backend en Render

1. En Render, clic en **"New +"** → **"Web Service"**
2. **Connect a repository** → Selecciona `frigo-helados`
3. Configuración:

```
Name: frigo-helados-backend
Root Directory: (dejar vacío)
Environment: Node
Region: Oregon (US West) o la más cercana
Branch: main

Build Command: npm install
Start Command: npm start

Instance Type: Free
```

4. **Advanced** → **Add Environment Variable**:

```
PORT = 4000
NODE_ENV = production
JWT_SECRET = mi_clave_super_secreta_12345
MONGO_URI = mongodb+srv://admin:TU_PASSWORD@cluster0.xxxxx.mongodb.net/heladeria-frigo?retryWrites=true&w=majority
```

5. Clic en **"Create Web Service"**
6. Espera 5-10 minutos (primera vez es más lento)

---

## Paso 6: Obtener URL y Poblar Base de Datos

1. Cuando termine el deploy, Render te dará una URL:
   ```
   https://frigo-helados-backend.onrender.com
   ```

2. **Poblar la base de datos**:

```powershell
# Instalar Render CLI
npm install -g @render/cli

# Login
render login

# Ver tus servicios
render services list

# Poblar base de datos
render run -s frigo-helados-backend node backend/poblarProduccion.js
```

**Alternativa sin CLI:**

Agrega en `backend/server.js` después de las rutas:

```javascript
// ENDPOINT TEMPORAL PARA POBLAR - ELIMINAR DESPUÉS
app.get('/api/poblar-db-inicial', async (req, res) => {
  try {
    const Usuario = require('./models/Usuario');
    const Producto = require('./models/Producto');
    
    // Crear usuarios
    await Usuario.create([
      { nombre: 'Admin', email: 'admin@frigo.com', password: '123456', rol: 'admin' },
      { nombre: 'Vendedor', email: 'vendedor@frigo.com', password: '123456', rol: 'vendedor' }
    ]);
    
    // Crear productos (copiar array de poblarProduccion.js)
    
    res.json({ mensaje: 'Base de datos poblada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

Luego visita: `https://tu-url.onrender.com/api/poblar-db-inicial`

---

## Paso 7: Actualizar Frontend

Edita `frontend/src/services/api.js` línea 4:

```javascript
// Cambiar de:
const API_URL = 'http://192.168.1.42:4000/api';

// A:
const API_URL = 'https://frigo-helados-backend.onrender.com/api';
```

También edita `frontend/src/pages/Login.jsx` (busca las referencias a la IP).

Luego:

```powershell
cd frontend
npm run build
npx cap sync
```

---

## ✅ ¡Listo!

Tu app ahora funciona desde **cualquier lugar del mundo** con internet.

---

## 📊 Limitaciones del Plan Gratuito

- **Render Free**:
  - ✅ HTTPS incluido
  - ✅ Deploys ilimitados
  - ⚠️ Se duerme después de 15 min de inactividad
  - ⚠️ Toma ~30 seg despertar la primera vez

- **MongoDB Atlas Free**:
  - ✅ 512 MB de almacenamiento
  - ✅ Conexiones ilimitadas
  - ✅ Perfecto para tu heladería

---

## 🔄 Para Actualizar la App

```powershell
cd C:\Users\Benjamin\frigo-helados

# Hacer cambios en tu código...

git add .
git commit -m "Actualizacion"
git push

# Render redespliega automáticamente
```

---

## 💡 Tips

1. **Primera carga lenta**: Es normal, el servidor gratuito se "duerme"
2. **Mantener despierto**: Usa cron-job.org para hacer ping cada 10 min
3. **Logs en vivo**: Render → Tu servicio → Logs
4. **Cambiar variables**: Render → Environment → Editar

---

## 🆘 Solución de Problemas

**Error de CORS:**
- Verifica que `backend/server.js` tenga `origin: '*'` en producción

**MongoDB no conecta:**
- Verifica que la IP `0.0.0.0/0` esté permitida en Atlas
- Verifica que el password no tenga caracteres especiales sin escapar

**App tarda mucho:**
- Primera carga toma ~30 seg (servidor gratuito despierta)
- Luego funciona normal

---

## 📞 Soporte

- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com/manual/
- Render Community: https://community.render.com/
