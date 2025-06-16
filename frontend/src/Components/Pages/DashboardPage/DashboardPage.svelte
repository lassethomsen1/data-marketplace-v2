<script>
    import OverviewStats from "@/Components/Pages/DashboardPage/OverviewStats.svelte";
    import LiveTransactions from "@/Components/Pages/DashboardPage/LiveTransactions.svelte";
    import DatasetUploads from "@/Components/Pages/DashboardPage/DatasetUploads.svelte";
    import { onMount } from "svelte";
    import {fetchAndSetStats, fetchAndSetTransactions, transactions, uploads} from "@/stores/statsStore.js";

    import { io } from "socket.io-client";

    onMount(async () => {
        await fetchAndSetStats();
        await fetchAndSetTransactions();

    })
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
        path: '/ws',
        auth: {
            token: localStorage.getItem('token'),
        }
    });

    socket.on('transaction:new', tx => {
        transactions.update(current => [tx, ...current.slice(0, 9)]);
    });

    socket.on('upload:new', upload => {
        uploads.update(current => [upload, ...current.slice(0, 9)]);
    });

</script>

<div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OverviewStats/>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <LiveTransactions/>

            <DatasetUploads/>
        </div>

    </main>
</div>