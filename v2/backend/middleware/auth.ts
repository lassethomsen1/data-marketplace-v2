import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import 'dotenv/config';
import { Users } from "@data/prisma";
import { authReqDTO } from "../types/ReqDTO";
import { JwtPayload } from "jsonwebtoken";


export interface UserJwtPayload extends JwtPayload {
  id: Users['id'];
  email: Users['email'];
  name: Users['name'];
  role: Users['role'];
  stripeAccountId: Users['stripeAccountId'];
  stripeOnboardingCompleted: Users['stripeOnboardingCompleted'];
}

export function authenticateToken(req: authReqDTO, res: Response, next: NextFunction) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).send({ message: 'Server Error: JWT_SECRET not configured' });
  }

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Access Denied: Invalid Token' });
    }
    if (token == null) return res.status(401).send({ message: 'Access Denied: No Token Provided' });

    const user = decoded as UserJwtPayload;

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      stripeAccountId: user.stripeAccountId,
      stripeOnboardingCompleted: user.stripeOnboardingCompleted,
    };
    next();
  });
}
