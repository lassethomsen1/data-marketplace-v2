import { Request } from 'express';
import type { Users } from '@data/prisma';
export interface authReqDTO extends Request {
  user?: {
    id: Users['id'];
    email: Users['email'];
    name: Users['name'];
    role: Users['role'];
    stripeAccountId: Users['stripeAccountId'];
    stripeOnboardingCompleted: Users['stripeOnboardingCompleted'];
  }
}