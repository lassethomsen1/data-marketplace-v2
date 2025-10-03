import { prisma, Users } from "@data/prisma";
import stripe from '../../utils/stripe';

type RevenueStats = {
  month: string;
  revenue: number;
  sales: number;
};

export async function getDatabaseStats() {
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

export async function getStripeStats() {
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

export async function getTotalRevenue() {
  const paymentIntents = await stripe.paymentIntents.list({
    limit: 100,
    created: { gte: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60 }, // Last 30 days
  });

  const total = paymentIntents.data
    .filter(pi => pi.status === 'succeeded')
    .reduce((sum, pi) => sum + pi.amount_received, 0);

  return { total: total / 100, currency: paymentIntents.data[0]?.currency || 'usd' };
}

export async function getRemainingPayout(stripeAccountId: Users['stripeAccountId']) {
  try {
    if (!stripeAccountId) {
      throw new Error('Seller has not completed payment setup');
    }
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountId,
    });

    return {
      accountId: stripeAccountId,
      available: balance.available,
      pending: balance.pending,
    };
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

export async function getPayoutHistory(stripeAccountId: Users['stripeAccountId']) {
  try {
    if (!stripeAccountId) {
      throw new Error('Seller has not completed payment setup');
    }
    const payouts = await stripe.payouts.list({ limit: 100 }, { stripeAccount: stripeAccountId });

    return payouts.data.map(payout => ({
      id: payout.id,
      amount: payout.amount / 100,
      status: payout.status,
      currency: payout.currency,
      createdAt: new Date(payout.created * 1000).toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching payout history:', error);
    throw error;
  }
}

export async function getSales(sellerId: Users['id'], months = 12) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    return await prisma.purchases.findMany({
      where: {
        dataset: {
          sellerId: sellerId,
        },
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        paidAmount: true,
        createdAt: true,
        status: true,
        buyer: {
          select: {
            email: true,
          },
        },
        dataset: {
          select: {
            title: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching sales data from purchases:', error);
    throw error;
  }
}

export async function getSellerRevenue(sellerId: Users['id'], months = 12) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const purchases = await prisma.purchases.findMany({
      where: {
        dataset: {
          sellerId: sellerId,
        },
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        paidAmount: true,
        createdAt: true,
      },
    });

    const revenueByMonth: { [key: string]: RevenueStats } = {};

    purchases.forEach(purchase => {
      const date = new Date(purchase.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      if (!revenueByMonth[monthKey]) {
        revenueByMonth[monthKey] = {
          month: monthName,
          revenue: 0,
          sales: 0,
        };
      }

      revenueByMonth[monthKey].revenue += (purchase.paidAmount || 0) / 100;
      revenueByMonth[monthKey].sales += 1;
    });

    const revenueData = [];
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      revenueData.push(
        revenueByMonth[monthKey] || {
          month: monthName,
          revenue: 0,
          sales: 0,
        }
      );
    }

    return revenueData;
  } catch (error) {
    console.error('Error fetching revenue data from purchases:', error);
    throw error;
  }
}
