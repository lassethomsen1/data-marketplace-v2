import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Access Denied: Invalid Token' });
    }
    if (token == null) return res.status(401).send({ message: 'Access Denied: No Token Provided' });

    req.user = user;
    next();
  });
}
