import express from 'express';
import Carrito from '../models/carrito.js';
import protegerRuta from '../middleware/authMiddleware.js';

const router = express.Router();

// Ver carrito
router.get('/', protegerRuta, async (req, res) => {
  try { //try-catch para manejar posibles errores
    const carrito = await Carrito.findOne({ usuario: req.usuario._id }).populate('productos.producto');
    res.json(carrito || { productos: [] });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ mensaje: 'Error del servidor al obtener el carrito' });
  }
});

// Agregar producto
router.post('/agregar', protegerRuta, async (req, res) => {
  try { //try-catch para manejar posibles errores
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
    const carritoActualizado = await Carrito.findById(carrito._id).populate('productos.producto');
    res.json(carritoActualizado);
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ mensaje: 'Error del servidor al agregar producto al carrito' });
  }
});

// Eliminar producto
router.post('/eliminar', protegerRuta, async (req, res) => {
  try { //try-catch para manejar posibles errores
    const { productoId } = req.body;
    const carrito = await Carrito.findOne({ usuario: req.usuario._id });

    if (carrito) {
      carrito.productos = carrito.productos.filter(p => p.producto.toString() !== productoId);
      await carrito.save();
    }
    res.json(carrito || { productos: [] });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ mensaje: 'Error del servidor al eliminar producto del carrito' });
  }
});

export default router;
