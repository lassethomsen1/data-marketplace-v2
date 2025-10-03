import * as express from 'express';
import { prisma } from '@data/prisma';
import stripe from '../utils/stripe.js';
import Stripe from "stripe";
//import emitStat from './socket/socketEmits.js';

const router = express.Router();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
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
    res.status(500).send({ error: 'Webhook handler failed' });
  }

  async function handleCheckoutCompleted(session) {
    const { purchaseId, datasetId, buyerId } = session.metadata;

    const transaction = await prisma.purchases.update({
      where: { id: purchaseId },
      data: {
        status: 'COMPLETED',
        paidAmount: session.amount_total,
      },
      include: {
        buyer: {
          select: {
            email: true,
          },
        },
        dataset: {
          select: {
            title: true,
            seller: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    /*
    await emitStat('transaction:new', {
      transaction,
    });*/
  }

  async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const { purchaseId } = paymentIntent.metadata;

    if (purchaseId) {
      const transaction = await prisma.purchases.update({
        where: { id: purchaseId },
        data: { status: 'FAILED' },
        include: {
          buyer: {
            select: {
              email: true,
            },
          },
          dataset: {
            select: {
              title: true,
              seller: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      /*
      await emitStat('transaction:new', {
        transaction,
      });*/
    }
  }
  async function handleAccountUpdated(account: Stripe.Account) {
    if (
      account.details_submitted &&
      account.charges_enabled &&
      account.payouts_enabled
    ) {
      await prisma.users.updateMany({
        where: { stripeAccountId: account.id },
        data: { stripeOnboardingCompleted: true },
      });
    }
  }
});
export default router;
