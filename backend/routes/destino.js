const express = require("express");
const { obtenerDestinos } = require("../controllers/destino"); 
const router = express.Router();

// Listado de países
router.get("/", obtenerDestinos); 

// Exportamos 
module.exports = router;