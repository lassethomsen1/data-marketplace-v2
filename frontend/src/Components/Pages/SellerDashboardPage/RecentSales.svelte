<script>
    let recentSales = $state([
        {
            id: 'sale_001',
            dataset: 'Customer Analytics Dataset',
            buyer: 'john.doe@startup.com',
            amount: 299.99,
            date: new Date('2024-03-15T14:30:00'),
            paymentStatus: 'completed'
        },
        {
            id: 'sale_002',
            dataset: 'Financial Time Series Data',
            buyer: 'analyst@fintech.io',
            amount: 199.50,
            date: new Date('2024-03-14T09:15:00'),
            paymentStatus: 'completed'
        },
        {
            id: 'sale_003',
            dataset: 'E-commerce User Behavior',
            buyer: 'data@retailcorp.com',
            amount: 149.99,
            date: new Date('2024-03-13T16:45:00'),
            paymentStatus: 'pending'
        },
        {
            id: 'sale_004',
            dataset: 'Social Media Sentiment Analysis',
            buyer: 'research@university.edu',
            amount: 89.99,
            date: new Date('2024-03-12T11:20:00'),
            paymentStatus: 'completed'
        },
        {
            id: 'sale_005',
            dataset: 'Customer Analytics Dataset',
            buyer: 'marketing@agency.com',
            amount: 299.99,
            date: new Date('2024-03-11T13:10:00'),
            paymentStatus: 'completed'
        }
    ]);

    function getPaymentStatusColor(status) {
        switch(status) {
            case 'completed': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'failed': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }
</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Recent Sales</h3>
            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Sales →
            </button>
        </div>
    </div>

    <div class="divide-y divide-gray-200">
        {#each recentSales as sale}
            <div class="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900">{sale.dataset}</div>
                                <div class="text-sm text-gray-600">Sold to: {sale.buyer}</div>
                                <div class="text-xs text-gray-500">{sale.date.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-semibold text-gray-900">${sale.amount}</div>
                        <span class="px-2 py-1 text-xs font-medium rounded-full {getPaymentStatusColor(sale.paymentStatus)}">
              {sale.paymentStatus.toUpperCase()}
            </span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
