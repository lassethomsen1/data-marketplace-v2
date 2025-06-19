<script>
  import { DollarSign, HardDrive, ShoppingCart } from 'lucide-svelte';

  let { sellerData } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Total Earnings</p>
        <p class="text-3xl font-bold text-gray-900">${sellerData.totalEarnings.toLocaleString()}</p>
      </div>
      <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <DollarSign class="text-green-600" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Total Sales</p>
        <p class="text-3xl font-bold text-gray-900">{sellerData.totalSales}</p>
      </div>
      <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <ShoppingCart class="text-blue-600" />
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">Active Datasets</p>
        <p class="text-3xl font-bold text-gray-900">{sellerData.activeDatasets}</p>
      </div>
      <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <HardDrive class="text-purple-600" />
      </div>
    </div>
  </div>
</div>
