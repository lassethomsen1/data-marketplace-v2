<script>
  import { Route } from 'svelte-routing';
  import PrivateRouteGuard from './PrivateRouteGuard.svelte';

  export let path;
</script>

<Route {path}>
  <PrivateRouteGuard>
    <slot />
  </PrivateRouteGuard>
</Route>
