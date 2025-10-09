# API E-commerce - CodeStack

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## Descripción

API E-commerce desarrollada para la **gestión integral de productos, pedidos, clientes y configuraciones**.  
Permite:

- 🛍️ **Productos:** CRUD completo de artículos, precios, stock e imágenes asociadas.
- 💳 **Pagos:** Registro de ventas y seguimiento de transacciones.
- ⚙️ **Configuraciones:** Administración de descuentos y ajustes de precios globales.
- 🔐 **Administración:** Login y gestión de sesión de administrador.

> La documentación está en **modo lectura**, evitando la ejecución de endpoints desde el navegador.

---

## Tecnologías

- **Node.js** + **Express**
- **MongoDB** con **Mongoose**
- **Cloudinary** para gestión de imágenes
- **Swagger / OpenAPI** para documentación
- **RapiDoc** para visualización interactiva (solo lectura)
- **CORS**, **cookie-parser**, **express-session** para seguridad y sesiones
- **Winston** para logging

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/api-ecommerce.git
cd api-ecommerce
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno en .env:

```bash
PORT=4000
MONGO_URI=<tu_uri_mongodb>
SECRET=<clave_secreta_para_session>
CLOUD_NAME=<cloudinary_name>
CLOUD_API_KEY=<cloudinary_api_key>
CLOUD_API_SECRET=<cloudinary_api_secret>
ADMIN_TOKEN=<admin_token_access>
MP_ACCESS_TOKEN=<mp_token>
ADMIN_MAIL=<nodemailer_config_mail>
ADMIN_PASS=<nodemailer_config_pass>
URL_FRONT=<url_front>
URL_BACK=<url_back>
JWT_SECRET=<jwt_secret>
```

4. Iniciar la API:

```bash
npm start
npm run dev → Nodemon
```

## Endpoints Principales

# Productos

- GET /products → Listar todos los productos

- POST /products → Crear un producto (con imágenes)

- GET /products/{pid} → Obtener producto por ID

- PUT /products/{pid} → Actualizar producto

- DELETE /products/{pid} → Eliminar producto

# Pagos

- POST /pay/createSale → Crear nueva venta

- POST /pay/webhook → Respuesta de ventas MercadoPago

- POST /pay/uploadReceipt → Cargar comprobantes de pagos por transferencia

- GET /pay → Listar todas las ventas

- PUT /pay/:tid → Actualizar estado de la venta

# Configuración

- GET /settings → Obtener configuración actual

- PUT /settings/discount → Actualizar descuento global

- PUT /settings/increase-prices → Aumentar precios globales

# Administración

- POST /admin/login → Iniciar sesión

- POST /admin/logout → Cerrar sesión

# Documentación

La documentación completa está disponible en:

RapiDoc (modo lectura):
Abrir en el navegador: http://localhost:4000/

Archivo OpenAPI / Swagger:
http://localhost:4000/docs/openapi.json

La documentación está unificada para todos los módulos y evita errores de referencia.

## Ejemplo de Respuesta

# Producto

```bash
{
  "_id": "6705bdf8c3e64a2bfb8dcf10",
  "brand": "Nike",
  "title": "Zapatillas Air Force 1",
  "description": "Zapatillas clásicas de cuero blanco",
  "price": 149.99,
  "category": "Calzado",
  "subCategory": "Deportivas",
  "thumbnails": [
    {
      "url": "https://res.cloudinary.com/demo/image/upload/v12345/producto.jpg",
      "public_id": "products/abc123"
    }
  ],
  "variants": [
    { "color": "Rojo", "size": "42", "stock": 10 }
  ],
  "createdAt": "2025-10-09T12:00:00.000Z",
  "updatedAt": "2025-10-09T12:00:00.000Z"
}
```

## Seguridad

- Autenticación con JWT para endpoints de administración.

- CORS configurado solo para dominios específicos.

- Sesiones almacenadas en MongoDB.

## Autor

- CodeStack – [Portfolio](https://www.codestack-dev.click)

## Licencia

MIT License © 2025 CodeStack