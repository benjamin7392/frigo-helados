# 🚀 Desplegar Backend en Railway (GRATIS)

## Paso 1: Crear Cuenta en Railway

1. Ve a: https://railway.app
2. Clic en **"Start a New Project"**
3. Inicia sesión con GitHub (crea cuenta GitHub si no tienes)

---

## Paso 2: Subir el Código a GitHub

### Opción A: Desde VS Code (MÁS FÁCIL)

1. **Abre VS Code** en la carpeta del proyecto
2. **Clic en el ícono de Source Control** (tercer ícono del lado izquierdo)
3. **Clic en "Initialize Repository"**
4. **Escribe un mensaje**: "Initial commit"
5. **Clic en el ✓ (commit)**
6. **Clic en "Publish to GitHub"**
7. **Selecciona "Publish to GitHub public repository"**

### Opción B: Desde Terminal

```powershell
cd C:\Users\Benjamin\frigo-helados

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit"

# Crear repositorio en GitHub y seguir instrucciones
# https://github.com/new
```

---

## Paso 3: Crear Proyecto en Railway

1. **Ve a Railway**: https://railway.app
2. **Clic en "New Project"**
3. **Selecciona "Deploy from GitHub repo"**
4. **Autoriza Railway** para acceder a tus repositorios
5. **Selecciona el repositorio** `frigo-helados`
6. Railway detectará automáticamente que es Node.js

---

## Paso 4: Agregar Base de Datos MongoDB

1. **En Railway, clic en "+ New"**
2. **Selecciona "Database" → "Add MongoDB"**
3. Railway creará una base de datos automáticamente
4. **Copia la URL de conexión** (aparece en las variables de entorno)

---

## Paso 5: Configurar Variables de Entorno

En Railway, ve a tu servicio → **Variables** → Agrega:

```
PORT=4000
MONGO_URI=mongodb://mongo:CONTRASEÑA@SERVIDOR/heladeria-frigo
JWT_SECRET=clave_super_secreta_produccion_12345
NODE_ENV=production
```

⚠️ **Railway te da automáticamente la `MONGO_URI`** cuando creas el MongoDB.

---

## Paso 6: Deploy

1. Railway hará **deploy automático**
2. Espera 2-3 minutos
3. Railway te dará una URL como: `https://frigo-helados-production.up.railway.app`

---

## Paso 7: Poblar la Base de Datos

**Opción A: Desde Railway CLI**

```powershell
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar al proyecto
railway link

# Ejecutar el script de población
railway run node backend/poblarProductosReales.js
```

**Opción B: Crear endpoint temporal**

Agregar en `backend/server.js`:

```javascript
// SOLO PARA DESARROLLO - ELIMINAR DESPUÉS
app.get('/api/poblar-db', async (req, res) => {
  // Ejecutar lógica de poblarProductosReales.js
  res.json({ mensaje: 'Base de datos poblada' });
});
```

Luego visita: `https://tu-app.railway.app/api/poblar-db`

---

## Paso 8: Actualizar Frontend

Edita `frontend/src/services/api.js`:

```javascript
// Cambiar de:
const API_URL = 'http://192.168.1.42:4000/api';

// A:
const API_URL = 'https://frigo-helados-production.up.railway.app/api';
```

Haz build y sync:

```powershell
cd frontend
npm run build
npx cap sync
```

---

## ✅ ¡Listo!

Ahora tu app funciona desde CUALQUIER lugar del mundo con internet.

---

## 💡 Tips

- **Railway es GRATIS** hasta $5/mes de uso
- **MongoDB Atlas** también tiene plan gratuito (mejor opción)
- **Redeploy automático**: Cada push a GitHub hace deploy automático
- **Logs**: Railway → Tu servicio → Logs (para ver errores)

---

## 🔄 Para Actualizar

1. Haces cambios en el código
2. Push a GitHub:
   ```powershell
   git add .
   git commit -m "Actualización"
   git push
   ```
3. Railway hace deploy automático

---

## 🌐 Alternativas a Railway

- **Render**: https://render.com (también gratis)
- **Fly.io**: https://fly.io
- **Heroku**: https://heroku.com (de pago)
- **DigitalOcean**: https://digitalocean.com (más avanzado)
