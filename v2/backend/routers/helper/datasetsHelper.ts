import { prisma } from '@data/prisma';
import type { Users } from "@data/prisma";

export async function extractSampleData(buffer: Buffer<ArrayBufferLike>, filetype: string) {
  if (filetype.includes('csv') || filetype.includes('vnd.ms-excel')) {
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

export async function verifySellerStatus(userId: Users['id']) {
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
