import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
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

        try{
            const datosParaBackend = {
                nombre: formData.nombre,
                email: formData.email,
                contraseña: formData.password
            };

            const apiUrl = `${process.env.REACT_APP_API_URL}/api/usuarios/registro`;
            const response = await axios.post(apiUrl, datosParaBackend);
            console.log('Respuesta del server:', response.data);
            alert('¡Usuario registrado con éxito!');
            navigate('/login');
        } catch (err){
            console.error('Error al registrar usuario:', err);
            if(err.response && err.response.data){
                setError(err.response.data.mensaje);
            } else {
                setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    }

    return (
        <div className='auth-container'>
            <h2>Crear Cuenta</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nombre Completo</label>
                    <input 
                        type='text'
                        name='nombre'
                        placeholder='Ej. Mario Acosta'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type='email'
                        name='email'
                        placeholder='Ej. correo@ejemplo.com'
                        onChange={handleChange}
                        required    
                    />
                </div>
                <div className='form-group'>
                    <label>Contraseña</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='********'
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit' className='btn-primary'>Registrarse</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link></p>
        </div>
    );
};

export default Register;
