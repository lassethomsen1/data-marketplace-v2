<script>
  import { user, token } from '../stores/userStore.js';
  import { navigate, useLocation } from 'svelte-routing';
  import { onMount } from 'svelte';
  const location = useLocation();
  onMount(async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/validate-token', {
      headers: {
        Authorization: `Bearer ${$token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      token.set(data.token);
      user.set(data.user);
    } else {
      localStorage.removeItem('token');
      navigate('/', {
        replace: true,
        state: { from: location.subscribe },
      });
    }
  });
</script>

{#if $user}
  <slot />
{/if}
