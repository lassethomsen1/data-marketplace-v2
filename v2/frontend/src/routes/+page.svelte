<script>
    import { onMount } from 'svelte';
    import { fetchDatasets } from '@/lib/api/datasetsApi.js';
    import { formatDataset } from '@/lib/utils/datasetUtil.js';

    import HeroSection from '@/lib/components/frontpage/HeroSection.svelte';
    import SearchSection from '@/lib/components/frontpage/SearchSection.svelte';
    import FeatureDatasetsSection from '@/lib/components/frontpage/FeatureDatasetsSection.svelte';
    import CTASection from '@/lib/components/frontpage/CTASection.svelte';

    const datasets = $state([
        {
            id: 1,
            title: 'City Weather Dataset',
            description:
                'This dataset captures real-time weather observations for 10 major global cities. It includes key meteorological attributes that describe current atmospheric conditions in each location. These features provide valuable insights for weather analysis, travel planning, or climate-related research.',
            tags: ['images', 'vision', 'open'],
            author: 'Jane Doe',
            price: '$50',
        },
        {
            id: 2,
            title: 'Text Corpus for NLP',
            description:
                'Millions of cleaned text entries for training language models, chatbots, and other NLP tools.',
            tags: ['text', 'nlp', 'language'],
            author: 'John Smith',
            price: '$35',
        },
    ]);
    onMount(async () => {
        const fetchedDatasets = await fetchDatasets();
        fetchedDatasets.datasets.forEach(dataset => { //todo: fix type
            dataset = formatDataset(dataset);
            datasets.push(dataset);
        });
    });
</script>

<div class="min-h-screen bg-white">
    <HeroSection />

    <FeatureDatasetsSection {datasets} />

    <SearchSection />

    <CTASection />
</div>
