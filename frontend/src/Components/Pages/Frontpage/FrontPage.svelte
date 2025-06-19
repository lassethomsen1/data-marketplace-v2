<script>
  import { onMount } from 'svelte';
  import { fetchDatasets } from '@/api/datasetsApi.js';
  import { formatDataset } from '@/utils/datasetUtil.js';

  import HeroSection from '@/Components/Pages/Frontpage/HeroSection.svelte';
  import SearchSection from '@/Components/Pages/Frontpage/SearchSection.svelte';
  import FeatureDatasetsSection from '@/Components/Pages/Frontpage/FeatureDatasetsSection.svelte';
  import CTASection from '@/Components/Pages/Frontpage/CTASection.svelte';

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
    fetchedDatasets.datasets.forEach(dataset => {
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
