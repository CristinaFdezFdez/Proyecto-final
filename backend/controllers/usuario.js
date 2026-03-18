const { conectarDB } = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRO
exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Compruebo que no me envíen campos vacíos y que la contraseña sea segura antes de tocar la base de datos
        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
        }

        const coleccion = await conectarDB("usuarios");

        const existe = await coleccion.findOne({ email });
        if (existe) {
            return res.status(400).json({ msg: "El email ya está registrado" });
        }

        // Encripto la contraseña con bcrypt para no guardarla en texto plano por seguridad
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        await coleccion.insertOne({
            nombre,
            email,
            password: passwordHash
        });

        res.status(201).json({ msg: "Usuario registrado correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const coleccion = await conectarDB("usuarios");
        const usuario = await coleccion.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        // Comparo la contraseña que me llega con el hash que tengo guardado en MongoDB
        const passwordCorrecta = bcrypt.compareSync(password, usuario.password);

        if (!passwordCorrecta) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        // Genero el Token JWT metiendo dentro el ID y el nombre para poder usarlo luego en el frontend
        const token = jwt.sign(
            { userId: usuario._id, nombre: usuario.nombre },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            msg: "Login correcto",
            token,
            usuario: {
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};