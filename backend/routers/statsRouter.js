import { Router } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { authenticateToken } from '../middleware/auth.js';
import stripe from '../utils/stripe.js';

const router = new Router();
const prisma = new PrismaClient();

router.get('/', authenticateToken, async (req, res) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).send('Access denied');
  }
  const stats = {
    database: await getDatabaseStats(),
    stripe: await getStripeStats(),
  };
  res.send(stats);
});
async function getDatabaseStats() {
  const [users, datasets, failedPurchases, completedPurchases] = await prisma.$transaction([
    prisma.users.count(),
    prisma.datasets.count(),
    prisma.purchases.count({
      where: { status: 'FAILED' },
    }),
    prisma.purchases.count({
      where: { status: 'COMPLETED' },
    }),
  ]);

  return {
    users,
    datasets,
    failedPurchases,
    completedPurchases,
  };
}
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const transactions = await prisma.purchases.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        buyer: {
          select: {
            email: true,
          },
        },
        dataset: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'failed fetching transactions' });
  }
});

// todo skal være i en helper folder
async function getStripeStats() {
  const balanceTxs = await stripe.balanceTransactions.list({
    type: 'application_fee',
    limit: 100,
    created: { gte: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60 },
  });
  const feesSum = balanceTxs.data.reduce((sum, tx) => {
    return sum + (tx.amount || 0);
  }, 0);
  const total = { total: feesSum / 100, currency: balanceTxs.data[0]?.currency || 'dkk' };
  return {
    fees: total,
    totalRevenue: await getTotalRevenue(),
  };
}
async function getTotalRevenue() {
  const paymentIntents = await stripe.paymentIntents.list({
    limit: 100,
    created: { gte: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60 }, // Last 30 days
  });

  const total = paymentIntents.data
    .filter(pi => pi.status === 'succeeded')
    .reduce((sum, pi) => sum + pi.amount_received, 0);

  return { total: total / 100, currency: paymentIntents.data[0]?.currency || 'usd' };
}

export default router;
