const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Servidor corriendo en puerto 5000")
    );
  })
  .catch((err) => console.error(err));
  
import usuariosRoutes from './routes/usuarios.js';
app.use('/api/usuarios', usuariosRoutes);

import productosRoutes from './routes/productos.js';
app.use('/api/productos', productosRoutes);

import carritoRoutes from './routes/carrito.js';
app.use('/api/carrito', carritoRoutes);
