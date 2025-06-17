import { writable } from 'svelte/store';
import {
  fetchDatasetPerformance,
  fetchSellerRevenue,
  fetchSellerStats,
  fetchStats,
  fetchTransactions,
  fetchUploads,
} from '@/api/statsApi.js';
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
export const sellerStats = writable({
  totalEarnings: 0,
  totalSales: 0,
  activeDatasets: 0,
  pendingPayout: 0,
  payoutHistory: [
    {
      id: '',
      amount: 0,
      status: '',
      currency: '',
      createdAt: '',
    },
  ],
  recentSales: [
    {
      id: '',
      paidAmount: 0,
      createdAt: '',
      status: '',
      buyer: {
        email: '',
      },
      dataset: {
        title: '',
      },
    },
  ],
});
export const sellerRevenue = writable({
  revenueData: [],
  maxRevenue: 0,
  summary: {
    totalRevenue: 0,
    avgSaleValue: 0,
  },
});
export const datasetPerformance = writable({
  id: '',
  name: '',
  price: '',
  sales: 0,
  revenue: '',
  status: '',
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

export async function fetchAndSetSellerStats() {
  statsLoading.set(true);
  try {
    const stats = await fetchSellerStats();
    const revenue = await fetchSellerRevenue();
    const fetchedDatasetPerformances = await fetchDatasetPerformance();

    sellerStats.set(stats);
    sellerRevenue.set(revenue);
    datasetPerformance.set(fetchedDatasetPerformances);
  } catch (error) {
    console.error('Failed to fetch seller stats:', error);
  } finally {
    statsLoading.set(false);
  }
}
