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

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'account.updated':
        await handleAccountUpdated(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('Received');
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }

  async function handleCheckoutCompleted(session) {
    const { purchaseId, datasetId, buyerId } = session.metadata;

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        status: 'COMPLETED',
        paidAmount: session.amount_total,
      },
    });

    console.log(`Purchase ${purchaseId} completed successfully`);
  }

  async function handlePaymentFailed(paymentIntent) {
    const { purchaseId } = paymentIntent.metadata;

    if (purchaseId) {
      await prisma.purchase.update({
        where: { id: purchaseId },
        data: { status: 'FAILED' },
      });

      console.log(`Purchase ${purchaseId} failed`);
    }
  }
  async function handleAccountUpdated(account) {
    if (account.details_submitted && account.charges_enabled && account.payouts_enabled) {
      await prisma.user.updateMany({
        where: { stripeAccountId: account.id },
        data: { stripeOnboardingCompleted: true },
      });

      console.log(`✅ Onboarding completed for account: ${account.id}`);
    }
  }
});
export default router;
