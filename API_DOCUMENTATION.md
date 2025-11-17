# API Heladería Frigo - Documentación de Endpoints

## Base URL
```
http://localhost:4000/api
```

## 🔐 Autenticación
Todas las rutas (excepto login y registro) requieren un token JWT en el header:
```
Authorization: Bearer <tu_token_aqui>
```

---

## 👤 USUARIOS

### Registrar Usuario
```
POST /api/usuarios/registro
Content-Type: application/json

{
  "nombre": "Admin Principal",
  "email": "admin@frigo.com",
  "password": "123456",
  "rol": "admin"
}
```

### Login
```
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "admin@frigo.com",
  "password": "123456"
}

Respuesta:
{
  "_id": "...",
  "nombre": "Admin Principal",
  "email": "admin@frigo.com",
  "rol": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Obtener Perfil
```
GET /api/usuarios/perfil
Authorization: Bearer <token>
```

### Listar Usuarios (Solo Admin)
```
GET /api/usuarios
Authorization: Bearer <token>
```

---

## 🍦 PRODUCTOS

### Crear Producto
```
POST /api/productos
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Dulce de Leche",
  "tipo": "helado",
  "sabor": "Dulce de Leche",
  "categoria": "crema",
  "precio": 2500,
  "stock": 50,
  "unidadMedida": "kg",
  "stockMinimo": 10,
  "descripcion": "Helado artesanal de dulce de leche"
}
```

### Listar Productos
```
GET /api/productos
Authorization: Bearer <token>

# Filtrar por tipo
GET /api/productos?tipo=helado

# Filtrar activos
GET /api/productos?activo=true
```

### Obtener Producto por ID
```
GET /api/productos/:id
Authorization: Bearer <token>
```

### Actualizar Producto
```
PUT /api/productos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "precio": 2800,
  "stock": 45
}
```

### Ajustar Stock
```
POST /api/productos/:id/ajustar-stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "cantidad": 10,
  "motivo": "compra",
  "notas": "Reposición semanal"
}

# Para reducir stock usar cantidad negativa:
{
  "cantidad": -5,
  "motivo": "merma",
  "notas": "Producto vencido"
}
```

### Productos con Stock Bajo
```
GET /api/productos/stock-bajo
Authorization: Bearer <token>
```

### Eliminar (Desactivar) Producto
```
DELETE /api/productos/:id
Authorization: Bearer <token>
```

---

## 💰 VENTAS

### Crear Venta
```
POST /api/ventas
Authorization: Bearer <token>
Content-Type: application/json

{
  "productos": [
    {
      "producto": "6752abc123def456789",
      "cantidad": 2
    },
    {
      "producto": "6752abc123def456790",
      "cantidad": 1
    }
  ],
  "metodoPago": "efectivo",
  "cliente": "Juan Pérez",
  "notas": "Cliente frecuente"
}
```

### Listar Ventas
```
GET /api/ventas
Authorization: Bearer <token>

# Filtrar por estado
GET /api/ventas?estado=completada

# Filtrar por vendedor
GET /api/ventas?vendedor=6752abc123def456789

# Filtrar por rango de fechas
GET /api/ventas?fechaInicio=2025-11-01&fechaFin=2025-11-15
```

### Obtener Venta por ID
```
GET /api/ventas/:id
Authorization: Bearer <token>
```

### Cancelar Venta
```
PUT /api/ventas/:id/cancelar
Authorization: Bearer <token>
```

### Reporte de Ventas
```
GET /api/ventas/reportes/resumen
Authorization: Bearer <token>

# Con rango de fechas
GET /api/ventas/reportes/resumen?fechaInicio=2025-11-01&fechaFin=2025-11-15

Respuesta:
{
  "totalVentas": 45,
  "totalIngresos": 125000,
  "promedioVenta": 2777.78,
  "ventasPorMetodo": {
    "efectivo": 30,
    "tarjeta": 12,
    "transferencia": 3
  }
}
```

---

## 📦 MOVIMIENTOS DE STOCK

### Listar Movimientos
```
GET /api/movimientos-stock
Authorization: Bearer <token>

# Filtrar por producto
GET /api/movimientos-stock?producto=6752abc123def456789

# Filtrar por tipo
GET /api/movimientos-stock?tipo=entrada

# Filtrar por motivo
GET /api/movimientos-stock?motivo=venta

# Filtrar por fechas
GET /api/movimientos-stock?fechaInicio=2025-11-01&fechaFin=2025-11-15
```

### Movimientos de un Producto
```
GET /api/movimientos-stock/producto/:id
Authorization: Bearer <token>
```

### Estadísticas de Movimientos
```
GET /api/movimientos-stock/estadisticas
Authorization: Bearer <token>

# Con rango de fechas
GET /api/movimientos-stock/estadisticas?fechaInicio=2025-11-01&fechaFin=2025-11-15
```

---

## 📝 Ejemplos de Flujo Completo

### 1. Registro e Inicio de Sesión
1. Registrar usuario admin
2. Login y guardar el token
3. Usar el token en todas las peticiones siguientes

### 2. Crear Productos
1. Crear helado de dulce de leche
2. Crear helado de chocolate
3. Crear conos (insumo)

### 3. Realizar Venta
1. Crear venta con 2 productos
2. El sistema reduce automáticamente el stock
3. Se registra el movimiento de stock

### 4. Ver Reportes
1. Consultar ventas del día
2. Ver productos con stock bajo
3. Revisar estadísticas de movimientos

---

## ⚠️ Códigos de Estado
- `200` - OK
- `201` - Creado
- `400` - Error de validación
- `401` - No autorizado
- `403` - Prohibido (sin permisos)
- `404` - No encontrado
- `500` - Error del servidor

---

## 🔑 Tipos de Datos

### Tipos de Producto
- `helado`
- `insumo`
- `otro`

### Categorías
- `crema`
- `agua`
- `premium`
- `especial`
- `insumo`

### Unidades de Medida
- `kg`
- `litros`
- `unidades`

### Métodos de Pago
- `efectivo`
- `tarjeta`
- `transferencia`
- `otro`

### Roles de Usuario
- `admin`
- `vendedor`

### Tipos de Movimiento
- `entrada`
- `salida`
- `ajuste`

### Motivos de Movimiento
- `compra`
- `venta`
- `merma`
- `ajuste`
- `devolucion`
- `produccion`
