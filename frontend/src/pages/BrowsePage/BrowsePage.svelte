<script>
    import ItemCard from "../Marketplace/ItemCard.svelte";
    const datasets = [
        {
            imageUrl: "https://placehold.co/600x400",
            title: "Open Images AI Dataset",
            description: "A large collection of labeled images useful for computer vision tasks like object detection and image classification.",
            tags: ["images", "vision", "open"],
            author: "Jane Doe",
            price: 49
        },
        {
            imageUrl: "https://placehold.co/600x400",
            title: "Text Corpus for NLP",
            description: "Millions of cleaned text entries for training language models, chatbots, and other NLP tools.",
            tags: ["text", "nlp", "language"],
            author: "John Smith",
            price: 35
        },
        {
            imageUrl: "https://placehold.co/600x400",
            title: "Healthcare Analytics Dataset",
            description: "Structured and anonymized patient data for machine learning applications in healthcare.",
            tags: ["healthcare", "analytics", "structured"],
            author: "HealthAI",
            price: 75
        },
        {
            imageUrl: "https://placehold.co/600x400",
            title: "Financial Transactions Dataset",
            description: "Detailed financial records for anomaly detection and fraud detection models.",
            tags: ["finance", "transactions", "fraud"],
            author: "FinTech Labs",
            price: 60
        }
    ];

</script>

<div class="px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-[#1E40AF]">Browse Datasets</h1>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each datasets as data}
            <ItemCard {...data} />
        {/each}
    </div>
</div>
