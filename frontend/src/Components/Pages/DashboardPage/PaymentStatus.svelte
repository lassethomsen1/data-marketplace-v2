<script>
    let payments = $state([
        {
            id: 'pay_001',
            type: 'payment_succeeded',
            amount: 299.99,
            customer: 'john.doe@email.com',
            paymentMethod: 'card_****4242',
            timestamp: new Date(Date.now() - 45000)
        },
        {
            id: 'pay_002',
            type: 'payment_failed',
            amount: 149.50,
            customer: 'buyer@corp.com',
            paymentMethod: 'card_****1234',
            error: 'Insufficient funds',
            timestamp: new Date(Date.now() - 180000)
        },
        {
            id: 'pay_003',
            type: 'payout_initiated',
            amount: 450.00,
            recipient: 'seller@datacorp.com',
            timestamp: new Date(Date.now() - 300000)
        }
    ]);

    setInterval(() => {
        const types = ['payment_succeeded', 'payment_failed', 'payout_initiated', 'payout_completed'];
        const customers = ['user1@test.com', 'buyer@startup.com', 'customer@corp.io'];
        const errors = ['Insufficient funds', 'Card declined', 'Invalid card', 'Network error'];

        const type = types[Math.floor(Math.random() * types.length)];
        const newPayment = {
            id: `pay_${Date.now()}`,
            type,
            amount: Math.floor(Math.random() * 500) + 50,
            customer: customers[Math.floor(Math.random() * customers.length)],
            paymentMethod: `card_****${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
            timestamp: new Date()
        };

        if (type === 'payment_failed') {
            newPayment.error = errors[Math.floor(Math.random() * errors.length)];
        }

        payments = [newPayment, ...payments.slice(0, 9)];
    }, 10000);

    function getPaymentTypeColor(type) {
        switch(type) {
            case 'payment_succeeded': return 'text-green-600 bg-green-100';
            case 'payment_failed': return 'text-red-600 bg-red-100';
            case 'payout_initiated': return 'text-blue-600 bg-blue-100';
            case 'payout_completed': return 'text-teal-600 bg-teal-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }

    function formatPaymentType(type) {
        return type.replace('_', ' ').toUpperCase();
    }
</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Payment & Payout Status</h3>
    </div>

    <div class="max-h-96 overflow-y-auto">
        {#each payments as payment (payment.id)}
            <div class="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
              <span class="px-2 py-1 text-xs font-medium rounded-full {getPaymentTypeColor(payment.type)}">
                {formatPaymentType(payment.type)}
              </span>
                            <span class="text-lg font-semibold text-gray-900">${payment.amount.toFixed(2)}</span>
                        </div>
                        <div class="mt-1 text-sm text-gray-600">
                            <span class="font-medium">Customer:</span> {payment.customer}
                        </div>
                        {#if payment.paymentMethod}
                            <div class="mt-1 text-sm text-gray-600">
                                <span class="font-medium">Method:</span> {payment.paymentMethod}
                            </div>
                        {/if}
                        {#if payment.error}
                            <div class="mt-1 text-sm text-red-600">
                                <span class="font-medium">Error:</span> {payment.error}
                            </div>
                        {/if}
                        <div class="mt-1 text-xs text-gray-500">
                            {payment.timestamp.toLocaleString()}
                        </div>
                    </div>
                    {#if payment.type === 'payment_failed'}
                        <div class="text-red-500">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>
