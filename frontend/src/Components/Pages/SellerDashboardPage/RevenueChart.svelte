<script>
  import { sellerRevenue } from '@/stores/statsStore.js';
</script>

<div class="bg-white rounded-lg shadow-md">
  <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0"
    >
      <h3 class="text-lg font-semibold text-gray-900">Revenue Overview</h3>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span class="text-sm text-gray-600">Revenue</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-teal-500 rounded-full"></div>
          <span class="text-sm text-gray-600">Sales Count</span>
        </div>
      </div>
    </div>
  </div>

  <div class="p-4 sm:p-6">
    <div class="flex items-end space-x-1 sm:space-x-2 h-48 sm:h-64">
      {#each $sellerRevenue.revenueData as data}
        <div class="flex-1 flex flex-col items-center space-y-2 min-w-0">
          <div class="w-full flex flex-col items-center">
            <div
              class="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 relative group"
              style="height: {(data.revenue / $sellerRevenue.maxRevenue) * 160}px"
            >
              <div
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
              >
                ${data.revenue.toLocaleString()}
              </div>
            </div>
          </div>
          <span class="text-xs text-gray-600 font-medium truncate w-full text-center"
            >{data.month}</span
          >
        </div>
      {/each}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
      <div class="text-center">
        <div class="text-xl sm:text-2xl font-bold text-gray-900">
          ${$sellerRevenue.revenueData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
        </div>
        <div class="text-sm text-gray-600">Total Revenue</div>
      </div>
      <div class="text-center">
        <div class="text-xl sm:text-2xl font-bold text-gray-900">
          {$sellerRevenue.revenueData.reduce((sum, d) => sum + d.sales, 0)}
        </div>
        <div class="text-sm text-gray-600">Total Sales</div>
      </div>
      <div class="text-center">
        <div class="text-xl sm:text-2xl font-bold text-gray-900">
          ${(
            $sellerRevenue.revenueData.reduce((sum, d) => sum + d.revenue, 0) /
            $sellerRevenue.revenueData.reduce((sum, d) => sum + d.sales, 0)
          ).toFixed(0)}
        </div>
        <div class="text-sm text-gray-600">Avg. Sale Value</div>
      </div>
    </div>
  </div>
</div>
