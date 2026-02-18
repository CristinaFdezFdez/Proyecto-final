# 🌍 ViajaMás

ViajaMás es una plataforma web desarrollada como proyecto intermodular para **2º DAW**, cuyo objetivo es ayudar a los viajeros a descubrir destinos, compartir experiencias y planificar actividades turísticas.

El proyecto está desarrollado con una **arquitectura cliente-servidor**, utilizando **Node.js y Express** en el backend, **MongoDB** como base de datos y un **frontend clásico en HTML, CSS y JavaScript**, con una **migración progresiva a React** iniciada en el Sprint actual.

---

## 📌 Estado del proyecto

🚧 **En desarrollo (Sprint actual)**

### Funcionalidades implementadas
- Registro de usuarios
- Inicio de sesión con autenticación JWT
- Listado de destinos desde base de datos
- Filtros por nombre, moneda e idioma
- Modal para visualizar imágenes de destinos
- Página de experiencias (requiere sesión)
- Diseño responsive y estilos corporativos
- Backend estructurado con patrón MVC
- Inicio de migración del frontend a React (login/registro)

### Funcionalidades en progreso / planificadas
- Chat en tiempo real
- Tours y reservas
- Subida de imágenes en experiencias
- Valoraciones
- Pasarela de pago
- Despliegue en producción

---

## 🧱 Tecnologías utilizadas

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **JWT** (jsonwebtoken)
- **bcryptjs**
- **dotenv**
- **cors**

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)
- React (Vite) — *migración progresiva*

### Otras herramientas
- Postman (pruebas de API)
- Cloudinary (imágenes)
- Git & GitHub
- Visual Studio Code

---

## 🗂️ Estructura del proyecto

```text
ViajaMas/
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
│
├── frontend/
│   ├── index.html
│   ├── pages/
│   ├── js/
│   ├── imagenes/
│   └── styles.css
│
├── frontend-react/
│   └── (inicio de migración a React)
│
└── README.md
````
## 🗄️ Base de datos
MongoDB
Base de datos: viajaMas

## Colecciones principales
usuarios

destinos

comentarios

tours (planificada)

## 🔐 Autenticación
Registro y login mediante JWT

Contraseñas cifradas con bcrypt

El token se devuelve al hacer login

El frontend lo guarda en localStorage

Algunas páginas requieren sesión iniciada

## 🌐 Endpoints principales
Usuarios
POST /usuarios/registro → Registro de usuario

POST /usuarios/login → Login y generación de token

Destinos
GET /destinos → Listado de destinos

Filtros mediante query params:

?nombre=

?moneda=

?idioma=

Comentarios
GET /comentarios

POST /comentarios (requiere login)


## 2️⃣ Frontend clásico
Abrir index.html con Live Server o directamente en el navegador
Asegurarse de que los fetch apunten a http://localhost:3000

## 3️⃣ Frontend React (en progreso)


## 🚀 Próximos pasos
Completar migración de login y registro a React

Añadir React Router

Implementar chat en tiempo real

Sistema de reservas

Pasarela de pago

Despliegue final

## 👩‍💻 Autora
Cristina Fernández Fernández
2º DAW — Proyecto Intermodular
2025/2026
