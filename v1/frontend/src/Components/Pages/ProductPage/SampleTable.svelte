<script>
  import { dataset } from '@/stores/datasetStore.js';
  const sample = $dataset.sampleData || [];
  const columns = sample.length > 0 ? Object.keys(sample[0]) : [];
</script>

<div class="overflow-x-auto rounded-lg border border-gray-300 shadow-sm mb-4">
  <table class="min-w-full text-sm text-left text-gray-700">
    <thead class="bg-gray-100 text-xs uppercase tracking-wider text-gray-600">
      <tr>
        {#each columns as col}
          <th class="px-4 py-3 whitespace-nowrap">{col}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#each sample as row}
        <tr>
          {#each columns as col}
            <td class="px-4 py-2 whitespace-nowrap">{row[col]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
