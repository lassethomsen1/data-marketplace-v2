<script>
  import { navigate } from 'svelte-routing';
  import { User } from 'lucide-svelte';
  import { searchResults } from '@/stores/searchResultStore.js';
</script>

<div class="space-y-6">
  {#each $searchResults.datasets as dataset}
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {dataset.title}
          </h2>
          <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span class="flex items-center gap-1">
              <User class="h-4 w-4" />
              {dataset.seller?.name || 'Unknown'}
            </span>
            <span>{dataset.filetype}</span>
            <span>{dataset.filesize}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-600 mb-2">
            {dataset.price}
          </div>
          <button
            onclick={() => navigate(`/dataset/${dataset.id}`)}
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            View Dataset
          </button>
        </div>
      </div>

      <p class="text-gray-700 mb-4">
        {dataset.description.length > 250
          ? dataset.description.slice(0, 250) + '...'
          : dataset.description}
      </p>

      <div class="flex items-center gap-2">
        {#each dataset.tags || [] as tag}
          <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
            #{tag}
          </span>
        {/each}
        {#if dataset.category}
          <span class="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
            {dataset.category}
          </span>
        {/if}
      </div>
    </div>
  {/each}
</div>
