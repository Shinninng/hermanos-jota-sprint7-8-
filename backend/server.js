// Configuración inicial
const dotenv = require("dotenv");
dotenv.config(); // Carga variables lo antes posible

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usuariosRoutes = require('./routes/usuarios.js');
const productosRoutes = require('./routes/productos.js');
const carritoRoutes = require('./routes/carrito.js');

// Inicio app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // URL Vercel
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json()); 

// Rutas
app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

// Conexión MongoDB y Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    // Iniciar servidor dps de conexión exitosa a BD
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch((err) => console.error(err));
