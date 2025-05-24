<script>
    import { isUploading, uploadProgress} from "@/stores/uploadFormStore.js";
</script>
{#if $isUploading}
    <div class="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-[#1F2937]">Uploading Dataset...</h3>
            <span class="text-sm text-[#6B7280]">{Math.round($uploadProgress)}%</span>
        </div>
        <div class="w-full bg-[#F3F4F6] rounded-full h-2">
            <div
                    class="bg-[#3B82F6] h-2 rounded-full transition-all duration-300 ease-out"
                    style="width: {$uploadProgress}%"
            ></div>
        </div>
    </div>
{/if}