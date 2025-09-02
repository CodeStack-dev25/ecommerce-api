import { appLogger } from "../utils/logger.js"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import env from "../config/env.js"

// ------------------------
// Logger
// ------------------------
function requestLogger(req, res, next) {
  appLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

// ------------------------
// Autenticación JWT
// ------------------------
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

// ------------------------
// Rate Limiting
// ------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes, intenta más tarde",
});

// ------------------------
// Manejo de errores
// ------------------------
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Ocurrió un error en el servidor" });
}

// ------------------------
// Seguridad y performance
// ------------------------
const securityMiddlewares = [
  helmet(),
  compression(),
  cors(),
];

// ------------------------
// Validaciones
// ------------------------

// Usuarios
const validateRegister = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Contraseña obligatoria"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Productos
const validateProduct = [
  body("title").notEmpty().withMessage("El titulo es obligatorio"),
  body("price").isNumeric().withMessage("El precio debe ser un número"),
  body("stock").isInt({ min: 0 }).withMessage("El stock debe ser un entero positivo"),
  body("category").notEmpty().withMessage("La categoría es obligatoria"),
  body("subCategory").optional().isString().withMessage("La subcategoría debe ser una cadena de texto"),
  body("code").notEmpty().withMessage("El código es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Carrito
const validateCartItem = [
  body("productId").notEmpty().withMessage("ID del producto es obligatorio"),
  body("quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser al menos 1"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Checkout / Ordenes
const validateOrder = [
  body("cartItems").isArray({ min: 1 }).withMessage("El carrito no puede estar vacío"),
  body("paymentMethod").notEmpty().withMessage("Debe seleccionar un método de pago"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];


export default{
  requestL: requestLogger,
  auth: authMiddleware,
  limit: limiter,
  error: errorHandler,
  security: securityMiddlewares,
  register: validateRegister,
  login: validateLogin,
  product: validateProduct,
  cart: validateCartItem,
  order: validateOrder,
};
