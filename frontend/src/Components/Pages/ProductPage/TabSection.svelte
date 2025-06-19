<script>
  import SampleTable from '@/Components/Pages/ProductPage/SampleTable.svelte';

  const { desc } = $props();
  let tabs = $state(['Description', 'Sample']);
  let selectedTab = $state('Description');
</script>

<div class="flex space-x-4 border-b-gray-400 border-b mb-4">
  {#each tabs as tab}
    <button
      class={`pb-2 border-b-2 font-medium w-2/3 ${
        tab === selectedTab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
      }`}
      onclick={() => (selectedTab = tab)}
    >
      {tab}
    </button>
  {/each}
</div>

{#if selectedTab === 'Description'}
  <article class="text-wrap w-full">
    <p class="text-left whitespace-normal break-words">
      {desc}
    </p>
  </article>
{:else if selectedTab === 'Sample'}
  <SampleTable />
{/if}
