import { Router } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import stripe from '../utils/stripe.js';
import { authenticateToken } from '../middleware/auth.js';

const router = new Router();
const prisma = new PrismaClient();

router.post('/onboard-seller', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).send({ error: 'User not found' });

  let accountId = user.stripeAccountId;

  if (!accountId) {
    const account = await stripe.accounts.create({
      type: 'express',
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    await prisma.users.update({
      where: { id: user.id },
      data: { stripeAccountId: account.id },
    });

    accountId = account.id;
  }
  const origin = process.env.FRONTEND_URL;
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${origin}/profile`,
    return_url: `${origin}/profile`,
    type: 'account_onboarding',
  });

  res.send({ url: accountLink.url });
});
export default router;
