require("dotenv").config();
const { conectarDB } = require("../models/db");
const jwt = require("jsonwebtoken");

async function obtenerComentarios(req, res) {
    try {
        const collection = await conectarDB("comentario");
        let filtro = {};
        if (req.query.nombre) {
            filtro.nombre = { $regex: req.query.nombre, $options: "i" };
        }

        const comentarios = await collection.find(filtro).sort({ _id: -1 }).toArray();

        comentarios.forEach(comentario => {
            if (comentario.fecha_comentario) {
                comentario.fecha_comentario = new Date(comentario.fecha_comentario).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                });
            }
        });

        res.json(comentarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos." });
    }
}

async function crearComentario(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "No autorizado." });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { destino, comentario, estrellas } = req.body;

        if (!destino || !comentario || !estrellas) {
            return res.status(400).json({ error: "Faltan campos requeridos." });
        }

        const collection = await conectarDB("comentario");

        const nuevoComentario = {
            nombre: decoded.nombre,
            destino,
            comentario,
            estrellas: parseInt(estrellas),
            fecha_comentario: new Date()
        };

        await collection.insertOne(nuevoComentario);

        res.status(201).json({ mensaje: "Comentario guardado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al guardar el comentario." });
    }
}

module.exports = { obtenerComentarios, crearComentario };