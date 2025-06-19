<script>
  import OverviewStats from '@/Components/Pages/AdminDashboardPage/OverviewStats.svelte';
  import LiveTransactions from '@/Components/Pages/AdminDashboardPage/LiveTransactions.svelte';
  import DatasetUploads from '@/Components/Pages/AdminDashboardPage/DatasetUploads.svelte';
  import { onMount } from 'svelte';
  import {
    fetchAndSetStats,
    fetchAndSetTransactions,
    fetchAndSetUploads,
    transactions,
    uploads,
  } from '@/stores/statsStore.js';

  import { io } from 'socket.io-client';
  import { simulateEvents } from '@/api/statsApi.js';
  import { formatDataset } from '@/utils/datasetUtil.js';

  onMount(async () => {
    await fetchAndSetStats();
    await fetchAndSetTransactions();
    await fetchAndSetUploads();
  });
  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    path: '/ws',
    auth: {
      token: localStorage.getItem('token'),
    },
  });

  socket.on('transaction:new', tx => {
    transactions.update(current => [tx, ...current.slice(0, 9)]);
  });

  socket.on('upload:new', upload => {
    formatDataset(upload);
    uploads.update(current => [upload, ...current.slice(0, 9)]);
  });
</script>

<div class="min-h-screen bg-gray-50 mt-4">
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <OverviewStats />
    <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4" on:click={simulateEvents}>
      Simulate Events
    </button>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <LiveTransactions />

      <DatasetUploads />
    </div>
  </main>
</div>
