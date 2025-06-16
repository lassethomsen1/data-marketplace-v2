//todo : find bedre navn

import { io } from './socketServer.js';

async function emitStat(event, data) {
  try {
    if (!io) {
      console.error('Socket.io is not initialized');
      return;
    }
    io.emit(event, { ...data, timestamp: new Date() });
  } catch (error) {
    console.error(`Error emitting event ${event}:`, error);
  }
}
export default emitStat;
