<script>
    import { getStatusColor} from "@/utils/datasetUtil.js";
    import { sellerStats } from "@/stores/statsStore.js";
    import {ShoppingBag} from "lucide-svelte";

</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Recent Sales</h3>
        </div>
    </div>

    <div class="divide-y divide-gray-200">
        {#each $sellerStats.recentSales as sale}
            <div class="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <ShoppingBag class="text-blue-500" />
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900">{sale.dataset.title}</div>
                                <div class="text-sm text-gray-600">Sold to: {sale.buyer.email}</div>
                                <div class="text-xs text-gray-500">{sale.createdAt}</div>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-semibold text-gray-900">${(sale.paidAmount / 100).toFixed(2) }</div>
                        <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(sale.status)}">
              {sale.status.toUpperCase()}
            </span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
