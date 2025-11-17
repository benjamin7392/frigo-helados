# 🍦 Heladería Frigo - Sistema de Gestión Completo

Sistema completo de gestión para heladería con punto de venta, control de stock, ventas y administración. **PWA instalable en móviles y tablets.**

## 🚀 Características Principales

### Productos
- ✅ Gestión completa por categorías reales: Vasitos, Conos (1-3 bochas), Cucuruchones, Kilos, Palitos, Bombones, Promos
- ✅ Control de stock en tiempo real con alertas automáticas
- ✅ Edición completa desde la interfaz (crear, editar, eliminar)
- ✅ Organización visual por categorías con iconos

### Ventas (POS)
- ✅ Sistema de punto de venta intuitivo con carrito
- ✅ Múltiples métodos de pago (efectivo, tarjeta, transferencia)
- ✅ Historial completo de ventas
- ✅ Cancelación con devolución automática de stock

### Dashboard
- ✅ Estadísticas en tiempo real (ventas del día, ingresos, ticket promedio)
- ✅ Gráficos interactivos (ventas últimos 7 días, distribución por método de pago)
- ✅ Alertas de stock bajo
- ✅ Últimas ventas registradas

### Configuración Editable
- ✅ **Personalización total desde la interfaz:**
  - Nombre del negocio, slogan, dirección, teléfono
  - Colores de marca (primario, secundario, fondo)
  - Horarios de atención
  - Configuración de impresora
  - Notificaciones personalizables

### PWA (Progressive Web App)
- ✅ **Instalable en móviles y tablets como app nativa**
- ✅ Funciona offline con cache inteligente
- ✅ Pantalla completa sin navegador
- ✅ Iconos y splash screen personalizados
- ✅ Optimizado para punto de venta móvil

## 🛠️ Stack Tecnológico

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT + bcryptjs
- Transacciones para operaciones críticas

### Frontend
- React 19 + Vite 7
- TailwindCSS 3
- React Router DOM
- Axios
- Recharts (gráficos)
- Lucide React (iconos)
- React Hot Toast
- Vite PWA Plugin

## 📁 Estructura del Proyecto

```
frigo-helados/
├── backend/
│   ├── controllers/          # Lógica de negocio
│   │   ├── usuarioController.js
│   │   ├── productoController.js
│   │   ├── ventaController.js
│   │   └── movimientoStockController.js
│   ├── middleware/           # Middleware de autenticación
│   │   └── authMiddleware.js
│   ├── models/              # Modelos de datos
│   │   ├── Usuario.js
│   │   ├── Producto.js
│   │   ├── Venta.js
│   │   └── MovimientoStock.js
│   ├── routes/              # Rutas API
│   │   ├── usuarioRoutes.js
│   │   ├── productoRoutes.js
│   │   ├── ventaRoutes.js
│   │   └── movimientoStockRoutes.js
│   ├── .env                 # Variables de entorno
│   ├── server.js            # Punto de entrada
│   └── poblarDB.js          # Script de datos de prueba
├── api-tests.http           # Tests de API (REST Client)
├── API_DOCUMENTATION.md     # Documentación completa de la API
├── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### 1. Prerrequisitos

- Node.js (v16 o superior)
- MongoDB (instalado y corriendo)
- Git

### 2. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd frigo-helados
```

### 3. Instalar dependencias

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 4. Configurar variables de entorno

**Backend** (`backend/.env`):
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/heladeria-frigo
JWT_SECRET=clave_super_secreta
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://192.168.1.42:4000/api
```

### 5. Iniciar MongoDB

```powershell
# Windows - Ejecutar como Administrador
net start MongoDB
```

### 6. Poblar la base de datos

```bash
cd backend
node poblarProductosReales.js
```

Esto creará:
- 2 usuarios (admin y vendedor)
- 21 productos reales de heladería

**Credenciales de prueba:**
- Admin: `admin@frigo.com` / `123456`
- Vendedor: `vendedor@frigo.com` / `123456`

### 7. Iniciar los servidores

#### Opción 1: Script automático (Windows)
```bash
# Doble clic en el archivo
iniciar-servidores.bat
```

#### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev:mobile
```

### 8. Acceder a la aplicación

- **PC**: http://localhost:5173
- **Celular**: http://192.168.1.42:5173
- **API**: http://192.168.1.42:4000

### 9. Instalar en iPhone/Android

