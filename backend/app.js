import express from 'express';
import 'dotenv/config';
import authRouter from './routers/authRouter.js';

const app = express();

app.use(express.json());
app.use(authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
