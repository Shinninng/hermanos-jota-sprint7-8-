import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Producto from './models/Producto.js';
import productos from './data/productos.js';

dotenv.config();

const importarDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Producto.deleteMany();
    await Producto.insertMany(productos);
    console.log(' Productos cargados correctamente');
    process.exit();
  } catch (error) {
    console.error(' Error al cargar productos:', error);
    process.exit(1);
  }
};

importarDatos();
