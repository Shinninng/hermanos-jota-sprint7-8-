import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import protegerRuta from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 Generar token
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// 📝 Registro
router.post('/registro', async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El usuario ya existe' });

    const nuevoUsuario = new User({ nombre, email, contraseña });
    await nuevoUsuario.save();

    const token = generarToken(nuevoUsuario._id); // token ID del nuevo usuario
    res.status(201).json({
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      token
    });
  } catch (error) {
    // Más contexto del error en el log
    console.error('Error en /registro:', error);
    res.status(500).json({ mensaje: 'Error del servidor al registrar el usuario' });
  }
});

// 🔑 Login
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const esValida = await usuario.compararContraseña(contraseña);
    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = generarToken(usuario._id);
    res.status(200).json({ usuario, token });
  } catch (error) {
    // Más contexto del error en el log
    console.error('Error en /login:', error);
    res.status(500).json({ mensaje: 'Error del servidor al iniciar sesión' });
  }
});

router.get('/perfil', protegerRuta, (req, res) => {
  res.json({
    mensaje: 'Ruta protegida accedida con éxito',
    usuario: req.usuario
  });
});

export default router;
