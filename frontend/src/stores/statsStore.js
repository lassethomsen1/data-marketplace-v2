import { writable } from 'svelte/store';
import { fetchStats } from '@/api/statsApi.js';

export const stats = writable({
  database: {
    users: 0,
    datasets: 0,
    failedPurchases: 0,
    completedPurchases: 0,
  },
  stripe: {
    fees: { total: 0, currency: 'dkk' },
    totalRevenue: { total: 0, currency: 'usd' },
  },
});
export const transactions = writable([]);
export const statsLoading = writable(false);

export async function fetchAndSetStats() {
  statsLoading.set(true);
  try {
    const data = await fetchStats();
    stats.set(data);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  } finally {
    statsLoading.set(false);
    console.log('Stats loading finished');
  }
}