**Opción A: PWA (Sin necesidad de Mac)**
1. Abre Safari en tu iPhone
2. Ve a: http://192.168.1.42:5173
3. Toca botón compartir → "Agregar a pantalla de inicio"
4. ¡Funciona como app nativa!

**Opción B: App Nativa**
Ver guías:
- iOS: [GUIA-iOS.md](./GUIA-iOS.md)
- Android: [GUIA-APK.md](./GUIA-APK.md)

## 📡 Endpoints Principales

### Autenticación
- `POST /api/usuarios/registro` - Registrar usuario
- `POST /api/usuarios/login` - Iniciar sesión
- `GET /api/usuarios/perfil` - Obtener perfil (requiere auth)

### Productos
- `GET /api/productos` - Listar productos
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `POST /api/productos/:id/ajustar-stock` - Ajustar stock
- `GET /api/productos/stock-bajo` - Productos con stock bajo

### Ventas
- `POST /api/ventas` - Crear venta
- `GET /api/ventas` - Listar ventas
- `GET /api/ventas/reportes/resumen` - Reporte de ventas
- `PUT /api/ventas/:id/cancelar` - Cancelar venta

### Movimientos de Stock
- `GET /api/movimientos-stock` - Historial de movimientos
- `GET /api/movimientos-stock/producto/:id` - Movimientos por producto
- `GET /api/movimientos-stock/estadisticas` - Estadísticas

Ver documentación completa en [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🧪 Probar la API

### Opción 1: REST Client (VS Code)

1. Instalar extensión "REST Client" en VS Code
2. Abrir archivo `api-tests.http`
3. Hacer clic en "Send Request" sobre cada endpoint

### Opción 2: Thunder Client (VS Code)

1. Instalar extensión "Thunder Client"
2. Importar los endpoints desde `api-tests.http`

### Opción 3: Postman

1. Importar la documentación de `API_DOCUMENTATION.md`
2. Configurar el token JWT en Authorization

## 📊 Flujo de Trabajo

### 1. Autenticación
```bash
POST /api/usuarios/login
{
  "email": "admin@frigo.com",
  "password": "123456"
}
```

Guarda el `token` recibido para las siguientes peticiones.

### 2. Listar Productos
```bash
GET /api/productos
Authorization: Bearer <tu_token>
```

### 3. Crear Venta
```bash
POST /api/ventas
Authorization: Bearer <tu_token>
{
  "productos": [
    { "producto": "ID_PRODUCTO", "cantidad": 2 }
  ],
  "metodoPago": "efectivo"
}
```

El sistema automáticamente:
- ✅ Reduce el stock
- ✅ Registra movimientos de stock
- ✅ Calcula el total

## 🔐 Roles y Permisos

### Admin
- ✅ Gestión completa de usuarios
- ✅ Gestión de productos
- ✅ Crear y cancelar ventas
- ✅ Acceso a todos los reportes

### Vendedor
- ✅ Ver productos
- ✅ Crear ventas
- ✅ Ver reportes básicos
- ❌ No puede gestionar usuarios

## 📈 Próximas Funcionalidades

- [ ] Frontend React con dashboard
- [ ] Gráficos de ventas
- [ ] Sistema de clientes
- [ ] Historial de compras por cliente
- [ ] Exportar reportes a PDF/Excel
- [ ] Notificaciones de stock bajo
- [ ] Sistema de turnos de vendedores

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Scripts Disponibles

### Backend
```bash
cd backend
node server.js              # Iniciar servidor
node poblarProductosReales.js  # Poblar base de datos
```

### Frontend
```bash
cd frontend
npm run dev                 # Desarrollo local
npm run dev:mobile          # Con acceso de red (--host)
npm run build               # Build de producción
npm run build:sync          # Build + sincronizar Capacitor
npm run sync                # Sincronizar con iOS y Android
npm run sync:ios            # Sincronizar solo iOS
npm run sync:android        # Sincronizar solo Android
```

### Script Automático (Windows)
```bash
iniciar-servidores.bat      # Inicia backend + frontend
```

## 🐛 Solución de Problemas

### MongoDB no se conecta
```bash
# Verificar que MongoDB esté corriendo
net start MongoDB
```

### Puerto 4000 ocupado
Cambiar el puerto en `backend/.env`:
```env
PORT=5000
```

### Error de autenticación
Verificar que el token JWT esté en el header:
```
Authorization: Bearer <tu_token>
```

## 📄 Licencia

ISC

## 👨‍💻 Autor

Benjamin

---

**¿Necesitas ayuda?** Revisa la [documentación completa de la API](./API_DOCUMENTATION.md)
