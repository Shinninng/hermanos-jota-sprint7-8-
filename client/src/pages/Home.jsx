import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Bienvenido a Mueblería Hermanos Jota</h1>
        <p>Los mejores muebles para tu hogar</p>
        <Link to="/productos" className="cta-button">Ver Catálogo</Link>
      </div>
    </div>
  );
}