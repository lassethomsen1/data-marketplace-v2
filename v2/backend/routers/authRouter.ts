import { Router } from 'express';
import { prisma, Users } from "@data/prisma";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';
import { authReqDTO } from "../types/ReqDTO";
import { JwtPayload } from "jsonwebtoken";

const router = Router();

router.get('/user', authenticateToken, (req: authReqDTO, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  prisma.users
    .findUnique({
      where: { id: userId },
    })
    .then(user => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      const { password, ...userWithoutPassword } = user;
      res.status(200).send({ user: userWithoutPassword });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

router.get('/validate-token', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  const jwtSecret = process.env.JWT_SECRET; //det her er rodet
  if (!jwtSecret) {
    return res.status(500).send('JWT secret not configured');
  }

  let decoded: JwtPayload | string = ''; //todo: måske et problem senere hen (typen)
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(401).send('Invalid token');
  }

  if (typeof decoded === 'string') {
    return res.status(401).send('Invalid token format');
  }

  const verifiedUser = await prisma.users.findUnique({
    where: { id: decoded.id },
  });

  if (!verifiedUser) {
    return res.status(404).send('User not found');
  }

  return res.status(200).send({
    token,
    user: {
      id: verifiedUser.id,
      email: verifiedUser.email,
      name: verifiedUser.name,
      role: verifiedUser.role,
      stripeOnboardingCompleted: verifiedUser.stripeOnboardingCompleted,
    },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).send('JWT secret not configured');
  }

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      stripeOnboardingCompleted: user.stripeOnboardingCompleted,
    },
    jwtSecret,
    {
      expiresIn: '24h', // for demo purposes
    }
  );

  res.status(200).send({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      stripeOnboardingCompleted: user.stripeOnboardingCompleted,
    },
  });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).send('JWT secret not configured');
  }

  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      stripeOnboardingCompleted: newUser.stripeOnboardingCompleted,
    },
    jwtSecret,
    {
      expiresIn: '24h', // for demo purposes
    }
  );
  if (!token) {
    return res.status(500).send('Error signing up');
  }
  res.status(200).send({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      stripeOnboardingCompleted: newUser.stripeOnboardingCompleted,
    },
  });
});
export default router;
