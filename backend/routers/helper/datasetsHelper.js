// Helper function to parse sample data from file todo: make this more robust
// should take 10 first units
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

export async function extractSampleData(buffer, filetype) {
  if (filetype.includes('json')) {
    try {
      const sampleBuffer = buffer.slice(0, Math.min(1000, buffer.length));
      const dataStr = sampleBuffer.toString();
      return dataStr.slice(0, 500);
    } catch (err) {
      return 'Sample data extraction failed';
    }
  } else if (filetype.includes('csv') || filetype.includes('vnd.ms-excel')) {
    try {
      const sampleBuffer = buffer.slice(0, Math.min(1000, buffer.length));
      const dataStr = sampleBuffer.toString();
      const rows = dataStr.split('\n').slice(0, 5);
      return rows.join('\n');
    } catch (err) {
      return 'Sample data extraction failed';
    }
  }

  return 'Sample preview not available for this file type';
}

export async function verifySellerStatus(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }
  if (!user.stripeAccountId || !user.stripeOnboardingCompleted) {
    throw new Error('You must complete Stripe onboarding before selling datasets');
  }

  return user;
}
