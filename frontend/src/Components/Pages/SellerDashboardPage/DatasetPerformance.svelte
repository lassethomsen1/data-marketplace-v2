<script>
    let datasets = $state([
        {
            id: 1,
            name: "Customer Analytics Dataset",
            price: 299.99,
            sales: 45,
            revenue: 13499.55,
            views: 1250,
            conversionRate: 3.6,
            status: "active",
            uploadDate: "2024-01-15"
        },
        {
            id: 2,
            name: "Financial Time Series Data",
            price: 199.50,
            sales: 32,
            revenue: 6384.00,
            views: 890,
            conversionRate: 3.6,
            status: "active",
            uploadDate: "2024-02-03"
        },
        {
            id: 3,
            name: "E-commerce User Behavior",
            price: 149.99,
            sales: 28,
            revenue: 4199.72,
            views: 756,
            conversionRate: 3.7,
            status: "active",
            uploadDate: "2024-02-20"
        },
        {
            id: 4,
            name: "Social Media Sentiment Analysis",
            price: 89.99,
            sales: 51,
            revenue: 4589.49,
            views: 1420,
            conversionRate: 3.6,
            status: "active",
            uploadDate: "2024-03-10"
        },
        {
            id: 5,
            name: "Healthcare Patient Records",
            price: 399.99,
            sales: 12,
            revenue: 4799.88,
            views: 445,
            conversionRate: 2.7,
            status: "pending",
            uploadDate: "2024-03-25"
        }
    ]);

    function getStatusColor(status) {
        switch(status) {
            case 'active': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }
</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Dataset Performance</h3>
            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Datasets →
            </button>
        </div>
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dataset
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each datasets as dataset}
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div>
                            <div class="text-sm font-medium text-gray-900">{dataset.name}</div>
                            <div class="text-sm text-gray-500">{dataset.views.toLocaleString()} views</div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${dataset.price}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dataset.sales}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${dataset.revenue.toLocaleString()}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dataset.conversionRate}%
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(dataset.status)}">
                {dataset.status.toUpperCase()}
              </span>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
