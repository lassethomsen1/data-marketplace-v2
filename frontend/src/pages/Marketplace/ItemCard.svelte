<script>
    import { preferences } from "../../stores/preferenceStore.js";


    let { imageUrl, title, description, tags, author, price } = $props();
</script>
<div class="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg duration-200 w-full max-w-sm">
    <img src={imageUrl} alt={title} class="h-48 w-full object-cover"/>

    <div class="p-4 space-y-3">
        <h2 class="text-lg font-semibold text-[#1E40AF] truncate">{title}</h2>

        <p class="text-sm text-[#6B7280] leading-snug line-clamp-3">{description}</p>

        {#if tags?.length}
            <div class="flex flex-wrap gap-2 mt-2">
                {#each tags as tag}
                    <span class="bg-[#F3F4F6] text-xs text-[#1F2937] px-2 py-1 rounded-full">{tag}</span>
                {/each}
            </div>
        {/if}

        <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-[#6B7280]">
                <span>By <span class="text-[#0EA5E9] font-medium">{author}</span></span>
            </div>
            <div class="text-[#1F2937] font-bold">{price} {$preferences.currency}</div>
        </div>

        <button class="mt-2 w-full bg-[#3B82F6] hover:bg-[#1E40AF] text-white text-sm py-2 rounded-md font-medium transition-all duration-150">
            View Dataset
        </button>
    </div>
</div>

<style>
    /* Truncate multi-line text */
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>