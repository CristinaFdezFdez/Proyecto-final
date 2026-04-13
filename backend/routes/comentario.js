const express = require("express");
const router = express.Router();

//Importamos tu controlador 
const comentarioController = require("../controllers/comentario");

//Importamos el middleware para subir la foto a Cloudinary
const upload = require("../middleware/subidaImagen"); 

// 3. Definimos las rutas
router.post("/", upload.single('imagen'), comentarioController.crearComentario);
router.get("/", comentarioController.obtenerComentarios);

module.exports = router;