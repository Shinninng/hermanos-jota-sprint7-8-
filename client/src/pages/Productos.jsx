import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import '../styles/Productos.css';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get('/api/productos')
      .then(res => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener productos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="productos-container">
      <h2>Nuestros Productos</h2>
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto._id} className="producto-card">
            <img src={producto.imagen || 'https://via.placeholder.com/200'} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="precio">${producto.precio.toLocaleString('es-AR')}</p>
            <button onClick={() => addToCart(producto)} className="add-cart-btn">
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}