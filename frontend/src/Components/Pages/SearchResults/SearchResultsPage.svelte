<script>
  import { Search } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { searchDatasets } from '@/api/datasetsApi.js';
  import { formatDataset } from '@/utils/datasetUtil.js';
  import { searchResults, isLoading } from '@/stores/searchResultStore.js';
  import Results from '@/Components/Pages/SearchResults/Results.svelte';
  let { searchQuery } = $props();
  let prevSearchQuery = $state(searchQuery || '');

  let error = $state(null);

  async function performSearch(query, page = 1) {
    if (!query) return;

    $isLoading = true;
    error = null;

    try {
      const response = await searchDatasets({
        search: query,
        page: page,
        limit: 20,
        status: 'AVAILABLE',
      });

      if (response.datasets && response.pagination) {
        $searchResults.datasets = response.datasets.map(dataset => formatDataset(dataset));
        $searchResults.pagination = response.pagination;
      } else {
        console.error('Unexpected response format:', response);
        error = 'Unexpected response format';
      }
    } catch (err) {
      console.error('Search error:', err);
      error = 'Failed to search datasets';
    } finally {
      $isLoading = false;
    }
  }

  function goToPage(page) {
    performSearch(searchQuery, page);
  }

  onMount(async () => {
    if (searchQuery) {
      await performSearch(searchQuery);
    }
  });

  function handleSearch() {
    if (searchQuery.trim() === prevSearchQuery) return;
    prevSearchQuery = searchQuery.trim();
    performSearch(searchQuery, 1);
  }
</script>

<div class="min-h-screen bg-gray-50">
  <div class="bg-white border-b">
    <div class="max-w-4xl mx-auto px-4 py-6">
      <div class="flex gap-3">
        <div class="flex-1 relative">
          <Search
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
          />
          <input
            bind:value={searchQuery}
            type="text"
            placeholder="Search datasets..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onkeydown={e => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button
          onclick={handleSearch}
          disabled={$isLoading}
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {$isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  </div>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Search Results</h1>
      {#if prevSearchQuery}
        <p class="text-gray-600">
          {$isLoading
            ? 'Searching...'
            : `${$searchResults.pagination.totalCount} datasets found for "${prevSearchQuery}"`}
        </p>
      {/if}
    </div>
    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    {:else if $isLoading}
      <div class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
        ></div>
        <p class="mt-2 text-gray-600">Loading datasets...</p>
      </div>
    {:else if $searchResults.datasets.length === 0}
      <div class="text-center py-8">
        <p class="text-gray-600">No datasets found. Try a different search term.</p>
      </div>
    {:else}
      <Results />
    {/if}
  </div>
  {#if $searchResults.pagination.totalPages > 1}
    <div class="flex justify-center items-center gap-4 mt-8">
      <button
        onclick={() => goToPage($searchResults.pagination.currentPage - 1)}
        disabled={!$searchResults.pagination.hasPreviousPage}
        class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span class="text-gray-600">
        Page {$searchResults.pagination.currentPage} of {$searchResults.pagination.totalPages}
      </span>

      <button
        onclick={() => goToPage($searchResults.pagination.currentPage + 1)}
        disabled={!$searchResults.pagination.hasNextPage}
        class="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  {/if}
</div>
