require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); // Importante
const usuarioRoutes = require("./routes/usuario");
const destinosRoutes = require("./routes/destino");
const comentarioRoutes = require("./routes/comentario");

const PORT = 3000;
const app = express();

// --- CORS: Permitimos el puerto 5500 (Live Server) y 5173 (Vite) ---
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:5173"],
    credentials: true
}));

app.use(express.json());

// --- ARCHIVOS ESTÁTICOS ---
app.use("/dist-react", express.static(path.join(__dirname, "../dist-react")));

// --- RUTAS ---
app.use("/destinos", destinosRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/comentarios", comentarioRoutes); // Coincide con el fetch de React

// Arrancar servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));