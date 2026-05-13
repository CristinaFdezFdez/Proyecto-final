# 🌍 ViajaMás

ViajaMás es una plataforma web desarrollada como proyecto intermodular para **2º DAW**, cuyo objetivo es ayudar a los viajeros a descubrir destinos, compartir experiencias y planificar actividades turísticas.

El proyecto está desarrollado con una **arquitectura cliente-servidor**, utilizando **Node.js y Express** en el backend, **MongoDB** como base de datos, un **frontend clásico en HTML, CSS y JavaScript** y una **interfaz de experiencias construida en React**.

---

## ✅ Funcionalidades implementadas

- 🔐 Registro de usuarios con contraseña cifrada (bcrypt)
- 🔑 Inicio de sesión con autenticación JWT (token de 24h)
- 🌐 Listado de destinos cargado desde MongoDB
- 🔍 Filtros por nombre, moneda e idioma (query params)
- 🖼️ Modal de imágenes con navegación por teclado y botones anterior/siguiente
- ✍️ Muro de experiencias con comentarios, valoración por estrellas y fecha (requiere sesión)
- 📸 Subida de imágenes a Cloudinary en el muro de experiencias
- 💬 Chat en tiempo real con Socket.io (solo usuarios autenticados)
- 🎨 Diseño responsive con efecto parallax y blur para usuarios no autenticados
- 🏗️ Backend estructurado con patrón MVC (models / controllers / routes)
- 🔒 Variables sensibles protegidas con `.env` y `.gitignore`
- ⚙️ Frontend de experiencias migrado a React con Hooks (useState, useEffect)

---

## 🎬 Demostración en Vídeo

Haz clic en la imagen para ver el funcionamiento de la plataforma en YouTube:

[![Ver Video Demostrativo - ViajaMás](https://img.youtube.com/vi/tngbXSjh5iU/0.jpg)](https://www.youtube.com/watch?v=tngbXSjh5iU)

---

## 🚧 Próximas mejoras planificadas

- Completar migración del frontend a React + React Router
- Sistema de tours y reservas
- Pasarela de pago
- Más filtros y ordenamiento
- Despliegue en producción (Render / Railway + MongoDB Atlas)

---

## 🧱 Tecnologías utilizadas

### Backend
- **Node.js** + **Express**
- **MongoDB** (driver nativo)
- **JWT** — jsonwebtoken
- **bcryptjs**
- **Socket.io**
- **Cloudinary** + multer + multer-storage-cloudinary
- **dotenv** · **cors**

### Frontend
- HTML5 · CSS3 · JavaScript (Fetch API)
- **React** (Vite) — módulo de experiencias

### Herramientas
- Postman — pruebas de API
- Git & GitHub
- Visual Studio Code
- Figma — diseño y prototipado

---

## 🗂️ Estructura del proyecto

```
Proyecto-final/
├── backend/
│   ├── controllers/
│   │   ├── usuario.js
│   │   ├── destino.js
│   │   └── comentario.js
│   ├── routes/
│   │   ├── usuario.js
│   │   ├── destino.js
│   │   └── comentario.js
│   ├── models/
│   │   └── db.js
│   ├── server.js
│   └── package.json
├── experiencias-react/      ← módulo React
├── dist-react/              ← build de producción React
├── js/                      ← lógica frontend clásico
├── pages/                   ← páginas HTML
├── imagenes/
├── videos/
├── index.html
└── styles.css
```

---

## 🗄️ Base de datos — MongoDB

Base de datos: `viajaMas`

| Colección | Campos principales |
|---|---|
| `usuarios` | nombre, email, password (hash) |
| `destinos` | nombre, país, descripción, imagen (Cloudinary), moneda, idioma |
| `comentarios` | nombre (del token), destino, comentario, estrellas, fecha, imagen |
| `tours` | *(planificada)* |

---

## 🔐 Autenticación y seguridad

- Registro y login mediante **JWT**
- Contraseñas cifradas con **bcrypt**
- El token se guarda en `localStorage` y se envía en la cabecera `Authorization`
- El nombre del autor se extrae del **token en el servidor** (nunca del formulario)
- Credenciales protegidas con `.env` excluido del repositorio vía `.gitignore`
- El chat y las experiencias son accesibles **solo para usuarios autenticados**

---

## 🌐 Endpoints principales

### Usuarios
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/usuarios/registro` | Crea un nuevo usuario |
| POST | `/usuarios/login` | Login — devuelve token JWT |

### Destinos
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/destinos` | Lista todos los destinos |
| GET | `/destinos?nombre=X` | Filtra por nombre |
| GET | `/destinos?moneda=X` | Filtra por moneda |
| GET | `/destinos?idioma=X` | Filtra por idioma |

### Comentarios
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/comentarios` | Lista todas las experiencias |
| POST | `/comentarios` | Publica una experiencia *(requiere JWT)* |

---

## 🚀 Instrucciones de despliegue local

### Requisitos
- Node.js instalado
- MongoDB corriendo en local (`mongodb://localhost:27017`)

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/CristinaFdezFdez/Proyecto-final.git

# 2. Entra en el backend e instala dependencias
cd Proyecto-final/backend
npm install

# 3. Crea el archivo .env con tus claves
# Ejemplo de contenido:
# JWT_SECRET=tu_clave_secreta
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
# CLOUDINARY_API_SECRET=...

# 4. Arranca el servidor
npm run dev

# 5. Abre index.html con Live Server o en el navegador
#    Asegúrate de que los fetch apuntan a http://localhost:3000
```

---

## 👩‍💻 Autora

**Cristina Fernández Fernández**  
2º DAW — Proyecto Intermodular · 2025/2026
