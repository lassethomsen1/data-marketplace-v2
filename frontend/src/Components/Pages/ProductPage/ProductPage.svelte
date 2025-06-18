<script>
    import StatContainer from "../../platform/StatContainer.svelte";
    import TabSection from "./TabSection.svelte";
    import {onMount} from "svelte";
    import {purchaseDataset} from "@/api/datasetsApi.js";
    import {fetchAndFormatDataset, dataset} from "@/stores/datasetStore.js";

    const {datasetId} = $props();


    onMount(async () => {
        await fetchAndFormatDataset(datasetId);
    });
</script>
<div class="flex flex-col justify-center items-center mt-4">
    <div class="flex flex-col w-full max-w-3xl">
        <h1 class="text-4xl">{$dataset.title}</h1>
        <p class="text-gray-400 font-semibold text-xl mb-2">{$dataset.author}</p>
        <div class="flex flex-row mb-4">
            <div>
                <StatContainer stat={$dataset.filesize}/>
                <StatContainer stat={$dataset.filetype}/>
                <StatContainer stat={$dataset.updatedAt}/>
            </div>
            <div class="ml-auto">
                <StatContainer stat={$dataset.price} className={"bg-[#3B82F6] text-white"}/>
                <button onclick={purchaseDataset($dataset.id)}
                        class="bg-[#3B82F6] hover:bg-[#1E40AF] rounded-lg text-white px-6.5 py-1 font-semibold">
                    Purchase
                </button>
            </div>
        </div>
        <img src="https://placehold.co/600x400" width="600" height="400" alt="sample data table"
             class="rounded-2xl mx-auto mb-4"/>
        <TabSection desc={$dataset.description}/>
    </div>
</div>


