import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Perfil.css';

export default function Perfil() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2>Mi Perfil</h2>
        {user && (
          <div className="user-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user._id}</p>
          </div>
        )}
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>
    </div>
  );
}