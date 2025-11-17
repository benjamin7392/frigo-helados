# 🌐 Configuración de Red para Acceso Móvil

## ✅ Configuración Permanente Aplicada

### 📱 Detección Automática de Entorno

El sistema ahora detecta automáticamente desde dónde se está accediendo:

- **Desde PC (localhost)**: Usa `http://localhost:4000/api`
- **Desde red local (celular)**: Usa `http://192.168.1.42:4000/api`
- **Desde Capacitor (app nativa)**: Usa `http://192.168.1.42:4000/api`

### 🔧 Archivos Modificados

#### 1. `frontend/src/services/api.js`
- ✅ Detección automática de hostname
- ✅ IP hardcodeada para acceso móvil: `192.168.1.42`
- ✅ Logs detallados para debugging
- ✅ Timeout de 15 segundos

#### 2. `backend/server.js`
- ✅ Escuchando en `0.0.0.0` (todas las interfaces de red)
- ✅ CORS configurado con `origin: '*'`
- ✅ Logs de cada petición con IP y User-Agent

#### 3. `frontend/.env`
```
VITE_API_URL=http://192.168.1.42:4000/api
```

#### 4. `frontend/capacitor.config.json`
- ✅ Live reload configurado
- ✅ Server URL: `http://192.168.1.42:5173`
- ✅ Cleartext habilitado para desarrollo

### 🚀 Cómo Iniciar los Servidores

**Backend:**
```bash
cd C:\Users\Benjamin\frigo-helados\backend
node server.js
```

**Frontend (desarrollo con live reload):**
```bash
cd C:\Users\Benjamin\frigo-helados\frontend
npx vite --host
```

### 📱 URLs de Acceso

- **PC**: http://localhost:5173
- **iPhone/Android**: http://192.168.1.42:5173
- **API Backend**: http://192.168.1.42:4000

### 🔐 Usuarios de Prueba

- **Admin**: admin@frigo.com / 123456
- **Vendedor**: vendedor@frigo.com / 123456

### 📦 Build de Producción

**Para actualizar la app nativa:**
```bash
cd C:\Users\Benjamin\frigo-helados\frontend
npm run build
npx cap sync
```

Esto actualiza:
- ✅ Carpeta `dist/` con archivos de producción
- ✅ Proyecto iOS en `ios/`
- ✅ Proyecto Android en `android/`

### 🔄 Si Cambias de Red WiFi

Si tu IP cambia (ej: 192.168.1.42 → 192.168.1.50):

1. Edita `frontend/src/services/api.js` línea 18:
   ```javascript
   finalUrl = 'http://TU_NUEVA_IP:4000/api';
   ```

2. Edita `frontend/capacitor.config.json` línea 5:
   ```json
   "url": "http://TU_NUEVA_IP:5173"
   ```

3. Reconstruye:
   ```bash
   npm run build
   npx cap sync
   ```

### 🧪 Verificar Conexión

1. Abre la app en el celular
2. En la pantalla de login, toca **"🧪 Probar Conexión al Servidor"**
3. Si sale ✅ → Todo bien
4. Si sale ❌ → Verifica:
   - Backend corriendo en puerto 4000
   - Ambos dispositivos en la misma red WiFi
   - Firewall de Windows permite conexiones al puerto 4000

### 🛠️ Debugging

**Ver logs en tiempo real:**

- **Backend**: Abre la terminal donde corre `node server.js`
- **Frontend PC**: F12 → Consola
- **Frontend iPhone**: Safari → Develop → iPhone → Consola

### 📝 Notas Importantes

- ⚠️ La IP `192.168.1.42` es específica de tu red actual
- ⚠️ Si cambias de WiFi, necesitas actualizar la IP
- ✅ El sistema detecta automáticamente el entorno (PC vs móvil)
- ✅ No necesitas cambiar nada si te mantienes en la misma red
- ✅ El archivo `.env` se usa como fallback en PC

---

**Última actualización**: Noviembre 16, 2025
**Estado**: ✅ Funcionando correctamente
