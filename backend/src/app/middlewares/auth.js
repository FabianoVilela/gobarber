import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // transforma função callback em async/await

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  const [, token] = authHeader.split(' '); // Desestruturação , (posição 1)

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
