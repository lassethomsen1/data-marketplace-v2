import jwt from 'jsonwebtoken';

export function socketAuth(socket, next) {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error('Access Denied: No Token Provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || !user || user.role !== 'ADMIN') {
      return next(new Error('Access Denied: Invalid Token'));
    }

    socket.user = user;
    next();
  });
}
