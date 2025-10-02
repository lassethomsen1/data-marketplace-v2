// todo: få det her pis fixet
import 'express';
import type { Users } from '@data/prisma';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: Users['id'];
      email: Users['email'];
      name: Users['name'];
      role: Users['role'];
      stripeAccountId: Users['stripeAccountId'];
      stripeOnboardingCompleted: Users['stripeOnboardingCompleted'];
    };
  }
}
