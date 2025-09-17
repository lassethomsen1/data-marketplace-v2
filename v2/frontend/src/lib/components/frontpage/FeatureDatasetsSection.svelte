<script>
  import ItemCard from '$lib/components/platform/ItemCard.svelte';
  import { handleSearch } from '$lib/utils/datasetUtil.js';
  const { datasets } = $props();
</script>

<section class="py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Featured Datasets</h2>
    </div>
  </div>
</section>

<section class="pb-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each datasets as dataset}
        <ItemCard item={dataset} />
      {/each}
    </div>

    <div class="text-center mt-12">
      <button
        class="bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
        onclick={e => handleSearch(e, 'User')}
      >
        View All Datasets
      </button>
    </div>
  </div>
</section>
