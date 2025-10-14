import { Request } from 'express';
import type { User } from '@data/prisma';
export interface authReqDTO extends Request {
  user?: {
    id: User['id'];
    email: User['email'];
    name: User['name'];
    role: User['role'];
    stripeAccountId: User['stripeAccountId'];
    stripeOnboardingCompleted: User['stripeOnboardingCompleted'];
  }
}