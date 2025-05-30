<script>


    // Sample datasets data
    import {formatDataset} from "@/utils/datasetUtil.js";

    let datasets = [
        {
            id: 1,
            title: "Customer Analytics Dataset",
            fileType: "CSV",
            filesize: 2547892,
            price: 2999,
            createdAt: new Date('2024-01-15'),
            tags: ["analytics", "customer", "sales"]
        },
        {
            id: 2,
            title: "Weather Patterns 2023",
            fileType: "JSON",
            filesize: 15678234,
            price: 4999,
            createdAt: new Date('2024-02-03'),
            tags: ["weather", "climate", "time-series"]
        },
        {
            id: 3,
            title: "E-commerce Product Catalog",
            fileType: "XML",
            filesize: 8934567,
            price: 1999,
            createdAt: new Date('2024-01-28'),
            tags: ["ecommerce", "products", "retail"]
        },
        {
            id: 4,
            title: "Social Media Sentiment Analysis",
            fileType: "PARQUET",
            filesize: 45678901,
            price: 7999,
            createdAt: new Date('2024-02-10'),
            tags: ["sentiment", "social-media", "nlp", "machine-learning"]
        },
        {
            id: 5,
            title: "Financial Market Data",
            fileType: "CSV",
            filesize: 12345678,
            price: 99999,
            createdAt: new Date('2024-01-20'),
            tags: ["finance", "stocks", "market"]
        },
        {
            id: 6,
            title: "Healthcare Patient Records",
            fileType: "JSON",
            filesize: 6789012,
            price: 14999,
            createdAt: new Date('2024-02-05'),
            tags: ["healthcare", "medical", "patients", "anonymized"]
        }
    ];
    datasets.forEach((dataset) =>{
        formatDataset(dataset);
    })

    let searchTerm = $state('');
    let selectedTag = $state('');

    // Get all unique tags
    const allTags = () => {
        const tags = new Set();
        datasets.forEach(dataset => {
            dataset.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    };

    // Filter datasets based on search and tag
    const filteredDatasets = () => {
        return datasets.filter(dataset => {
            const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag = !selectedTag || dataset.tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    };

    function getFileTypeColor(fileType) {
        const colors = {
            'CSV': 'bg-green-100 text-green-800',
            'JSON': 'bg-blue-100 text-blue-800',
            'XML': 'bg-purple-100 text-purple-800',
            'PARQUET': 'bg-orange-100 text-orange-800'
        };
        return colors[fileType] || 'bg-gray-100 text-gray-800';
    }
</script>

<div class="min-h-screen bg-light-gray">
    <!-- Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <!-- Search -->
            <div class="flex-1">
                <input
                        type="text"
                        placeholder="Search purchased datasets..."
                        bind:value={searchTerm}
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none"
                />
            </div>

            <!-- Tag Filter -->
            <div class="sm:w-48">
                <select
                        bind:value={selectedTag}
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none bg-white"
                >
                    <option value="">All Tags</option>
                    {#each allTags() as tag}
                        <option value={tag}>{tag}</option>
                    {/each}
                </select>
            </div>
        </div>

        <!-- Datasets Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredDatasets() as dataset (dataset.id)}
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
                    <!-- Card Header -->
                    <div class="p-6 pb-4">
                        <div class="flex items-start justify-between mb-3">
                            <h3 class="text-lg font-semibold text-dark-gray line-clamp-2 flex-1 text-ellipsis truncate">
                                {dataset.title}
                            </h3>
                            <span class="ml-3 px-2 py-1 text-xs font-medium rounded-full {getFileTypeColor(dataset.fileType)}">
                {dataset.fileType}
              </span>
                        </div>

                        <!-- Metadata -->
                        <div class="space-y-2 text-sm text-medium-gray">
                            <div class="flex items-center justify-between">
                                <span>Size:</span>
                                <span class="font-medium">{dataset.filesize}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>Created:</span>
                                <span class="font-medium">{dataset.createdAt}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span>Price:</span>
                                <span class="font-semibold text-success-green">{dataset.price}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Tags -->
                    <div class="px-6 pb-4">
                        <div class="flex flex-wrap gap-1">
                            {#each dataset.tags as tag}
                <span class="px-2 py-1 text-xs font-medium bg-accent-teal/10 text-accent-teal rounded-full">
                  {tag}
                </span>
                            {/each}
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="px-6 py-4 bg-light-gray border-t border-gray-100 mt-auto">
                        <div class="flex space-x-2">
                            <button class="flex-1 bg-primary-blue text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-deep-navy transition-colors duration-200" aria-label="View Dataset">
                                View
                            </button>
                            <button class="flex-1 bg-white text-medium-gray border border-gray-300 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200" aria-label="Download Dataset">
                                Download
                            </button>
                            <button class="px-3 py-2 text-medium-gray hover:text-dark-gray transition-colors duration-200" aria-label="More Options">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Empty State -->
        {#if filteredDatasets().length === 0}
            <div class="text-center py-12">
                <div class="w-24 h-24 mx-auto mb-4 bg-light-gray rounded-full flex items-center justify-center">
                    <svg class="w-12 h-12 text-medium-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-dark-gray mb-2">No datasets found</h3>
                <p class="text-medium-gray mb-4">Try adjusting your search or filter criteria</p>
                <button class="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-deep-navy transition-colors duration-200 font-medium" aria-label="Clear Filters">
                    Clear Filters
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    :global(:root) {
        --primary-blue: #3B82F6;
        --deep-navy: #1E40AF;
        --accent-teal: #0EA5E9;
        --subtle-purple: #8B5CF6;
        --dark-gray: #1F2937;
        --medium-gray: #6B7280;
        --light-gray: #F3F4F6;
        --white: #FFFFFF;
        --success-green: #10B981;
        --warning-yellow: #F59E0B;
        --error-red: #EF4444;
    }

    :global(.bg-primary-blue) { background-color: var(--primary-blue); }
    :global(.bg-deep-navy) { background-color: var(--deep-navy); }
    :global(.bg-accent-teal) { background-color: var(--accent-teal); }
    :global(.bg-light-gray) { background-color: var(--light-gray); }
    :global(.text-primary-blue) { color: var(--primary-blue); }
    :global(.text-deep-navy) { color: var(--deep-navy); }
    :global(.text-accent-teal) { color: var(--accent-teal); }
    :global(.text-dark-gray) { color: var(--dark-gray); }
    :global(.text-medium-gray) { color: var(--medium-gray); }
    :global(.text-success-green) { color: var(--success-green); }

    :global(.line-clamp-2) {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
