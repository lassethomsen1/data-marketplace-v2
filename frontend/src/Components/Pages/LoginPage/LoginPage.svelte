<script>
    import {user, token} from "@/stores/userStore.js";
    import {navigate} from "svelte-routing";

    let form = $state({
        email: 'user-not-onboarded@test.com',
        password: 'user',
        error: '',
    })
    let loading = $state(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.email || !form.password) {
            form.error = 'Please fill in all fields.';
            return;
        }
        loading = true;
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        });
        const resJson = await res.json();
        if (res.status === 200) {
            user.set(resJson.user);
            token.set(resJson.token);
            loading = false
            setTimeout(() => {
                navigate('/')
            }, 1000);
        } else {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-white flex items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
        <div class="text-center">
            <div class="text-3xl font-bold text-[#1E40AF]">DatasetHub</div>
            <p class="mt-2 text-sm text-[#6B7280]">Buy and sell high-quality datasets for AI training.</p>
        </div>

        <form class="mt-8 space-y-6" onsubmit={handleSubmit}>

            <div class="rounded-md shadow-sm">
                <label for="email" class="sr-only">Email</label>
                <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        bind:value={form.email}
                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#3B82F6] focus:border-[#3B82F6] focus:z-10 sm:text-sm"
                        placeholder="Email address"
                />
            </div>
            <div class="mt-4 rounded-md shadow-sm">
                <label for="password" class="sr-only">Password</label>
                <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        bind:value={form.password}
                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#3B82F6] focus:border-[#3B82F6] focus:z-10 sm:text-sm"
                        placeholder="Password"
                />
                {#if form.error}
                    <p class="text-sm text-[#EF4444] mt-1">{form.error}</p>
                {/if}
            </div>
            <div>
                <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3B82F6] hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6] transition-all duration-150"
                        disabled={loading}
                >
                    {#if loading}
                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                    {:else}
                        Sign In
                    {/if}
                </button>
            </div>
        </form>

        <p class="mt-4 text-center text-sm text-gray-600">
            New to DatasetHub?
            <button onclick={()=> navigate('/register')} class="font-medium text-[#3B82F6] hover:underline">Create an account</button>
        </p>
    </div>
</div>

<style>
    input, button {
        transition: all 0.2s ease;
    }
</style>
