import express, { Router } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import stripe from '../utils/stripe.js';

const router = new Router();
const prisma = new PrismaClient();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.sendStatus(400);
  }

  if (event.type === 'account.updated') {
    const account = event.data.object;

    if (account.details_submitted && account.charges_enabled && account.payouts_enabled) {
      await prisma.user.updateMany({
        where: { stripeAccountId: account.id },
        data: { stripeOnboardingCompleted: true },
      });

      console.log(`✅ Onboarding completed for account: ${account.id}`);
    }
  }

  res.status(200).send('Received');
});
export default router;
