<script>
    import {
        Upload,
        Plus,
        DollarSign,
        FileText,
        Database,
        BarChart3,
        Brain,
        Globe,
    } from 'lucide-svelte';
    import { uploadedFiles, uploadProgress, formData, isUploading, showSuccess, errors} from "@/stores/uploadFormStore.js";
    import TagsInput from "@/Components/Pages/UploadPage/TagsInput.svelte";
    import UploadFileInput from "@/Components/Pages/UploadPage/UploadFileInput.svelte";
    import UploadProgress from "@/Components/Pages/UploadPage/UploadProgress.svelte";
    import DatasetInfomationForm from "@/Components/Pages/UploadPage/DatasetInfomationForm.svelte";


    // Form validation
    function validateForm() {
        const newErrors = {};

        if (!$formData.title.trim()) newErrors.title = 'Title is required';
        if (!$formData.description.trim()) newErrors.description = 'Description is required';
        if (!$formData.category) newErrors.category = 'Category is required';
        if (!$formData.price || parseFloat($formData.price) < 0) newErrors.price = 'Valid price is required';
        if ($uploadedFiles.length === 0) newErrors.files = 'At least one file is required';

        $errors = newErrors;
        return Object.keys(newErrors).length === 0;
    }

    // Form submission
    async function handleSubmit() {
        if (!validateForm()) return;

        $isUploading = true;
        $uploadProgress = 0;

        const progressInterval = setInterval(() => {
            $uploadProgress += Math.random() * 15;
            if ($uploadProgress >= 100) {
                $uploadProgress = 100;
                clearInterval(progressInterval);
                setTimeout(() => {
                    $isUploading = false;
                    $showSuccess = true;
                    $formData = {
                        title: '',
                        description: '',
                        category: '',
                        tags: [],
                        price: '',
                    };
                    $uploadedFiles = [];
                    setTimeout(() => $showSuccess = false, 5000);
                }, 500);
            }
        }, 200);
    }
</script>

<div class="min-h-screen bg-white">
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-[#1F2937] mb-2">Upload Your Dataset</h1>
            <p class="text-[#6B7280]">Share your data with the community and start earning from your datasets</p>
        </div>

        {#if $showSuccess}
            <div class="mb-6 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg p-4 flex items-center space-x-3">
                <div class="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="font-medium text-[#10B981]">Dataset uploaded successfully!</h3>
                    <p class="text-sm text-[#6B7280]">Your dataset is now being processed and will be available
                        shortly.</p>
                </div>
            </div>
        {/if}

        <form onsubmit={handleSubmit} class="space-y-8">

            <UploadFileInput/>

            <DatasetInfomationForm/>

            <UploadProgress/>

            <div class="flex justify-end space-x-4">
                <button
                        type="submit"
                        disabled={$isUploading}
                        class="px-8 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    {#if $isUploading}
                        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Publishing...</span>
                    {:else}
                        <Upload class="h-4 w-4"/>
                        <span>Publish Dataset</span>
                    {/if}
                </button>
            </div>
        </form>
    </main>
</div>

<style>
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .animate-spin {
        animation: spin 1s linear infinite;
    }
</style>
