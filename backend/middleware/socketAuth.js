import jwt from 'jsonwebtoken';

export function socketAuth(socket, next) {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error('Access Denied: No Token Provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error('Access Denied: Invalid Token'));
    }

    socket.user = user; // Attach user info to socket
    next();
  });
}
