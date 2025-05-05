<script>
    import { user } from "../stores/userStore.js";
    import { navigate, useLocation } from "svelte-routing";
    import { onMount } from "svelte";
    const location = useLocation();
    onMount(() => {
        if (!$user) {
            navigate("/",{
                replace: true,
                state: { from: location.subscribe }
            });
        }
    });
</script>

{#if $user}
    <slot />
{/if}