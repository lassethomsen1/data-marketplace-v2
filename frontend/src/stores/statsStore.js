import { writable } from 'svelte/store';
import { fetchStats, fetchTransactions, fetchUploads } from '@/api/statsApi.js';
import { formatDataset } from '@/utils/datasetUtil.js';

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
export const uploads = writable([]);
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
  }
}

export async function fetchAndSetTransactions() {
  statsLoading.set(true);
  try {
    const data = await fetchTransactions();
    transactions.set(data);
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
  } finally {
    statsLoading.set(false);
  }
}

export async function fetchAndSetUploads() {
  statsLoading.set(true);
  try {
    const data = await fetchUploads();
    data.forEach(upload => {
      formatDataset(upload);
    });
    uploads.set(data);
  } catch (error) {
    console.error('Failed to fetch uploads:', error);
  } finally {
    statsLoading.set(false);
  }
}
