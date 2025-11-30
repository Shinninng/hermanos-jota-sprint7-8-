import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import '../styles/Carrito.css';

export default function Carrito() {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFinalizarCompra = async () => {
    if (!isAuthenticated) {
      alert('Debes estar logueado para finalizar compra');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    try {
      await api.post('/carrito', { items });
      alert('Compra finalizada exitosamente');
      clearCart();
      navigate('/perfil');
    } catch (err) {
      alert(err.response?.data?.message || 'Error al finalizar compra');
    }
  };

  if (items.length === 0) {
    return (
      <div className="carrito-container">
        <h2>Mi Carrito</h2>
        <p>El carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>Mi Carrito</h2>
      <div className="carrito-items">
        {items.map(item => (
          <div key={item._id} className="carrito-item">
            <img src={item.imagen || 'https://via.placeholder.com/100'} alt={item.nombre} />
            <div className="item-info">
              <h4>{item.nombre}</h4>
              <p>${item.precio.toLocaleString('es-AR')}</p>
            </div>
            <div className="item-cantidad">
              <button onClick={() => updateQuantity(item._id, item.cantidad - 1)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => updateQuantity(item._id, item.cantidad + 1)}>+</button>
            </div>
            <div className="item-total">
              ${(item.precio * item.cantidad).toLocaleString('es-AR')}
            </div>
            <button onClick={() => removeFromCart(item._id)} className="remove-btn">Eliminar</button>
          </div>
        ))}
      </div>
      <div className="carrito-resumen">
        <h3>Total: ${total.toLocaleString('es-AR')}</h3>
        <button onClick={handleFinalizarCompra} className="finalizar-btn">Finalizar Compra</button>
      </div>
    </div>
  );
}