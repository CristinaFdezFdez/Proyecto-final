const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "viajaMas";

let client;
let db;

/**
 * Función asincrónica para conectar a la base de datos y obtener una colección específica.
 * Reutiliza una única conexión a MongoDB durante toda la ejecución del servidor.
 * @param {string} nombreColeccion
 * @returns {Promise<Collection>}
 */
async function conectarDB(nombreColeccion) {
    try {
        // Si todavía no existe cliente, se crea y se conecta una sola vez
        if (!client) {
            client = new MongoClient(MONGO_URI);
            await client.connect();
            db = client.db(DB_NAME);
            console.log("✅ Conectado a MongoDB");
        }

        // En las siguientes llamadas se reutiliza la misma conexión
        return db.collection(nombreColeccion);

    } catch (error) {
        console.error("❌ Error al conectar con MongoDB:", error);
        throw error;
    }
}

// Exportamos la función
module.exports = { conectarDB };