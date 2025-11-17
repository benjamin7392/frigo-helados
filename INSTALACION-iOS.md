# 📱 Guía de Instalación en iOS (iPhone/iPad)

## ✅ Requisitos Previos
- iPhone/iPad con iOS 11.3 o superior
- Safari (navegador nativo de iOS)
- Computadora y teléfono en la **misma red WiFi**

---

## 📋 PASO A PASO

### **1. Obtener la IP de tu computadora**

En tu computadora Windows, abre PowerShell y ejecuta:
```powershell
ipconfig
```

Busca tu **Dirección IPv4** (ejemplo: `192.168.1.10`)

---

### **2. Configurar el frontend para red local**

En el archivo `frontend\.env.network`, reemplaza la IP con la tuya:
```
VITE_API_URL=http://TU_IP_AQUI:4000/api
```

Por ejemplo:
```
VITE_API_URL=http://192.168.1.10:4000/api
```

---

### **3. Iniciar los servidores**

**Terminal 1 - Backend:**
```powershell
cd backend
node server.js
```

**Terminal 2 - Frontend (modo red):**
```powershell
cd frontend
npm run dev -- --host
```

Verás algo como:
```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.10:5173/
```

---

### **4. Abrir en el iPhone**

En Safari del iPhone, escribe la URL de red:
```
http://TU_IP:5173
```

Ejemplo: `http://192.168.1.10:5173`

---

### **5. Instalar como App**

En Safari del iPhone:

1. **Toca el botón de compartir** (cuadrado con flecha hacia arriba) en la barra inferior
2. **Desplázate y toca** "Agregar a pantalla de inicio" o "Add to Home Screen"
3. **Edita el nombre** si quieres (ej: "Frigo")
4. **Toca "Agregar"**

¡Listo! La app aparecerá en tu pantalla de inicio como una app nativa.

---

### **6. Instalar en teléfonos de empleados**

Repite el paso 4 y 5 en cada iPhone. Solo necesitas:
- Estar en la misma WiFi
- Abrir Safari
- Ir a `http://TU_IP:5173`
- Agregar a pantalla de inicio

---

## 🔥 Comandos Rápidos

### Obtener tu IP:
```powershell
ipconfig | Select-String "IPv4"
```

### Iniciar todo (después de configurar IP):
```powershell
# Terminal 1
cd backend; node server.js

# Terminal 2
cd frontend; npm run dev -- --host
```

---

## ⚠️ Solución de Problemas

### ❌ No puedo acceder desde el celular
- Verifica que ambos estén en la misma WiFi
- Desactiva el firewall temporalmente en Windows
- Verifica que la IP sea la correcta con `ipconfig`

### ❌ Error de conexión al API
- Confirma que el backend esté corriendo (puerto 4000)
- Verifica el archivo `.env.network` con la IP correcta
- Reinicia el frontend con `--host`

### ❌ No aparece el botón "Agregar a pantalla de inicio"
- Usa **Safari** (no Chrome ni otros navegadores)
- Asegúrate de estar en la URL correcta
- Actualiza iOS si es muy antiguo

---

## 📊 Verificación

**Backend corriendo:** http://TU_IP:4000 (debe decir "API Heladería Frigo funcionando")

**Frontend corriendo:** http://TU_IP:5173 (debe mostrar el login)

**App instalada:** Icono en pantalla de inicio, abre en pantalla completa

---

## 🎯 Credenciales de Prueba

**Administrador:**
- Email: admin@frigo.com
- Password: 123456

**Vendedor:**
- Email: vendedor@frigo.com
- Password: 123456

---

## 💡 Tips

- La app funciona **offline** después de cargar una vez (gracias al Service Worker)
- Los empleados pueden agregar accesos directos personalizados
- Puedes cambiar el nombre del negocio en **Configuración** (solo admin)
- Para actualizar la app, los usuarios deben "refrescar" en Safari y reinstalar

---

¡Ya está lista para usar en todos los iPhones! 🎉
