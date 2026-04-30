require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); // Importante
const { createServer } = require("http"); // Necesario para el chat
const { Server } = require("socket.io");  // La librería del chat
const usuarioRoutes = require("./routes/usuario");
const destinosRoutes = require("./routes/destino");
const comentarioRoutes = require("./routes/comentario");
const chatLogic = require("./chatLogic");

const PORT = 3000;
const app = express();
const httpServer = createServer(app);

//CORS: Permitimos el puerto 5500 (Live Server) y 5173 (Vite) ---
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:5173"],
    credentials: true
}));
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Deja entrar a cualquiera
        methods: ["GET", "POST"]
    }
});

app.use(express.json());

//ARCHIVOS ESTÁTICOS
app.use("/dist-react", express.static(path.join(__dirname, "../dist-react")));

//RUTAS
app.use("/destinos", destinosRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/comentarios", comentarioRoutes); 

// ARCHIVOS ESTÁTICOS 
app.use(express.static(path.join(__dirname, '..')));

// MIDDLEWARE 404 
app.use((req, res) => {
    if (req.originalUrl.startsWith('/usuarios') || 
        req.originalUrl.startsWith('/destinos') || 
        req.originalUrl.startsWith('/comentarios')) {
        return res.status(404).json({ error: "Ruta de API no encontrada." });
    }
    res.status(404).sendFile(path.join(__dirname, '../404.html'));
});
//LÓGICA DEL CHAT
chatLogic(io);

// Arrancar servidor
httpServer.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));