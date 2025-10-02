import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import 'dotenv/config';
import { Users } from "@data/prisma";
import { datasetReqDTO } from "../types/ReqDTO";

export function authenticateToken(req: datasetReqDTO, res: Response, next: NextFunction) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).send({ message: 'Server Error: JWT_SECRET not configured' });
  }

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user: Users) => {
    if (err) {
      return res.status(403).send({ message: 'Access Denied: Invalid Token' });
    }
    if (token == null) return res.status(401).send({ message: 'Access Denied: No Token Provided' });

    req.user = user;
    next();
  });
}
