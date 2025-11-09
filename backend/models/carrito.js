import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
      },
      cantidad: {
        type: Number,
        default: 1
      }
    }
  ]
}, {
  timestamps: true
});

const Carrito = mongoose.model('Carrito', carritoSchema);
export default Carrito;
