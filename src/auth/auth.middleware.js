import jwt from 'jsonwebtoken';
import config from '../config.js';

export const authMiddleware = {
  authenticate: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado - Token no proporcionado' });
    }
    
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.userId = decoded.userId;
      req.user = {
        familiaId: decoded.familiaId,
        rolId: decoded.rolId
      };
      next();
    } catch (err) {
      res.status(401).json({ message: 'Acceso no autorizado - Token inválido' });
    }
  },

  authorizeAdmin: (req, res, next) => {
    if (req.user.rolId !== 1) { // Asumiendo que el rol 1 es administrador
      return res.status(403).json({ message: 'Acceso prohibido - Se requieren privilegios de administrador' });
    }
    next();
  }
};

export default authMiddleware;