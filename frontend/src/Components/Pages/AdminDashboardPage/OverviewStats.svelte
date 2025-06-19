<script>
  import { stats, statsLoading } from '@/stores/statsStore.js';
  import {
    CloudUpload,
    DollarSign,
    HardDrive,
    TrendingUp,
    TriangleAlert,
    UserRound,
  } from 'lucide-svelte';
  const initialStats = {
    revenue24h: 0,
    revenue7d: 0,
    activeUsers: 0,
    totalDatasets: 0,
    uploadSuccessRate: 100.0,
    failedPayments: 0,
  };

  setInterval(() => {
    stats.revenue24h += Math.random() * 100;
    stats.activeUsers += Math.floor(Math.random() * 10) - 5;
    stats.failedPayments += Math.random() > 0.9 ? 1 : 0;
  }, 5000);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Revenue (30d)</p>
        <p class="text-2xl font-bold text-gray-900">${$stats.stripe.totalRevenue.total}</p>
      </div>
      <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <DollarSign class="text-blue-600" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Fees (30d)</p>
        <p class="text-2xl font-bold text-gray-900">{$stats.stripe.fees.total} DKK</p>
      </div>
      <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
        <TrendingUp class="text-teal-600" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Registered Users</p>
        <p class="text-2xl font-bold text-gray-900">{$stats.database.users}</p>
      </div>
      <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <UserRound class="text-purple-600" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Total Datasets</p>
        <p class="text-2xl font-bold text-gray-900">{$stats.database.datasets}</p>
      </div>
      <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <HardDrive class="text-green-600" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Completed Purchases</p>
        <p class="text-2xl font-bold text-gray-900">{$stats.database.completedPurchases}</p>
      </div>
      <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
        <CloudUpload class="text-indigo-500" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Failed Payments</p>
        <p class="text-2xl font-bold text-gray-900">{$stats.database.failedPurchases}</p>
      </div>
      <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <TriangleAlert class="text-red-600" />
      </div>
    </div>
  </div>
</div>
