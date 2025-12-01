import { createContext, useState, useEffect } from 'react';
import api from '../services/api';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
  const isAuthenticated = !!token;

  useEffect(() => {

    if (token && !user) {
      localStorage.setItem('token', token);
      
      // Obtener perfil del usuario
      api.get('/api/usuarios/perfil')
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            setLoading(false);
        });
    } else if (token && user) {
      
      setLoading(false);
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = (tokenReceived, userData) => {
    setToken(tokenReceived);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return null; // O un componente de Spinner/Cargando...
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
