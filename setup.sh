#!/bin/bash

# Crear carpeta principal del proyecto
mkdir proyecto-backend && cd proyecto-backend

# Inicializar Node.js
npm init -y

# Crear carpetas base
mkdir src tests config utils

# Archivos principales
touch src/app.js
touch README.md

# Configuración
mkdir config
touch config/db.js
touch config/env.js

# Utils
mkdir utils
touch utils/logger.js
touch utils/helpers.js

# Función para crear un módulo con su estructura
create_module () {
    local module=$1
    mkdir -p src/modules/$module/repositories
    mkdir -p src/modules/$module/models
    touch src/modules/$module/$module.controller.js
    touch src/modules/$module/$module.service.js
    touch src/modules/$module/$module.routes.js
    touch src/modules/$module/repositories/$module.repository.js
    touch src/modules/$module/models/$module.model.js
}

# Crear módulos
create_module users
create_module products
create_module cars
create_module pay