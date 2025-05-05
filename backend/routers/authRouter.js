import { Router } from 'express';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = new Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '24h', // for demo purposes
  });

  res.status(200).json({ token, user: { id: user.id, email: user.email } });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  if (token) {
    //await sendSignupEmail(newUser.email); todo
  } else {
    return res.status(500).json('Error signing up');
  }
  res.status(200).json({ token, user: { id: newUser.id, email: newUser.email } });
});

export default router;
