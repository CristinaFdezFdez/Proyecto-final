const { conectarDB } = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRO
exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const coleccion = await conectarDB("usuarios");

        // ¿Existe ya el email?
        const existe = await coleccion.findOne({ email });
        if (existe) {
            return res.status(400).json({ msg: "El email ya está registrado" });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        // Insertar usuario
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

        // Comparar contraseña
        const passwordCorrecta = bcrypt.compareSync(password, usuario.password);

        if (!passwordCorrecta) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        // Crear token
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
