import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protegerRuta = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodificado = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await User.findById(decodificado.id).select('-contraseña');
      next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
  } else {
    return res.status(401).json({ mensaje: 'No autorizado, sin token' });
  }
};

export default protegerRuta;
