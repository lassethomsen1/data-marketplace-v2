<script>
    import {fetchPurchasedDatasets} from "@/api/datasetsApi.js";
    import {onMount} from "svelte";

    const datasets = $state([]);

    onMount(async () => { // todo should be done in a store so i can check for purchased datasets in other components
        const purchases = await fetchPurchasedDatasets();
        console.log(purchases);
        purchases.forEach((purchase) => {
            datasets.push(purchase.dataset);
        })
    })
</script>

<div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow-md">
        <thead class="bg-gray-100">
        <tr>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Filetype</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Filesize</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        {#each datasets as dataset}
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-2 text-sm text-gray-900">{dataset.title}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{dataset.filetype}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{dataset.filesize}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{dataset.createdAt}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>