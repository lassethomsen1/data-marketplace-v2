<script>
    import StatContainer from "../../platform/StatContainer.svelte";
    import TabSection from "./TabSection.svelte";
    import {onMount} from "svelte";

    const {datesetId} = $props();
    const preferences = {
        currency: "USD"
    };

    let dataset = $state({
        name: undefined,
        provider: undefined,
        size: undefined,
        price: undefined,
        format: undefined,
        sources: undefined,
        dataPoints: undefined,
        lastUpdated: undefined
    })
    onMount(()=>{
        dataset = {
            name: "City Traffic Dataset",
            provider: "City Data Labs",
            size: "1.5 GB",
            price: "$3999",
            format: "CSV",
            sources: "City Traffic Cameras, Public Data",
            dataPoints: "500,000+",
            lastUpdated: "April 2025"
        }
    });
</script>
<div class="flex flex-col justify-center items-center">
    <div class="flex flex-col w-full max-w-3xl">
        <h1 class="text-4xl">{dataset.name}</h1>
        <p class="text-gray-400 font-semibold text-xl mb-2">{dataset.provider}</p>
        <div class="flex flex-row mb-4">
            <div>
                <StatContainer stat={dataset.size}/>
                <StatContainer stat={dataset.format}/>
                <StatContainer stat={dataset.lastUpdated}/>
            </div>
            <div class="ml-auto">
                <StatContainer stat={dataset.price} className={"bg-[#3B82F6] text-white"}/>
                <button class="bg-[#3B82F6] hover:bg-[#1E40AF] rounded-lg text-white px-6.5 py-1 font-semibold">Purchase</button>
            </div>
        </div>
        <img src="https://placehold.co/600x400" width="600" height="400" alt="sample data table" class="rounded-2xl mx-auto mb-4"/>
        <TabSection/>
    </div>
</div>


