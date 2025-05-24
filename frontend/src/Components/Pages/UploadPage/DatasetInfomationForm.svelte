<script>
import TagsInput from "@/Components/Pages/UploadPage/TagsInput.svelte";
import {BarChart3, Brain, Database, DollarSign, FileText, Globe, Plus} from "lucide-svelte";
import {formData, errors} from "@/stores/uploadFormStore.js";

const categories = [
    {value: 'finance', label: 'Finance & Economics', icon: DollarSign},
    {value: 'healthcare', label: 'Healthcare & Medical', icon: Plus},
    {value: 'technology', label: 'Technology & AI', icon: Brain},
    {value: 'marketing', label: 'Marketing & Sales', icon: BarChart3},
    {value: 'research', label: 'Research & Science', icon: Database},
    {value: 'government', label: 'Government & Public', icon: Globe},
    {value: 'other', label: 'Other', icon: FileText}
];
</script>

<div class="bg-white rounded-xl border border-[#E5E7EB] p-6">
    <h2 class="text-xl font-semibold text-[#1F2937] mb-6 flex items-center">
        <FileText class="h-5 w-5 mr-2 text-[#3B82F6]"/>
        Dataset Information
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-[#1F2937] mb-2">
                Dataset Title *
            </label>
            <input
                    type="text"
                    id="title"
                    bind:value={$formData.title}
                    placeholder="Enter a descriptive title for your dataset"
                    class="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                    class:border-red-300={$errors.title}
            />
            {#if $errors.title}
                <p class="text-[#EF4444] text-sm mt-1">{$errors.title}</p>
            {/if}
        </div>

        <div>
            <label for="category" class="block text-sm font-medium text-[#1F2937] mb-2">
                Category *
            </label>
            <select
                    bind:value={$formData.category}
                    id="category"
                    class="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                    class:border-red-300={$errors.category}
            >
                <option value="">Select a category</option>
                {#each categories as category}
                    <option value={category.value}>{category.label}</option>
                {/each}
            </select>
            {#if $errors.category}
                <p class="text-[#EF4444] text-sm mt-1">{$errors.category}</p>
            {/if}
        </div>

        <div>
            <label for="price" class="block text-sm font-medium text-[#1F2937] mb-2">
                Price (USD) *
            </label>
            <div class="relative">
                <DollarSign
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6B7280]"/>
                <input
                        type="number"
                        id="price"
                        step="10"
                        min="0"
                        bind:value={$formData.price}
                        placeholder="0.00"
                        class="w-full pl-10 pr-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                        class:border-red-300={$errors.price}
                />
            </div>
            {#if $errors.price}
                <p class="text-[#EF4444] text-sm mt-1">{$errors.price}</p>
            {/if}
        </div>

        <div class="md:col-span-2">
            <label for="desc" class="block text-sm font-medium text-[#1F2937] mb-2">
                Description *
            </label>
            <textarea
                    bind:value={$formData.description}
                    id="desc"
                    rows="4"
                    placeholder="Provide a detailed description of your dataset, including what it contains, how it was collected, and potential use cases..."
                    class="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all resize-none"
                    class:border-red-300={$errors.description}
            ></textarea>
            {#if $errors.description}
                <p class="text-[#EF4444] text-sm mt-1">{$errors.description}</p>
            {/if}
        </div>

        <TagsInput/>

    </div>
</div>