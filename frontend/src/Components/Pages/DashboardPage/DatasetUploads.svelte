<script>
    let uploads = $state([
        {
            id: 'up_001',
            seller: 'DataScience Pro',
            fileName: 'customer_segmentation.csv',
            fileSize: '2.4 MB',
            tags: ['marketing', 'analytics', 'customer'],
            status: 'approved',
            timestamp: new Date(Date.now() - 60000)
        },
        {
            id: 'up_002',
            seller: 'ML Research',
            fileName: 'financial_timeseries.json',
            fileSize: '15.7 MB',
            tags: ['finance', 'timeseries', 'trading'],
            status: 'pending',
            timestamp: new Date(Date.now() - 180000)
        },
        {
            id: 'up_003',
            seller: 'Analytics Corp',
            fileName: 'social_media_data.parquet',
            fileSize: '8.9 MB',
            tags: ['social', 'sentiment', 'nlp'],
            status: 'rejected',
            timestamp: new Date(Date.now() - 420000)
        }
    ]);

    setInterval(() => {
        const sellers = ['DataVendor LLC', 'AI Solutions', 'Research Lab', 'Analytics Pro'];
        const files = ['dataset.csv', 'model_data.json', 'training_set.parquet', 'features.xlsx'];
        const tagSets = [
            ['ml', 'training'],
            ['finance', 'stocks'],
            ['healthcare', 'medical'],
            ['retail', 'sales']
        ];
        const statuses = ['pending', 'approved', 'rejected'];

        const newUpload = {
            id: `up_${Date.now()}`,
            seller: sellers[Math.floor(Math.random() * sellers.length)],
            fileName: files[Math.floor(Math.random() * files.length)],
            fileSize: `${(Math.random() * 50 + 1).toFixed(1)} MB`,
            tags: tagSets[Math.floor(Math.random() * tagSets.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            timestamp: new Date()
        };

        uploads = [newUpload, ...uploads.slice(0, 9)];
    }, 12000);

    function getStatusColor(status) {
        switch(status) {
            case 'approved': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }
</script>

<div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Dataset Upload Activity</h3>
    </div>

    <div class="max-h-96 overflow-y-auto">
        {#each uploads as upload (upload.id)}
            <div class="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3">
              <span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(upload.status)}">
                {upload.status.toUpperCase()}
              </span>
                            <span class="text-sm font-medium text-gray-900">{upload.fileName}</span>
                        </div>
                        <div class="mt-1 text-sm text-gray-600">
                            <span class="font-medium">Seller:</span> {upload.seller} •
                            <span class="font-medium">Size:</span> {upload.fileSize}
                        </div>
                        <div class="mt-2 flex flex-wrap gap-1">
                            {#each upload.tags as tag}
                <span class="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                  #{tag}
                </span>
                            {/each}
                        </div>
                        <div class="mt-1 text-xs text-gray-500">
                            {upload.timestamp.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
