const { conectarDB } = require("../models/db");

/**
 * Controlador para obtener destinos desde la base de datos.
 */
async function obtenerDestinos(req, res) {
    try {
        const collection = await conectarDB("destinos");
        let filtro = {};

        if (req.query.nombre) {
            filtro.nombre = { $regex: req.query.nombre, $options: "i" };
        }
        if (req.query.moneda) {
            filtro.moneda = { $regex: req.query.moneda, $options: "i" };
        }
        if (req.query.idioma) {
            filtro.idioma = { $regex: req.query.idioma, $options: "i" };
        }

        const destinos = await collection.find(filtro).toArray();
        res.json(destinos);

    } catch (error) {
        console.error("❌ Error en MongoDB:", error);
        res.status(500).json({ error: "Error al obtener los destinos." });
    }
};

module.exports = { obtenerDestinos };
