<script>
    import OverviewStats from "@/Components/Pages/DashboardPage/OverviewStats.svelte";
    import LiveTransactions from "@/Components/Pages/DashboardPage/LiveTransactions.svelte";
    import DatasetUploads from "@/Components/Pages/DashboardPage/DatasetUploads.svelte";
    import PaymentStatus from "@/Components/Pages/DashboardPage/PaymentStatus.svelte";
</script>

<div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OverviewStats />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <LiveTransactions />

            <DatasetUploads />

            <PaymentStatus />
        </div>

    </main>
</div>