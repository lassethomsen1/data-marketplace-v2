import { User } from '@data/prisma';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: User['id'];
      email?: User['email'];
      name?: User['name'];
      role?: User['role'];
      stripeAccountId?: User['stripeAccountId'];
      stripeOnboardingCompleted?: User['stripeOnboardingCompleted'];
    };
  }
}