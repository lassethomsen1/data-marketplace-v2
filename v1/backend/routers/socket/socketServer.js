import { Server } from 'socket.io';
import { socketAuth } from '../../middleware/socketAuth.js';
let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
    },
    path: '/ws',
  });

  io.use(socketAuth);

  io.on('connection', socket => {
    console.log('User connected:', socket.user.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.user.id);
    });
  });

  return io;
}

export { io };
