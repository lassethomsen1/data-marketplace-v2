<script>
    import {DollarSign} from "lucide-svelte";

    let {sellerData} = $props();


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
                    <DollarSign class="text-green-600"/>
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
