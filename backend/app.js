import express from 'express';
import 'dotenv/config';
import authRouter from './routers/authRouter.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
