import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import datasetRouter from './routers/datasetsRouter.js';
import authRouter from './routers/authRouter.js';
import stripeRouter from './routers/stripeRouter.js';
import webhookRouter from './routers/webhookRouter.js';
import purchaseRouter from './routers/purchaseRouter.js';

const app = express();

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
