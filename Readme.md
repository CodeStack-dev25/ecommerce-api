# 🛒 E-commerce API

API genérica para un sistema de E-commerce, desarrollada con **Node.js**, **Express.js** y **MongoDB** siguiendo una arquitectura modular con **Repository Pattern**.

## 🚀 Tecnologías

- **Node.js** + **Express.js** → Backend y manejo de rutas.
- **MongoDB + Mongoose** → Base de datos NoSQL.
- **Repository Pattern** → Separación de lógica de negocio y acceso a datos.
- **JWT** → Autenticación y autorización.
- **Cloudinary** → Gestión de imágenes de productos.

## ⚙️ Instalación

# Clonar el repositorio
git clone https://github.com/CodeStack-dev25/ecommerce-api.git

# Entrar al proyecto
cd ecommerce_api

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env

# Desarrollo
npm run dev

# Producción
npm run build
npm start

## 📌 Endpoints Principales

# 🔐 Autenticación

- POST /api/auth/register → Registrar usuario

- POST /api/auth/login → Iniciar sesión

# 👤 Usuarios

- GET /api/users → Listar usuarios (admin)

- GET /api/users/:id → Obtener usuario por ID

- PUT /api/users/:id → Actualizar usuario

- DELETE /api/users/:id → Eliminar usuario

# 🛍️ Productos

- GET /api/products → Listar productos

- GET /api/products/:id → Ver detalle de producto

- POST /api/products → Crear producto (admin)

- PUT /api/products/:id → Actualizar producto

- DELETE /api/products/:id → Eliminar producto

# 📦 Pedidos

- POST /api/orders → Crear pedido

- GET /api/orders/:id → Obtener detalle de pedido

- GET /api/orders/user/:userId → Listar pedidos de un usuario

- PUT /api/orders/:id → Actualizar estado de pedido

# 💳 Pagos

- POST /api/payments/checkout → Procesar pago

- GET /api/payments/status/:id → Estado del pago

 # 🏗️ Arquitectura

- Models → Definen la estructura de los datos (Mongoose Schemas).

- Repositories → Acceso a base de datos, CRUD básico.

- Services → Lógica de negocio, validaciones y procesos.

- Controllers → Reciben la request, llaman a services y devuelven la response.

- Routes → Definen las rutas de cada módulo.