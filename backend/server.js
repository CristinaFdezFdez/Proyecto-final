require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuario");
const destinosRoutes = require("./routes/destino");
const comentarioRoutes = require("./routes/comentario");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/destinos", destinosRoutes);
app.use("/usuarios", usuarioRoutes);


// Iniciamos el servidor en el puerto definido
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

