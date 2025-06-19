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
      title: 'Open Images AI Dataset',
      description:
        'A large collection of labeled images useful for computer vision tasks like object detection and image classification.',
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
    {
      id: 3,
      title: 'Healthcare Analytics Dataset',
      description:
        'Structured and anonymized patient data for machine learning applications in healthcare.',
      tags: ['healthcare', 'analytics', 'structured'],
      author: 'HealthAI',
      price: '$75',
    },
    {
      id: 4,
      title: 'Financial Transactions Dataset',
      description: 'Detailed financial records for anomaly detection and fraud detection models.',
      tags: ['finance', 'transactions', 'fraud'],
      author: 'FinTech Labs',
      price: '$60',
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
