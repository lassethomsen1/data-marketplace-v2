import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import datasetRouter from './routers/datasetRouter.js';
import authRouter from './routers/authRouter.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/api', datasetRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
