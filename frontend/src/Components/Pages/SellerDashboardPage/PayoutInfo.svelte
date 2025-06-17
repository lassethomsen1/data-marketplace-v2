<script>
    let {sellerData} = $props();

    let payoutHistory = $state([
        {
            id: 'payout_001',
            amount: 2456.78,
            date: new Date('2024-03-01'),
            status: 'completed',
            method: 'Bank Transfer'
        },
        {
            id: 'payout_002',
            amount: 1890.45,
            date: new Date('2024-02-01'),
            status: 'completed',
            method: 'Bank Transfer'
        },
        {
            id: 'payout_003',
            amount: 3234.56,
            date: new Date('2024-01-01'),
            status: 'completed',
            method: 'Bank Transfer'
        }
    ]);

</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Payout Information</h3>
    </div>

    <div class="p-6">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="text-lg font-semibold text-green-800">Pending Payout</h4>
                    <p class="text-3xl font-bold text-green-900">${sellerData.pendingPayout.toLocaleString()}</p>
                </div>
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                </div>
            </div>
        </div>

        <div>
            <h4 class="text-md font-medium text-gray-900 mb-3">Recent Payouts</h4>
            <div class="space-y-3">
                {#each sellerData.payoutHistory as payout}
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="text-sm font-medium text-gray-900">{payout.amount.toLocaleString()} {payout.currency.toUpperCase()}</div>
                            <div class="text-xs text-gray-600">{payout.createdAt}</div>
                        </div>
                        <span class="px-2 py-1 text-xs font-medium rounded-full text-green-600 bg-green-100">
              COMPLETED
            </span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
