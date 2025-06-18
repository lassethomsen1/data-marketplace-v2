<script>
    import {onMount} from "svelte";
    import {onboardUser} from "@/api/userApi.js";
    import {user, fetchAndSetUser} from "@/stores/userStore.js";
    import StatContainer from "../../platform/StatContainer.svelte";
    import PurchasesTable from "@/Components/Pages/ProfilePage/PurchasesTable.svelte";

    onMount(() => {
        fetchAndSetUser();
    });
</script>
{#if $user}
    <div class="flex flex-col items-center mt-4">
        <div class="w-full max-w-2xl px-4">
            <div class="border-b border-gray-300 pb-4">
                <h1 class="text-3xl">Profile Settings</h1>
                <div class="flex flex-row space-x-2">
                    <p class="px-3.5 py-1 pl-0">Account: </p>
                    {#if $user.stripeOnboardingCompleted}
                        <StatContainer stat="Active" className="bg-green-300"/>
                        <a href="/upload" class="ml-auto">
                            <StatContainer stat="Upload" className="bg-[#3B82F6] text-white"/>
                        </a>
                        <a href="/seller-dashboard" >
                            <StatContainer stat="Dashboard" className="bg-[#3B82F6] text-white"/>
                        </a>

                    {:else}
                        <StatContainer stat="Not Onboarded" className="bg-red-300"/>
                    {/if}
                </div>
            </div>

            <h1 class="text-2xl mt-6">Personal information</h1>
            <div class="border border-gray-300 rounded-xl overflow-hidden mb-4">
                <table class="w-full">
                    <tbody>
                    <tr class="border-b border-gray-300">
                        <td class="p-2">Name</td>
                        <td class="p-2">{$user.name}</td>
                    </tr>
                    <tr>
                        <td class="p-2">Email</td>
                        <td class="p-2">{$user.email}</td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <div class="flex flex-row space-x-1.5 mb-4">
                {#if !$user.stripeOnboardingCompleted}
                    <h2 class="text-xl">
                        Connect your Stripe account to start selling datasets.
                    </h2>
                    <button onclick={onboardUser}
                            class="bg-[#3B82F6] hover:bg-[#1E40AF] rounded-lg text-white px-4 py-1 font-semibold">
                        Connect
                    </button>
                {:else}
                    <h2 class="text-xl">
                        Change stripe information
                    </h2>
                    <button onclick={onboardUser}
                            class="bg-[#3B82F6] hover:bg-[#1E40AF] rounded-lg text-white px-4 py-1 font-semibold">
                        Change
                    </button>
                {/if}
            </div>
            <div>
                <h2 class="text-xl">Purchased datasets</h2>
                <p class="text-gray-500 text-sm mb-4">Here you can find all datasets you have purchased.</p>
                <PurchasesTable/>
            </div>

        </div>
    </div>
{:else}
    <p class="text-gray-500 text-sm">Loading user...</p>
{/if}