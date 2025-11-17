import express from 'express';
import createError from 'http-errors';
import Producto from '../models/Producto.js';
import protegerRuta from '../middleware/authMiddleware.js';

const router = express.Router();

// Crear producto (admin)
router.post('/', async (req, res, next) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (err) {
    next(createError(400, 'Error al crear el producto'));
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!productoActualizado) return next(createError(404, 'El producto solicitado no existe'));
    res.json(productoActualizado);
  } catch (err) {
    next(createError(400, 'Error al actualizar el producto'));
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) return next(createError(404, 'El producto solicitado no existe'));
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    next(createError(500, 'Error al eliminar el producto'));
  }
});

// Obtener todos los productos
router.get('/', async (req, res, next) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    next(createError(500, 'Error al leer los productos desde la base de datos'));
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return next(createError(404, 'El producto solicitado no existe'));
    res.json(producto);
  } catch (err) {
    next(createError(500, 'Error al buscar el producto'));
  }
});

export default router;
