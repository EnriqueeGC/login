# CRUD de Usuarios con Autenticación

Este proyecto es un CRUD de registro de usuarios y autenticación usando Node.js, JWT y bcrypt. El código es modular y sigue buenas prácticas de seguridad.

## Características
- Registro de usuarios con cifrado de contraseña (bcrypt)
- Autenticación con JWT
- Endpoints para crear, leer, actualizar y eliminar usuarios
- Código modular

## Instalación
1. Clona el repositorio o descarga el código.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con la variable `JWT_SECRET`.
4. Inicia el servidor:
   ```bash
   npm start
   ```

## Endpoints
- `POST /api/register` — Registro de usuario
- `POST /api/login` — Autenticación
- `GET /api/users` — Listar usuarios (requiere JWT)
- `GET /api/users/:id` — Obtener usuario por ID (requiere JWT)
- `PUT /api/users/:id` — Actualizar usuario (requiere JWT)
- `DELETE /api/users/:id` — Eliminar usuario (requiere JWT)

## Estructura de Carpetas
- `controllers/` — Lógica de negocio
- `models/` — Modelos de datos
- `routes/` — Definición de rutas
- `middleware/` — Middlewares (autenticación, validación)
- `utils/` — Utilidades (ej: helpers de JWT)

## Notas
- Cambia el secreto JWT en producción.
- Este proyecto es solo un ejemplo educativo.
