import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  imagen: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  categoria: {
    type: String
  }
}, {
  timestamps: true
});

const Producto = mongoose.model('Producto', productoSchema);
export default Producto;
