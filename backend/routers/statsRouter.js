import { Router } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  getDatabaseStats,
  getPayoutHistory,
  getRemainingPayout,
  getSales,
  getSellerRevenue,
  getStripeStats,
} from './helper/statsHelper.js';

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
            seller: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.send(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send({ error: 'failed fetching transactions' });
  }
});

router.get('/sellers', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(403).send('Access denied');
  }
  const isStripeOnboardingComplete = await prisma.users.findUnique({
    where: { id: req.user.id },
    select: {
      stripeOnboardingCompleted: true,
    },
  });
  if (!isStripeOnboardingComplete) {
    return res.status(403).send('Seller onboarding not completed');
  }
  try {
    const sellerId = req.user.id;

    const [user, totalEarningsResult, totalSales, activeDatasets] = await prisma.$transaction([
      prisma.users.findUnique({
        where: { id: sellerId },
        select: {
          stripeAccountId: true,
        },
      }),
      prisma.purchases.aggregate({
        _sum: { paidAmount: true },
        where: {
          status: 'COMPLETED',
          dataset: {
            sellerId: sellerId,
          },
        },
      }),

      prisma.purchases.count({
        where: {
          status: 'COMPLETED',
          dataset: {
            sellerId: sellerId,
          },
        },
      }),

      prisma.datasets.count({
        where: {
          sellerId: sellerId,
          status: 'AVAILABLE',
        },
      }),
    ]);
    const pendingBal = await getRemainingPayout(user.stripeAccountId);
    const payoutHistory = await getPayoutHistory(user.stripeAccountId);
    const recentSales = await getSales(sellerId, 12);

    const sellerData = {
      totalEarnings: (totalEarningsResult._sum.paidAmount ?? 0) / 100,
      totalSales,
      activeDatasets,
      pendingPayout: pendingBal.available.reduce((sum, item) => sum + (item.amount || 0), 0) / 100,
      payoutHistory,
      recentSales,
    };

    return res.send(sellerData);
  } catch (error) {
    console.error('Error fetching seller dashboard:', error);
    return res.status(500).send({ error: 'Failed to load seller dashboard' });
  }
});

router.get('/sellers/revenue', authenticateToken, async (req, res) => {
  try {
    const sellerId = req.user.id;

    const { months = '12' } = req.query;

    const seller = await prisma.users.findUnique({
      where: {
        id: sellerId,
        stripeOnboardingCompleted: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!seller) {
      return res.status(404).send({
        success: false,
        error: 'Seller not found',
      });
    }

    const revenueData = await getSellerRevenue(sellerId, parseInt(months));

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue), 1);

    const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
    const totalSales = revenueData.reduce((sum, d) => sum + d.sales, 0);
    const avgSaleValue = totalSales > 0 ? totalRevenue / totalSales : 0;

    res.send({
      revenueData: revenueData,
      maxRevenue: maxRevenue,
      summary: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        avgSaleValue: Math.round(avgSaleValue * 100) / 100,
      },
    });
  } catch (error) {
    console.error('Error fetching seller revenue:', error);
    res.status(500).send({
      success: false,
      error: 'Failed to fetch revenue data',
    });
  }
});
// todo skal være et andet sted (muligvis i datasetRouter) og lav routen om
router.get('/sellers/dataset/performance', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const datasets = await prisma.datasets.findMany({
      where: {
        sellerId: userId,
      },
      include: {
        purchases: {
          where: {
            status: 'COMPLETED',
          },
        },
      },
    });

    const performanceData = datasets.map(dataset => {
      const completedPurchases = dataset.purchases;
      const sales = completedPurchases.length;
      const revenue = completedPurchases.reduce((total, purchase) => {
        return total + (purchase.paidAmount || 0);
      }, 0);

      return {
        id: dataset.id,
        name: dataset.title,
        price: (dataset.price / 100).toFixed(2),
        sales: sales,
        revenue: (revenue / 100).toFixed(2),
        status: dataset.status,
        createdAt: dataset.createdAt,
      };
    });

    res.send(performanceData);
  } catch (error) {
    console.error('Error fetching dataset performance:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.get('/uploads', authenticateToken, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const uploads = await prisma.datasets.findMany({
      omit: {
        filekey: true,
        sampleData: true,
        description: true,
        price: true,
      },
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        seller: {
          select: {
            email: true,
          },
        },
      },
    });

    res.send(uploads);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send({ error: 'failed fetching uploads' });
  }
});
export default router;
