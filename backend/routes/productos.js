import express from 'express';
import Producto from '../models/Producto.js';
import protegerRuta from '../middleware/authMiddleware.js';

const router = express.Router();

// Crear producto (admin)
router.post('/', protegerRuta, async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto' });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

export default router;
