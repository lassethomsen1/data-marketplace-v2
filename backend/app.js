import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import datasetRouter from './routers/datasetsRouter.js';
import authRouter from './routers/authRouter.js';
import stripeRouter from './routers/stripeRouter.js';
import webhookRouter from './routers/webhookRouter.js';
import purchaseRouter from './routers/purchaseRouter.js';
import { initSocket } from './routers/socket/socketServer.js';

const app = express();

const server = http.createServer(app);
initSocket(server);
// stripe webhook endpoint must be before express.json middleware
app.use('/api/stripe', webhookRouter);

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/api', datasetRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/', purchaseRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
