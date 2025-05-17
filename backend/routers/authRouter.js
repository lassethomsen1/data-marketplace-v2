import { Router } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js';

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
router.get('/validate-token', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json('No token provided');
  }
  //todo det her kan være redundant
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json('Invalid token');
    }
    return decoded;
  });

  const verifiedUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) {
      return res.status(401).json('Invalid token');
    }
    res.status(200).json({ token, user: { id: verifiedUser.id, email: verifiedUser.email } });
  });
});
router.get('/user', authenticateToken, (req, res) => {
  const userId = req.user.id;

  prisma.user
    .findUnique({
      where: { id: userId },
    })
    .then(user => {
      if (!user) {
        return res.status(404).json('User not found');
      }
      const { password, ...userWithoutPassword } = user;
      res.status(200).json({ user: userWithoutPassword });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json('Internal server error');
    });
});
export default router;
