<script>
    import ItemCard from "../Marketplace/ItemCard.svelte";

    const datasets = [
        {
            id: 1,
            title: "Open Images AI Dataset",
            shortDescription: "A large collection of labeled images useful for computer vision tasks like object detection and image classification.",
            tags: ["images", "vision", "open"],
            author: "Jane Doe",
            price: 49
        },
        {
            id: 2,
            title: "Text Corpus for NLP",
            shortDescription: "Millions of cleaned text entries for training language models, chatbots, and other NLP tools.",
            tags: ["text", "nlp", "language"],
            author: "John Smith",
            price: 35
        },
        {
            id: 3,
            title: "Healthcare Analytics Dataset",
            shortDescription: "Structured and anonymized patient data for machine learning applications in healthcare.",
            tags: ["healthcare", "analytics", "structured"],
            author: "HealthAI",
            price: 75
        },
        {
            id: 4,
            title: "Financial Transactions Dataset",
            shortDescription: "Detailed financial records for anomaly detection and fraud detection models.",
            tags: ["finance", "transactions", "fraud"],
            author: "FinTech Labs",
            price: 60
        }
    ];

</script>

<div class="px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each datasets as data}
            <ItemCard item={data}/>
        {/each}
    </div>
</div>
