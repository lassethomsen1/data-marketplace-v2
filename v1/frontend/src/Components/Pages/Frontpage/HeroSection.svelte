<script>
  import { handleSearch } from '@/utils/datasetUtil.js';
</script>

<section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-5xl md:text-6xl font-bold mb-6">Discover Premium Datasets</h1>
    <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
      Access high-quality, curated datasets from trusted sources. Power your AI, research, and
      analytics projects with reliable data.
    </p>
    <button
      class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
      onclick={e => handleSearch(e, 'User')}
    >
      Explore Datasets
    </button>
  </div>
</section>
