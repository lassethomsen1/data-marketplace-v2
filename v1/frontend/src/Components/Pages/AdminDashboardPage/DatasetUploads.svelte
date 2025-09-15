<script>
  import { uploads } from '@/stores/statsStore.js';
  import { getStatusColor } from '@/utils/datasetUtil.js';
</script>

<div class="bg-white rounded-lg shadow-md">
  <div class="px-6 py-4 border-b border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900">Dataset Upload Activity</h3>
  </div>

  <div class="max-h-96 overflow-y-auto">
    {#each $uploads as upload}
      <div class="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3">
              <span
                class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(upload.status)}"
              >
                {upload.status.toUpperCase()}
              </span>
              <span class="text-sm font-medium text-gray-900">{upload.title}</span>
            </div>
            <div class="mt-1 text-sm text-gray-600">
              <span class="font-medium">Seller:</span>
              {upload.seller.email} •
              <span class="font-medium">Size:</span>
              {upload.filesize}
            </div>
            <div class="mt-2 flex flex-wrap gap-1">
              {#each upload.tags as tag}
                <span class="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                  #{tag}
                </span>
              {/each}
            </div>
            <div class="mt-1 text-xs text-gray-500">
              {upload.timestamp?.toLocaleString() || upload.createdAt.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
