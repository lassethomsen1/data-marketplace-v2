<script>
    let tabs = $state(['Overview', 'Features', 'Pricing']);
    let selectedTab = $state('Overview');
</script>
<div class="flex space-x-4 border-b-gray-400 border-b mb-4">
    {#each tabs as tab}
        <button
                class={`pb-2 border-b-2 font-medium w-2/3 ${
        tab === selectedTab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
      }`}
                onclick={() => selectedTab = tab}
        >
            {tab}
        </button>
    {/each}
</div>

{#if selectedTab === 'Overview'}
    <article class="text-wrap w-full">
        <h1>{selectedTab}</h1>
        <p class="text-left whitespace-normal break-words"></p>
    </article>
{:else if selectedTab === 'Features'}
    <p>Here are the features.</p>
{:else if selectedTab === 'Pricing'}
    <p>Check out our pricing plans.</p>
{/if}