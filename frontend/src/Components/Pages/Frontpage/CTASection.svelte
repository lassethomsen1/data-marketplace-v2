<script>
import { handleSearch } from '@/utils/datasetUtil.js';
</script>

<section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl font-bold mb-4">Ready to Get Started?</h2>
    <p class="text-xl mb-8 text-blue-100">
      Join thousands of data professionals who trust DataMarket for their data needs.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
        onclick={(e) => handleSearch(e,'User')}
      >
        Browse Datasets
      </button>
      <button
        class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
      >
        Contact Sales
      </button>
    </div>
  </div>
</section>
