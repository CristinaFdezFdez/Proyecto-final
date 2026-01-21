const { MongoClient } = require("mongodb");
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "viajaMas";

/**
 * Función asincrónica para conectar a la base de datos y obtener una colección específica.
 * @param {string} nombreColeccion
 * @returns {Promise<Collection>} 
 */
async function conectarDB(nombreColeccion) {
    // Creamos una nueva instancia de MongoClient con la URI definida
    const client = new MongoClient(MONGO_URI);

    // Nos conectamos a la base de datos
    await client.connect();

    // Retornamos la colección solicitada dentro de la base de datos
    return client.db(DB_NAME).collection(nombreColeccion);
}

// Exportamos la función 
module.exports = { conectarDB };