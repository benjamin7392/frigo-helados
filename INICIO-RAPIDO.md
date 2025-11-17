# 🚀 Inicio Rápido - Heladería Frigo

## ✅ TODO CONFIGURADO Y FUNCIONANDO

La aplicación está 100% configurada para funcionar en PC y celular.

---

## 📱 Para Usar en tu iPhone AHORA MISMO

### Método 1: PWA (MÁS FÁCIL - Sin necesidad de Mac)

1. **Abre Safari en tu iPhone**
2. **Ve a**: `http://192.168.1.42:5173`
3. **Toca** el botón de compartir (cuadrado con flecha arriba)
4. **Selecciona** "Agregar a pantalla de inicio"
5. **¡Listo!** La app aparece como nativa en tu pantalla

**Ventajas:**
- ✅ No necesitas Mac ni Xcode
- ✅ Funciona offline
- ✅ Actualizaciones instantáneas con live reload
- ✅ Pantalla completa sin navegador

---

## 💻 Iniciar los Servidores

### Opción 1: Automático (Recomendado)
**Doble clic en**: `iniciar-servidores.bat`

### Opción 2: Manual

**Terminal 1:**
```powershell
cd C:\Users\Benjamin\frigo-helados\backend
node server.js
```

**Terminal 2:**
```powershell
cd C:\Users\Benjamin\frigo-helados\frontend
npm run dev:mobile
```

---

## 🌐 URLs

- **PC**: http://localhost:5173
- **iPhone**: http://192.168.1.42:5173
- **Backend API**: http://192.168.1.42:4000

---

## 🔐 Usuarios

- **Admin**: `admin@frigo.com` / `123456`
- **Vendedor**: `vendedor@frigo.com` / `123456`

---

## 🔄 Actualizar la App Móvil

Cada vez que hagas cambios en el código:

```powershell
cd C:\Users\Benjamin\frigo-helados\frontend
npm run build:sync
```

Esto actualiza automáticamente iOS y Android.

---

## ⚠️ Si Cambias de WiFi

Si tu IP cambia, edita estos 2 archivos:

**1. `frontend/src/services/api.js` - Línea 18:**
```javascript
finalUrl = 'http://TU_NUEVA_IP:4000/api';
```

**2. `frontend/capacitor.config.json` - Línea 5:**
```json
"url": "http://TU_NUEVA_IP:5173"
```

Luego ejecuta:
```powershell
cd frontend
npm run build:sync
```

---

## 🧪 Verificar que Todo Funciona

1. **Inicia los servidores** (doble clic en `iniciar-servidores.bat`)
2. **Abre la app en tu iPhone**
3. **Toca el botón verde**: "🧪 Probar Conexión al Servidor"
4. **Debe decir**: ✅ Conexión OK
5. **Inicia sesión** con `admin@frigo.com` / `123456`

---

## 📚 Documentación Completa

- **Configuración de Red**: [CONFIGURACION-RED.md](./CONFIGURACION-RED.md)
- **API Completa**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Guía iOS**: [GUIA-iOS.md](./GUIA-iOS.md)
- **Guía Android**: [GUIA-APK.md](./GUIA-APK.md)
- **README Principal**: [README.md](./README.md)

---

## 💡 Tips

- ✅ **La detección de entorno es automática** - No necesitas cambiar nada
- ✅ **Live reload funciona en el celular** - Los cambios se ven instantáneamente
- ✅ **PWA funciona offline** - Puedes trabajar sin internet
- ✅ **Logs detallados** - Abre la consola del navegador para debugging

---

**¡Todo está listo para usar!** 🎉
