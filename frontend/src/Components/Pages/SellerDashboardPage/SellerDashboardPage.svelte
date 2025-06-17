<script>

    import OverviewCards from "@/Components/Pages/SellerDashboardPage/OverviewCards.svelte";
    import RevenueChart from "@/Components/Pages/SellerDashboardPage/RevenueChart.svelte";
    import DatasetPerformance from "@/Components/Pages/SellerDashboardPage/DatasetPerformance.svelte";
    import RecentSales from "@/Components/Pages/SellerDashboardPage/RecentSales.svelte";
    import PayoutInfo from "@/Components/Pages/SellerDashboardPage/PayoutInfo.svelte";

    let sellerData = $state({
        name: "DataScience Pro",
        email: "seller@datasciencepro.com",
        joinDate: "March 2023",
        totalEarnings: 24567.89,
        pendingPayout: 3456.78,
        totalSales: 156,
        activeDatasets: 12,
    });
</script>

<div class="min-h-screen bg-gray-50">

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OverviewCards {sellerData} />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div class="lg:col-span-2 space-y-8">
                <RevenueChart />
                <DatasetPerformance />
                <RecentSales />
            </div>

            <div class="space-y-8">
                <PayoutInfo {sellerData} />
            </div>
        </div>
    </main>
</div>
