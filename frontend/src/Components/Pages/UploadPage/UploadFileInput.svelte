<script>
    import { FileText, Upload, X } from "lucide-svelte";
    import { uploadedFiles, errors} from "@/stores/uploadFormStore.js";

    let isDragOver = $state(false);

    function handleDragOver(event) {
        event.preventDefault();
        isDragOver = true;
    }

    function handleDragLeave(event) {
        event.preventDefault();
        isDragOver = false;
    }

    function handleDrop(event) {
        event.preventDefault();
        isDragOver = false;
        const files = Array.from(event.dataTransfer.files);
        handleFiles(files);
    }

    function handleFileInput(event) {
        const files = Array.from(event.target.files);
        handleFiles(files);
    }

    function handleFiles(files) {
        const validExtensions = ['.csv', '.json', '.xlsx'];
        const validMimeTypes = ['application/json', 'text/csv', 'application/vnd.ms-excel'];

        const validFiles = files.filter(file => {
            const extension = '.' + file.name.split('.').pop().toLowerCase();
            const isValidExtension = validExtensions.includes(extension);
            const isValidMime = validMimeTypes.includes(file.type);

            return isValidExtension && isValidMime && file.size <= 100 * 1024 * 1024; // 100MB
        });

        if (validFiles.length === 0) {
            $errors.upload = 'Only JSON and CSV files under 100MB are allowed.';
            return;
        }

        const filesWithIds = validFiles.map(file =>
            Object.assign(file, { id: crypto.randomUUID() })
        );

        $uploadedFiles = [...$uploadedFiles, ...filesWithIds];
        $errors.upload = null;
    }


    function removeFile(fileId) {
        $uploadedFiles = $uploadedFiles.filter(f => f.id !== fileId);
    }

    function formatFileSize(size) {
        const kb = size / 1024;
        return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(1)} KB`;
    }
</script>

<div class="bg-[#F3F4F6] rounded-xl p-6">
    <h2 class="text-xl font-semibold text-[#1F2937] mb-4 flex items-center">
        <Upload class="h-5 w-5 mr-2 text-[#3B82F6]"/>
        Upload Files
    </h2>

    <div
            class="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 {isDragOver ? 'border-[#3B82F6] bg-[#3B82F6]/5' : 'border-[#6B7280]/30 hover:border-[#3B82F6]/50'}"
            ondragover={handleDragOver}
            ondragleave={handleDragLeave}
            ondrop={handleDrop}
            role="region"
    >
        <Upload class="h-12 w-12 mx-auto mb-4 text-[#6B7280] {isDragOver ? 'text-[#3B82F6]' : ''}"/>
        <h3 class="text-lg font-medium text-[#1F2937] mb-2">
            {isDragOver ? 'Drop your files here' : 'Drag and drop your files'}
        </h3>
        <p class="text-[#6B7280] mb-4">or</p>
        <label class="inline-flex items-center px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors cursor-pointer">
            <span>Browse Files</span>
            <input
                    type="file"
                    multiple
                    accept=".csv,.json,.xlsx,.sql,.parquet"
                    onchange={handleFileInput}
                    class="hidden"
            />
        </label>
        <p class="text-sm text-[#6B7280] mt-2">
            Supports CSV and JSON files up to 100MB eah
        </p>
    </div>

    {#if $errors.upload}
        <p class="text-[#EF4444] text-sm mt-2">{$errors.upload}</p>
    {/if}

    {#if $errors.files}
        <p class="text-[#EF4444] text-sm mt-2">{$errors.files}</p>
    {/if}

    {#if $uploadedFiles.length > 0}
        <div class="mt-6 space-y-3">
            <h3 class="font-medium text-[#1F2937]">Uploaded Files ({$uploadedFiles.length})</h3>
            {#each $uploadedFiles as file (file.id)}
                <div class="flex items-center justify-between bg-white rounded-lg p-3 border border-[#E5E7EB]">
                    <div class="flex items-center space-x-3">
                        <FileText class="h-5 w-5 text-[#6B7280]"/>
                        <div>
                            <p class="font-medium text-[#1F2937]">{file.name}</p>
                            <p class="text-sm text-[#6B7280]">{formatFileSize(file.size)}</p>
                        </div>
                    </div>
                    <button
                            type="button"
                            onclick={() => removeFile(file.id)}
                            class="text-[#6B7280] hover:text-[#EF4444] transition-colors"
                    >
                        <X class="h-5 w-5"/>
                    </button>
                </div>
            {/each}
        </div>
    {/if}
</div>