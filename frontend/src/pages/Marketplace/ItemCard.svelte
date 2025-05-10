<script>
    import {preferences} from "../../stores/preferenceStore.js";


    let {imageUrl, title, shortDescription, tags, author, price} = $props();
</script>

<div class="flex flex-col border border-blue-100 rounded-lg p-4 hover:scale-[1.01] hover:shadow-lg">
    <div class="flex">
        <h2 class="text-2xl font-semibold text-[#1E40AF] mb-2">{title}</h2>
        <div class="text-[#1F2937] ml-auto">{price} {$preferences.currency}</div>
    </div>
    <p class="text-sm text-[#6B7280] mb-4">By <span class="text-[#0EA5E9] font-medium">{author}</span></p>
    <p class="text-sm text-[#6B7280] leading-snug line-clamp-3 mb-4">{shortDescription}</p>
    <div class="flex flex-wrap gap-2 mt-2 mb-2">
        {#each tags as tag}
            <span class="bg-[#F3F4F6] text-xs text-[#1F2937] px-2 py-1 rounded-full">{tag}</span>
        {/each}
    </div>
    <button class="bg-[#3B82F6] hover:bg-[#1E40AF] text-white text-sm py-2 px-4 rounded-md font-medium transition-all duration-150">
        Buy Now
    </button>
</div>