import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const datosParaBackend = {
                email: formData.email,
                contraseña: formData.password
            };

            const response = await axios.post('http://localhost:5000/api/usuarios/login', datosParaBackend);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
            alert('¡Inicio de sesión exitoso!');
            navigate('/');
        } catch (err){
            console.error('Error al iniciar sesión:', err);
            if(err.response && err.response.data){
                setError(err.response.data.mensaje);
            } else {
                setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    }

    return (
        <div className='auth-container'>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type='email'
                        name='email'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label>Contraseña</label>
                    <input 
                        type='password'
                        name='password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit' className='btn-primary'>Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to='/register'>Regístrate aquí</Link></p>
        </div>
    );
};

export default Login;