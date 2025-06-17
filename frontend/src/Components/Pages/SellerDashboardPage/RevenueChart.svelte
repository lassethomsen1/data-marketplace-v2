<script>
    // Mock revenue data for the last 12 months
    let revenueData = $state([
        { month: 'Jan', revenue: 1200, sales: 8 },
        { month: 'Feb', revenue: 1800, sales: 12 },
        { month: 'Mar', revenue: 2400, sales: 16 },
        { month: 'Apr', revenue: 1900, sales: 13 },
        { month: 'May', revenue: 2800, sales: 19 },
        { month: 'Jun', revenue: 3200, sales: 22 },
        { month: 'Jul', revenue: 2900, sales: 20 },
        { month: 'Aug', revenue: 3600, sales: 25 },
        { month: 'Sep', revenue: 3100, sales: 21 },
        { month: 'Oct', revenue: 4200, sales: 28 },
        { month: 'Nov', revenue: 3800, sales: 26 },
        { month: 'Dec', revenue: 4500, sales: 31 }
    ]);

    let maxRevenue = $derived(Math.max(...revenueData.map(d => d.revenue)));
</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
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

    <div class="p-6">
        <div class="flex items-end space-x-2 h-64">
            {#each revenueData as data}
                <div class="flex-1 flex flex-col items-center space-y-2">
                    <div class="w-full flex flex-col items-center">
                        <div
                                class="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 relative group"
                                style="height: {(data.revenue / maxRevenue) * 200}px"
                        >
                            <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                ${data.revenue.toLocaleString()}
                            </div>
                        </div>
                        <div class="w-full h-4 bg-teal-500 rounded-b relative group">
                            <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {data.sales} sales
                            </div>
                        </div>
                    </div>
                    <span class="text-xs text-gray-600 font-medium">{data.month}</span>
                </div>
            {/each}
        </div>

        <div class="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">
                    ${revenueData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
                </div>
                <div class="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">
                    {revenueData.reduce((sum, d) => sum + d.sales, 0)}
                </div>
                <div class="text-sm text-gray-600">Total Sales</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">
                    ${(revenueData.reduce((sum, d) => sum + d.revenue, 0) / revenueData.reduce((sum, d) => sum + d.sales, 0)).toFixed(0)}
                </div>
                <div class="text-sm text-gray-600">Avg. Sale Value</div>
            </div>
        </div>
    </div>
</div>
