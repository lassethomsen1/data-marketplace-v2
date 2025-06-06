<script>
    let transactions = $state([
        {
            id: 'tx_001',
            type: 'purchase',
            buyer: 'john.doe@email.com',
            seller: 'DataCorp Inc.',
            dataset: 'Customer Analytics Dataset',
            amount: 299.99,
            timestamp: new Date(Date.now() - 30000)
        },
        {
            id: 'tx_002',
            type: 'sale',
            buyer: 'analytics@startup.com',
            seller: 'ML Research Lab',
            dataset: 'Financial Time Series',
            amount: 149.50,
            timestamp: new Date(Date.now() - 120000)
        },
        {
            id: 'tx_003',
            type: 'refund',
            buyer: 'support@company.com',
            seller: 'Data Solutions',
            dataset: 'Marketing Dataset',
            amount: -89.99,
            timestamp: new Date(Date.now() - 300000)
        }
    ]);

    setInterval(() => {
        const types = ['purchase', 'sale', 'refund'];
        const buyers = ['user1@email.com', 'buyer@corp.com', 'data@startup.io'];
        const sellers = ['DataVendor', 'ML Corp', 'Analytics Inc'];
        const datasets = ['Sales Data', 'User Behavior', 'Market Research', 'Financial Data'];

        const newTransaction = {
            id: `tx_${Date.now()}`,
            type: types[Math.floor(Math.random() * types.length)],
            buyer: buyers[Math.floor(Math.random() * buyers.length)],
            seller: sellers[Math.floor(Math.random() * sellers.length)],
            dataset: datasets[Math.floor(Math.random() * datasets.length)],
            amount: Math.random() > 0.1 ? Math.floor(Math.random() * 500) + 50 : -(Math.floor(Math.random() * 200) + 25),
            timestamp: new Date()
        };

        transactions = [newTransaction, ...transactions.slice(0, 9)];
    }, 8000);

    function getTypeColor(type) {
        switch(type) {
            case 'purchase': return 'text-blue-600 bg-blue-100';
            case 'sale': return 'text-green-600 bg-green-100';
            case 'refund': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }
</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Live Transactions Feed</h3>
            <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-sm text-gray-500">Live</span>
            </div>
        </div>
    </div>

    <div class="max-h-96 overflow-y-auto">
        {#each transactions as transaction (transaction.id)}
            <div class="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
              <span class="px-2 py-1 text-xs font-medium rounded-full {getTypeColor(transaction.type)}">
                {transaction.type.toUpperCase()}
              </span>
                            <span class="text-sm font-medium text-gray-900">{transaction.dataset}</span>
                        </div>
                        <div class="mt-1 text-sm text-gray-600">
                            <span class="font-medium">Buyer:</span> {transaction.buyer} •
                            <span class="font-medium">Seller:</span> {transaction.seller}
                        </div>
                        <div class="mt-1 text-xs text-gray-500">
                            {transaction.timestamp.toLocaleString()}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-semibold {transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}">
                            ${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
