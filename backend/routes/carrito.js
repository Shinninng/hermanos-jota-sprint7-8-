import express from 'express';
import Carrito from '../models/carrito.js';
import protegerRuta from '../middleware/authMiddleware.js';

const router = express.Router();

// Ver carrito
router.get('/', protegerRuta, async (req, res) => {
  const carrito = await Carrito.findOne({ usuario: req.usuario._id }).populate('productos.producto');
  res.json(carrito || { productos: [] });
});

// Agregar producto
router.post('/agregar', protegerRuta, async (req, res) => {
  const { productoId, cantidad } = req.body;
  let carrito = await Carrito.findOne({ usuario: req.usuario._id });

  if (!carrito) {
    carrito = new Carrito({ usuario: req.usuario._id, productos: [] });
  }

  const existente = carrito.productos.find(p => p.producto.toString() === productoId);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.productos.push({ producto: productoId, cantidad });
  }

  await carrito.save();
  res.json(carrito);
});

// Eliminar producto
router.post('/eliminar', protegerRuta, async (req, res) => {
  const { productoId } = req.body;
  const carrito = await Carrito.findOne({ usuario: req.usuario._id });

  carrito.productos = carrito.productos.filter(p => p.producto.toString() !== productoId);
  await carrito.save();
  res.json(carrito);
});

export default router;
