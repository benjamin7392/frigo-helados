# 📱 Guía Completa - APK de Heladería Frigo

## ✅ CAPACITOR INSTALADO Y CONFIGURADO

### 🎯 Lo que se ha hecho:

1. **Capacitor instalado** con soporte para Android e iOS
2. **Proyecto Android creado** en `frontend/android/`
3. **Configuración optimizada** para desarrollo con live reload
4. **Build de producción** generado en `frontend/dist/`
5. **PWA funcionando** con service worker

---

## 📦 GENERAR LA APK

### Opción 1: Usando Android Studio (Recomendado)

1. **Abrir Android Studio**
   
2. **Abrir proyecto:**
   ```
   Archivo > Abrir > Seleccionar carpeta:
   C:\Users\Benjamin\frigo-helados\frontend\android
   ```

3. **Esperar sincronización de Gradle** (primera vez puede tardar 5-10 minutos)

4. **Generar APK:**
   - Menú: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Esperar a que termine
   - Click en "locate" cuando aparezca la notificación
   - La APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

5. **Instalar en celular:**
   - Conecta tu celular por USB
   - Habilita "Depuración USB" en opciones de desarrollador
   - Arrastra el APK al celular o usa: `adb install app-debug.apk`

---

### Opción 2: Desde línea de comandos (más rápido)

```powershell
# En la carpeta frontend/android
cd C:\Users\Benjamin\frigo-helados\frontend\android
.\gradlew assembleDebug
```

APK generada en: `android\app\build\outputs\apk\debug\app-debug.apk`

---

## 🔄 FLUJO DE DESARROLLO CON LIVE RELOAD

### 1. Iniciar servidores (en terminales separadas):

**Terminal 1 - Backend:**
```powershell
cd C:\Users\Benjamin\frigo-helados\backend
node server.js
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\Benjamin\frigo-helados\frontend
npm run dev -- --host
```

### 2. Usar la app instalada en el celular:
- La app se conectará automáticamente a `http://192.168.1.42:5173`
- Cualquier cambio en el código se reflejará inmediatamente
- **NO necesitas recompilar** mientras desarrollas

### 3. Solo recompila cuando:
- Cambies configuración de Capacitor
- Agregues plugins nativos
- Quieras generar APK de producción

---

## 📱 PARA iOS (Si tienes Mac)

```bash
cd frontend
npx cap add ios
npx cap sync ios
npx cap open ios
```

En Xcode:
1. Seleccionar tu equipo de desarrollo
2. Conectar iPhone
3. Product → Archive
4. Distribute App → Development
5. Instalar en iPhone

---

## 🚀 COMANDOS ÚTILES

### Actualizar app después de cambios en código:
```powershell
cd frontend
npm run build
npx cap sync android
```

### Abrir Android Studio directamente:
```powershell
cd frontend
npx cap open android
```

### Ver logs de la app en celular:
```powershell
npx cap run android -l
```

---

## ⚙️ CONFIGURACIÓN ACTUAL

**IP del servidor:** `192.168.1.42`
**Puerto frontend:** `5173`
**Puerto backend:** `4000`

La app está configurada para:
- ✅ Conectarse a tu servidor local automáticamente
- ✅ Funcionar con HTTP (cleartext habilitado)
- ✅ Live reload durante desarrollo
- ✅ PWA con funcionamiento offline
- ✅ Service worker para cache

---

## 🎯 PRÓXIMOS PASOS

1. **Instalar Android Studio** si no lo tienes:
   https://developer.android.com/studio

2. **Generar tu primera APK** siguiendo "Opción 1" arriba

3. **Para producción** (cuando esté todo listo):
   - Cambiar la URL del servidor en `capacitor.config.json`
   - Quitar la configuración de live reload
   - Generar APK firmada (release)
   - Publicar en Google Play Store

---

## 📝 NOTAS IMPORTANTES

- **Durante desarrollo:** La app apunta a `192.168.1.42:5173` (live reload)
- **Ambos dispositivos** deben estar en la misma WiFi
- **Backend debe estar corriendo** en puerto 4000
- **Frontend debe estar corriendo** en puerto 5173 con `--host`

---

¡Tu app está lista para compilar! 🎉
