<script>
    import {Plus, X} from "lucide-svelte";
    import { formData, currentTag } from "@/stores/uploadFormStore.js";

    function addTag() {
        console.log('Adding tag:', $currentTag);
        if ($currentTag.trim() && !$formData.tags.includes($currentTag.trim())) {
            $formData.tags = [...$formData.tags, $currentTag.trim()];
            $currentTag = '';
        }
    }
    function removeTag(tagToRemove) {
        $formData.tags = $formData.tags.filter(tag => tag !== tagToRemove);
    }

    function handleTagKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTag();
        }
    }
</script>

<div class="md:col-span-2">
    <label for="tags" class="block text-sm font-medium text-[#1F2937] mb-2">
        Tags
    </label>
    <div id="tags" class="flex flex-wrap gap-2 mb-3">
        {#each $formData.tags as tag}
								<span class="inline-flex items-center px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-sm">
									{tag}
                                    <button
                                            type="button"
                                            onclick={() => removeTag(tag)}
                                            class="ml-2 hover:text-[#8B5CF6]/70"
                                    >
										<X class="h-3 w-3"/>
									</button>
								</span>
        {/each}
    </div>
    <div class="flex space-x-2">
        <input
                type="text"
                bind:value={$currentTag}
                onkeydown={handleTagKeydown}
                placeholder="Add tags to help users find your dataset"
                class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
        />
        <button
                type="button"
                onclick={addTag}
                class="px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors flex items-center"
        >
            <Plus class="h-4 w-4"/>
        </button>
    </div>

</div>