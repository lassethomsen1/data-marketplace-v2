<script>
    import { downloadDataset } from "@/api/datasetsApi.js";
    import { purchases } from "@/stores/userStore.js";

    async function handleDownload(datasetId) {
        const res = await downloadDataset(datasetId);
        console.log(res)

        const link = document.createElement('a');
        link.href = res.downloadUrl;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

</script>

<div class="overflow-x-auto rounded-lg">
    <table class="min-w-full divide-y divide-gray-300 bg-white  shadow-md">
        <thead class="bg-gray-100">
        <tr>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Filetype</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Filesize</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700"></th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        {#each $purchases as dataset}
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-2 text-sm text-gray-900">{dataset.title}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{dataset.filetype}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{dataset.filesize}</td>
                <td class="px-4 py-2 text-sm text-gray-600">{dataset.createdAt}</td>
                <td class="px-4 py-2 text-sm text-gray-600">
                    <button onclick={() => handleDownload(dataset.id)}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                        Download
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>