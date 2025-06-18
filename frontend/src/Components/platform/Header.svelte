<script>
    import {logout, user} from "@/stores/userStore.js";
    import {CircleUserRound, Search} from "lucide-svelte";
    import {navigate} from "svelte-routing";

    let searchQuery = $state("");

    function handleSearch(event) {
        event.preventDefault();
        console.log("Searching for:", searchQuery);

        searchQuery = "";
    }

    function handleLogin() {
        navigate('/login')
    }
</script>
<header class="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg">

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
            <a href="/" class="flex items-center space-x-3">
                <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="relative">
                        <img class="h-8 w-8" src="/datasetICON.png" alt="logo"/>
                    </div>
                    <div class="text-white">
                        <div class="font-bold text-lg leading-tight">DataFlow</div>
                        <div class="text-xs text-blue-200 leading-tight">Marketplace</div>
                    </div>
                </div>
            </a>

            <div class="hidden md:flex flex-1 max-w-lg mx-8">
                <form onsubmit={handleSearch} class="w-full">
                    <div class="relative">
                        <input
                                type="text"
                                bind:value={searchQuery}
                                placeholder="Search datasets, categories, or providers..."
                                class="w-full pl-10 pr-4 py-2.5 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200" />
                        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                            <Search />
                        </div>
                    </div>

                </form>
            </div>

            <div class="flex items-center space-x-4">
                <button class="relative p-2 text-white hover:text-teal-300 transition-colors duration-200">
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
							{12}
                    </span>
                </button>

                {#if !$user}
                    <div class="hidden lg:flex items-center space-x-3">
                        <button onclick={handleLogin}
                                class="flex items-center space-x-1 px-4 py-2 text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                            <span>Login</span>
                        </button>
                        <button class="flex items-center space-x-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 font-medium">
                            <span>Sign Up</span>
                        </button>
                    </div>
                {:else}
                    <div class="flex items-center space-x-3">
                        <a href="/profile">
                            <CircleUserRound class="h-8 w-8 text-white" />
                        </a>
                        <button onclick={logout}
                                class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 font-medium">
                            Logout
                        </button>
                        {#if $user.role.toUpperCase() === 'ADMIN'}
                            <a href="/dashboard"
                               class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 font-medium">
                                Dashboard
                            </a>
                        {/if}
                    </div>

                {/if}
            </div>
        </div>
    </div>
</header>