import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import emitStat from './socket/socketEmits.js';

const router = new Router();

router.post('/emit-test-tx', authenticateToken, async (req, res) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).send('Access denied');
  }

  const { event, data } = req.body;

  if (!event || !data) {
    return res.status(400).send('Event and data are required');
  }

  try {
    await emitStat(event, data);
    res.send({ success: true, message: `Event ${event} emitted successfully` });
  } catch (error) {
    console.error(`Error emitting event ${event}:`, error);
    res.status(500).send({ success: false, message: 'Failed to emit event' });
  }
});

export default router;
