import { Router } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

import stripe from '../utils/stripe.js';
import { authenticateToken } from '../middleware/auth.js';

const router = new Router();
const prisma = new PrismaClient();

router.post('/purchases/:datasetId', authenticateToken, async (req, res) => {
  try {
    const { datasetId } = req.params;
    const buyerId = req.user.id;

    const successUrl = process.env.FRONTEND_URL + '/profile';
    const cancelUrl = process.env.FRONTEND_URL + '/dataset/' + datasetId;

    const dataset = await prisma.datasets.findUnique({
      where: { id: datasetId },
      include: {
        seller: true,
      },
    });

    if (!dataset) {
      return res.status(404).send({ error: 'Dataset not found' });
    }

    if (dataset.status !== 'AVAILABLE') {
      return res.status(400).send({ error: 'Dataset is not available for purchase' });
    }

    if (dataset.sellerId === buyerId) {
      return res.status(400).send({ error: 'Cannot purchase your own dataset' });
    }

    const existingPurchase = await prisma.purchases.findFirst({
      where: {
        buyerId,
        datasetId,
        status: 'COMPLETED',
      },
    });

    if (existingPurchase) {
      return res.status(400).send({ error: 'Dataset already purchased' });
    }

    if (!dataset.seller.stripeOnboardingCompleted || !dataset.seller.stripeAccountId) {
      return res.status(400).send({
        error: 'Seller has not completed payment setup',
      });
    }

    const purchase = await prisma.purchases.create({
      data: {
        buyerId,
        datasetId,
        status: 'PENDING',
      },
    });

    const platformFeePercent = 0.05; // 5%
    const applicationFee = Math.round(dataset.price * platformFeePercent);

    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: dataset.title,
                description: dataset.description,
                metadata: {
                  datasetId: dataset.id,
                  purchaseId: purchase.id,
                },
              },
              unit_amount: dataset.price,
            },
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: applicationFee,
          metadata: {
            datasetId: dataset.id,
            purchaseId: purchase.id,
            buyerId: buyerId,
            sellerId: dataset.sellerId,
          },
        },
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&purchase_id=${purchase.id}`,
        cancel_url: cancelUrl,
        metadata: {
          datasetId: dataset.id,
          purchaseId: purchase.id,
          buyerId: buyerId,
          sellerId: dataset.sellerId,
        },
      },
      {
        stripeAccount: dataset.seller.stripeAccountId,
      }
    );

    await prisma.purchases.update({
      where: { id: purchase.id },
      data: { stripeSessionId: session.id },
    });

    res.send({
      checkoutUrl: session.url,
      sessionId: session.id,
      purchaseId: purchase.id,
    });
  } catch (error) {
    console.error('Purchase creation error:', error);
    res.status(500).send({ error: 'Failed to create purchase' });
  }
});

router.get('/purchases', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 100 } = req.query; //todo: add pagination

    const purchases = await prisma.purchases.findMany({
      where: {
        buyerId: userId,
        status: 'COMPLETED',
      },
      include: {
        dataset: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            tags: true,
            category: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });

    const totalPurchases = await prisma.purchases.count({
      where: {
        buyerId: userId,
        status: 'COMPLETED',
      },
    });

    res.send({
      purchases,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalPurchases,
        totalPages: Math.ceil(totalPurchases / limit),
      },
    });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).send({ error: 'Failed to get purchases' });
  }
});
export default router;
