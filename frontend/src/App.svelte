<script>
    import {Router, Route} from "svelte-routing";
    import PrivateRoute from "./Guards/PrivateRoute.svelte";
</script>
<Router>
    <div>
        <Route path="/">
            <h1 class="text-9xl text-center">HOME</h1>
        </Route>
        <PrivateRoute path="/secret">
            <h1 class="text-9xl text-center">SECRET</h1>
        </PrivateRoute>
    </div>
</Router>