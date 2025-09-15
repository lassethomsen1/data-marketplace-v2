import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import datasetRouter from './routers/datasetsRouter.js';
import authRouter from './routers/authRouter.js';
import stripeRouter from './routers/stripeRouter.js';
import webhookRouter from './routers/webhookRouter.js';
import purchaseRouter from './routers/purchaseRouter.js';
import statsRouter from './routers/statsRouter.js';
import devRouter from './routers/devRouter.js';

import { initSocket } from './routers/socket/socketServer.js';

const app = express();

const server = http.createServer(app);
initSocket(server);
// stripe webhook endpoint must be before express.json middleware
app.use('/api/stripe', webhookRouter);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use('/api', datasetRouter);
app.use('/api/', purchaseRouter);
app.use('/api/stats', statsRouter);
app.use('/api/stripe', stripeRouter);
app.use('/auth', authRouter);
app.use('/dev', devRouter);

app.get('/', (req, res) => {
  res.send('Api server of dataset marketplace');
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
