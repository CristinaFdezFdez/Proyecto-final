const express = require("express");
const router = express.Router();
const { obtenerComentarios, crearComentario } = require("../controllers/comentario");

// Ruta para obtener todos los comentarios 
router.get("/", obtenerComentarios);

// Ruta para publicar un nuevo comentario
router.post("/", crearComentario);

module.exports = router;