<script>
    import { transactions } from "@/stores/statsStore.js";
    import { getStatusColor } from "@/utils/datasetUtil.js";


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
        {#each $transactions as transaction}
            <div class="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
              <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(transaction.status)}">
                {transaction.status.toUpperCase()}
              </span>
                            <span class="text-sm font-medium text-gray-900">{transaction.dataset.title}</span>
                        </div>
                        <div class="mt-1 text-sm text-gray-600">
                            <span class="font-medium">Buyer:</span> {transaction.buyer.email} •
                            <span class="font-medium">Seller:</span> {transaction.dataset.seller.email}
                        </div>
                        <div class="mt-1 text-xs text-gray-500">
                            {transaction.timestamp?.toLocaleString() || transaction.createdAt.toLocaleString()}
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-semibold {transaction.dataset.price >= 0 ? 'text-green-600' : 'text-red-600'}">
                            ${Math.abs(transaction.dataset.price / 100).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
