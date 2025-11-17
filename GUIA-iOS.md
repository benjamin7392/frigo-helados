# 📱 Guía Completa - APP iOS de Heladería Frigo

## ✅ CAPACITOR CONFIGURADO PARA iOS

### 🎯 Lo que se ha hecho:

1. **Capacitor instalado** con soporte iOS
2. **Proyecto Xcode creado** en `frontend/ios/`
3. **Configuración con live reload** para desarrollo
4. **Build de producción** ya generado
5. **PWA con service worker** funcionando

---

## 📱 INSTALAR EN TU iPhone (OPCIÓN MÁS FÁCIL)

### Método 1: TestFlight (Recomendado para distribución)

**Requisitos:**
- Cuenta de Apple Developer ($99/año)
- Mac con Xcode instalado

**Pasos:**

1. **Transferir el proyecto a tu Mac:**
   - Copia la carpeta `frontend/ios` a tu Mac
   - O sube todo el proyecto a GitHub y clónalo en el Mac

2. **Abrir en Xcode (en el Mac):**
   ```bash
   cd frontend
   npx cap open ios
   ```

3. **Configurar el proyecto:**
   - Conecta tu Apple ID en Xcode
   - Selecciona tu equipo en "Signing & Capabilities"
   - Cambia el Bundle ID si es necesario

4. **Compilar y ejecutar:**
   - Conecta tu iPhone por cable
   - Selecciona tu iPhone en la barra superior
   - Click en el botón ▶️ (Run)
   - En tu iPhone: Settings → General → Device Management → Confiar en desarrollador

---

### Método 2: PWA Nativa (SIN NECESIDAD DE MAC)

Como ya tienes la PWA configurada, puedes instalarla directamente:

1. **En tu iPhone, abre Safari** (no Chrome)

2. **Ve a:** `http://192.168.1.42:5173`

3. **Toca el botón de compartir** 📤 (abajo en el centro)

4. **Desplázate y toca:** "Agregar a pantalla de inicio"

5. **Toca "Agregar"**

**Ventajas:**
- ✅ No necesitas Mac ni Xcode
- ✅ Funciona como app nativa
- ✅ Live reload automático durante desarrollo
- ✅ Se actualiza sola cuando cambias el código

---

## 🔄 DESARROLLO CON LIVE RELOAD

### Iniciar servidores:

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

Ahora cualquier cambio en el código se verá inmediatamente en tu iPhone.

---

## 🍎 SI TIENES MAC - Compilar IPA

### 1. Instalar dependencias en Mac:

```bash
# Instalar CocoaPods
sudo gem install cocoapods

# Navegar al proyecto
cd frontend/ios/App
pod install
```

### 2. Abrir proyecto:

```bash
cd frontend
npx cap open ios
```

### 3. En Xcode:

**Para desarrollo (instalar en tu iPhone):**
1. Product → Destination → Tu iPhone
2. Product → Run (⌘R)

**Para distribución (generar IPA):**
1. Product → Archive
2. Distribute App → Development
3. Selecciona tu método de distribución
4. El IPA se guardará en una carpeta

---

## 📦 ARCHIVOS DEL PROYECTO iOS

```
frontend/ios/
├── App/
│   ├── App/
│   │   ├── public/          # Tu app web compilada
│   │   ├── capacitor.config.json
│   │   └── Info.plist       # Configuración de la app
│   └── App.xcodeproj        # Proyecto Xcode
└── App.xcworkspace          # Abre este en Xcode
```

---

## ⚙️ CONFIGURACIÓN ACTUAL

**Configuración en** `capacitor.config.json`:
```json
{
  "server": {
    "url": "http://192.168.1.42:5173",
    "cleartext": true
  }
}
```

**Esto significa:**
- ✅ La app se conecta a tu PC automáticamente
- ✅ Live reload durante desarrollo
- ✅ No necesitas recompilar cada vez que cambias código

---

## 🚀 PARA PRODUCCIÓN (Cuando esté lista)

1. **Cambiar la configuración:**
   - Quitar la URL del servidor de `capacitor.config.json`
   - La app usará los archivos internos

2. **Compilar:**
   ```bash
   npm run build
   npx cap sync ios
   ```

3. **Distribuir:**
   - TestFlight para beta testing
   - App Store para distribución pública

---

## 💡 RECOMENDACIONES

**Para ahora (desarrollo):**
- Usa la **PWA en Safari** (método más fácil sin Mac)
- Funciona exactamente igual que una app nativa
- Live reload automático

**Para después (producción):**
- Si quieres subirla a App Store, necesitarás:
  - Mac con Xcode
  - Apple Developer Account ($99/año)
  - Seguir proceso de revisión de Apple

**Alternativa sin Mac:**
- Usa servicios como **Ionic Appflow** o **Expo EAS** para compilar en la nube
- Te generan el IPA sin necesidad de Mac

---

## 📝 PRÓXIMOS PASOS

1. **AHORA:** Instalar como PWA en Safari (el método más fácil)
2. **Si tienes Mac:** Abrir proyecto en Xcode y compilar
3. **Si no tienes Mac:** Seguir usando PWA o usar servicio de compilación en nube

---

## 🆘 SOLUCIÓN DE PROBLEMAS

**Si la PWA no funciona:**
- Asegúrate de estar en la misma WiFi
- Usa Safari (no Chrome)
- Backend debe estar corriendo

**Si necesitas compilar IPA:**
- Transfiere el proyecto a un Mac
- O usa un servicio de compilación en nube

---

¡Tu app iOS está lista para instalar! 🎉

**La forma más rápida:** Abre Safari en tu iPhone → `http://192.168.1.42:5173` → Agregar a inicio
