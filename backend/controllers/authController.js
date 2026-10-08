const bcrypt = require('bcrypt');
const User = require('../models/User');

const usersDB = [];

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password || password.length < 6) {
            return res.status(400).json({ error: "Nombre invalido o contraseña menor a 6 caracteres" });
        }

        // Sanitización
        const sanitizedUsername = String(username).replace(/<[^>]*>?/gm, '').trim();

        // Hashing Bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User(Date.now().toString(), sanitizedUsername, hashedPassword);
        usersDB.push(newUser);

        res.status(201).json({
            message: "Usuario registrado con éxito",
            user: newUser.toJSON()
        });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};

module.exports = { register };