<script>
  import { Search } from 'lucide-svelte';
  import { handleSearch } from '@/utils/datasetUtil.js';
  let searchQuery = $state('');
</script>

<section class="py-12 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Find Your Perfect Dataset</h2>
      <form class="flex flex-col md:flex-row gap-4" onsubmit={e => handleSearch(e, searchQuery)}>
        <div class="flex-1 relative">
          <Search
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
          />
          <input
            bind:value={searchQuery}
            type="text"
            placeholder="Search datasets by keyword, category, or format..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  </div>
</section>
